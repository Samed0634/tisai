import React, { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { User } from "@supabase/supabase-js";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
export const UserProfile = () => {
  const [user, setUser] = useState<User | null>(null);
  const {
    toast
  } = useToast();
  useEffect(() => {
    const fetchUserData = async () => {
      const {
        data,
        error
      } = await supabase.auth.getUser();
      if (error) {
        console.error("Error fetching user data:", error);
      } else if (data?.user) {
        setUser(data.user);
      }
    };
    fetchUserData();
  }, []);
  if (!user) return null;
  return <div className="flex items-center space-x-2">
      <Avatar className="h-8 w-8">
        <AvatarImage src="" alt={user.email || ""} />
        <AvatarFallback className="text-slate-950">{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="space-y-0.5 text-left">
        
      </div>
    </div>;
};