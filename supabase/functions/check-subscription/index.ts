
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";
import { STRIPE_SECRET_KEY } from "../_shared/stripe-key.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper for better debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CHECK-SUBSCRIPTION] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  
  try {
    logStep("Function started");
    
    // Verify Stripe key
    if (!STRIPE_SECRET_KEY || STRIPE_SECRET_KEY === "your_stripe_secret_key") {
      throw new Error("Invalid Stripe secret key. Please configure it in Supabase Edge Function secrets.");
    }
    logStep("Stripe key verified");
    
    // Get the authorization header from the request
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    logStep("Authorization header found");
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    
    // Authenticate user with token
    logStep("Authenticating user with token");
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    logStep("User authenticated", { userId: user.id, email: user.email });
    
    // Initialize Stripe
    const stripe = new Stripe(STRIPE_SECRET_KEY, { apiVersion: "2023-10-16" });
    
    // Check if the user exists in Stripe
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // User not found in Stripe - check trial status instead
      logStep("No customer found, checking trial status");
      
      // Trial is 3 days from account creation
      const trialDays = 3;
      const userCreatedAt = new Date(user.created_at);
      const trialEnd = new Date(userCreatedAt);
      trialEnd.setDate(trialEnd.getDate() + trialDays);
      
      const now = new Date();
      const isInTrial = now <= trialEnd;
      const trialExpired = now > trialEnd;
      
      logStep("Trial status checked", { 
        isInTrial, 
        trialEnd: trialEnd.toISOString(),
        userCreatedAt: user.created_at
      });
      
      return new Response(
        JSON.stringify({
          subscribed: false,
          subscription_tier: isInTrial ? "Trial" : null,
          subscription_end: isInTrial ? trialEnd.toISOString() : null,
          isInTrial,
          trialExpired,
          trialEnd: trialEnd.toISOString(),
          userCreatedAt: user.created_at
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    }
    
    // Get subscription information
    logStep("Getting subscription information", { customerId });
    
    // Check active subscriptions
    const subscriptions = await stripe.subscriptions.list({
      customer: customerId,
      status: "active",
      expand: ["data.items.data.price.product"]
    });
    
    if (subscriptions.data.length === 0) {
      logStep("No active subscriptions found", { customerId });
      
      // Trial is 3 days from account creation
      const trialDays = 3;
      const userCreatedAt = new Date(user.created_at);
      const trialEnd = new Date(userCreatedAt);
      trialEnd.setDate(trialEnd.getDate() + trialDays);
      
      const now = new Date();
      const isInTrial = now <= trialEnd;
      const trialExpired = now > trialEnd;
      
      return new Response(
        JSON.stringify({
          subscribed: false,
          subscription_tier: isInTrial ? "Trial" : null,
          subscription_end: isInTrial ? trialEnd.toISOString() : null,
          isInTrial,
          trialExpired,
          trialEnd: trialEnd.toISOString(),
          userCreatedAt: user.created_at
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200
        }
      );
    }
    
    // Get the active subscription
    const subscription = subscriptions.data[0];
    const product = subscription.items.data[0].price.product;
    let subscription_tier = "Unknown";
    
    // Get the product name or metadata to determine tier
    if (typeof product === 'object' && product !== null) {
      subscription_tier = product.name || "Unknown";
      // Fallback to metadata if needed
      if (subscription_tier === "Unknown" && product.metadata && product.metadata.tier) {
        subscription_tier = product.metadata.tier;
      }
    }
    
    // Trial is 3 days from account creation
    const trialDays = 3;
    const userCreatedAt = new Date(user.created_at);
    const trialEnd = new Date(userCreatedAt);
    trialEnd.setDate(trialEnd.getDate() + trialDays);
    
    const now = new Date();
    const isInTrial = now <= trialEnd;
    const trialExpired = now > trialEnd;
    
    // Update the subscriber record in the database
    try {
      const { data: existingSubscriber, error: fetchError } = await supabaseClient
        .from('subscribers')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (fetchError && fetchError.code !== 'PGRST116') {
        console.error("Error checking existing subscriber:", fetchError);
      }
      
      const subscriberData = {
        user_id: user.id,
        email: user.email,
        stripe_customer_id: customerId,
        subscribed: true,
        subscription_tier,
        subscription_end: new Date(subscription.current_period_end * 1000).toISOString()
      };
      
      if (!existingSubscriber) {
        const { error: insertError } = await supabaseClient
          .from('subscribers')
          .insert([subscriberData]);
          
        if (insertError) console.error("Error inserting subscriber:", insertError);
      } else {
        const { error: updateError } = await supabaseClient
          .from('subscribers')
          .update(subscriberData)
          .eq('id', existingSubscriber.id);
          
        if (updateError) console.error("Error updating subscriber:", updateError);
      }
    } catch (dbError) {
      console.error("Database operation error:", dbError);
    }
    
    logStep("Subscription information processed", { 
      subscription_tier, 
      current_period_end: new Date(subscription.current_period_end * 1000) 
    });
    
    return new Response(
      JSON.stringify({
        subscribed: true,
        subscription_tier,
        subscription_end: new Date(subscription.current_period_end * 1000).toISOString(),
        isInTrial,
        trialExpired,
        trialEnd: trialEnd.toISOString(),
        userCreatedAt: user.created_at
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[CHECK-SUBSCRIPTION] ERROR: ${errorMessage}`);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
