"use client";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { set } from "date-fns";

export function useOnboarding() {
  const supabase = createClient();
  const router = useRouter();
  const [showOnboarding, setShowOnboarding] = useState(true);



  return {
    showOnboarding,
    initUserWithTopic: () => {
      console.log("init user with topic!");
    },
  };
}
