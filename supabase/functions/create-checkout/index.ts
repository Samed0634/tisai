
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Helper for better debugging
const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    // Get the plan parameter from the request
    const { plan } = await req.json();
    logStep("Requested plan", { plan });

    if (!plan) {
      throw new Error("Plan parameter is required");
    }

    // Get allowed plans
    const ALLOWED_PLANS = {
      "pro": "price_1RKoivQF6Z2bM6OtPbacI8CV", // Pro Plan (Monthly) price ID
      "plus": "price_1RKojGQF6Z2bM6Ot4vUqo2tr", // Plus Plan (Monthly) price ID
      "pro-annual": "price_1RKoy1QF6Z2bM6OtmmM3isoR", // Pro Plan (Annual) price ID
      "plus-annual": "price_1RKoyTQF6Z2bM6Ot0omJlzYy" // Plus Plan (Annual) price ID
    };

    // Validate plan
    if (!Object.keys(ALLOWED_PLANS).includes(plan)) {
      throw new Error(`Invalid plan: ${plan}. Allowed plans: ${Object.keys(ALLOWED_PLANS).join(", ")}`);
    }

    const priceId = ALLOWED_PLANS[plan as keyof typeof ALLOWED_PLANS];
    logStep("Price ID determined", { priceId });

    // Get the user's authentication info
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY") ?? "";
    const supabaseClient = createClient(supabaseUrl, supabaseAnonKey);

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    
    logStep("User authenticated", { userId: user.id, email: user.email });

    // Initialize Stripe
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");
    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if the user already exists in Stripe
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      // Create a new customer
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: { userId: user.id }
      });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Get the origin for success and cancel URLs
    const origin = req.headers.get("origin") || "https://ckamzvmrkfkatbynwdom.lovable.dev";

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/subscription/cancel`,
    });

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`[CREATE-CHECKOUT] ERROR: ${errorMessage}`);
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
