
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { STRIPE_SECRET_KEY } from "../_shared/stripe-key.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper logging function for enhanced debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Use the service role key to perform writes (upsert) in Supabase
  const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
  const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
  const supabaseClient = createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: { persistSession: false }
  });

  try {
    logStep("Function started");

    if (!STRIPE_SECRET_KEY) throw new Error("STRIPE_SECRET_KEY is not set");
    logStep("Stripe key verified");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");

    const token = authHeader.replace("Bearer ", "");
    logStep("Authenticating user with token");
    
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Check for trial period - if user created less than 3 days ago, they're in trial
    const userCreatedAt = new Date(user.created_at);
    const now = new Date();
    const trialDays = 3;
    const trialEndsAt = new Date(userCreatedAt);
    trialEndsAt.setDate(trialEndsAt.getDate() + trialDays);
    
    const isInTrial = now < trialEndsAt;
    const trialEnd = isInTrial ? trialEndsAt.toISOString() : null;
    
    logStep("Trial status checked", { isInTrial, trialEnd, userCreatedAt: user.created_at });

    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    
    if (customers.data.length === 0) {
      logStep("No customer found, checking trial status");
      
      // If no Stripe customer but in trial period, return trial info
      await supabaseClient.from("subscribers").upsert({
        email: user.email,
        user_id: user.id,
        stripe_customer_id: null,
        subscribed: isInTrial,
        subscription_tier: isInTrial ? "Trial" : null,
        subscription_end: trialEnd,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'email' });
      
      return new Response(JSON.stringify({ 
        subscribed: isInTrial, 
        subscription_tier: isInTrial ? "Trial" : null,
        subscription_end: trialEnd
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    const customerId = customers.data[0].id;
    logStep("Found Stripe customer", { customerId });

    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      limit: 1,
    });
    
    let hasActiveSub = subscriptions.data.length > 0;
    let subscriptionTier = null;
    let subscriptionEnd = null;

    if (hasActiveSub) {
      const subscription = subscriptions.data[0];
      subscriptionEnd = new Date(subscription.current_period_end * 1000).toISOString();
      logStep("Active subscription found", { subscriptionId: subscription.id, endDate: subscriptionEnd });
      // Determine subscription tier from price
      const priceId = subscription.items.data[0].price.id;
      
      // Map price IDs to tiers
      if (priceId === "price_1RKoivQF6Z2bM6OtPbacI8CV") {
        subscriptionTier = "Pro";
      } else if (priceId === "price_1RKojGQF6Z2bM6Ot4vUqo2tr") {
        subscriptionTier = "Plus";
      } else if (priceId === "price_1RKoy1QF6Z2bM6OtmmM3isoR") {
        subscriptionTier = "Pro";  // Pro Annual
      } else if (priceId === "price_1RKoyTQF6Z2bM6Ot0omJlzYy") {
        subscriptionTier = "Plus"; // Plus Annual
      } else {
        subscriptionTier = "Unknown";
      }
      
      logStep("Determined subscription tier", { priceId, subscriptionTier });
    } else if (isInTrial) {
      // No active subscription but in trial period
      subscriptionTier = "Trial";
      subscriptionEnd = trialEnd;
      logStep("User in trial period", { trialEnd });
      hasActiveSub = true;
    } else {
      logStep("No active subscription or trial found");
    }

    await supabaseClient.from("subscribers").upsert({
      email: user.email,
      user_id: user.id,
      stripe_customer_id: customerId,
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'email' });

    logStep("Updated database with subscription info", { subscribed: hasActiveSub, subscriptionTier });
    return new Response(JSON.stringify({
      subscribed: hasActiveSub,
      subscription_tier: subscriptionTier,
      subscription_end: subscriptionEnd
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in check-subscription", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
