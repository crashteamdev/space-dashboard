import { useState, useEffect } from "react";
import axios from "axios";
import { useFirebaseToken } from "./useFirebaseToken";
import { v4 as uuidv4 } from "uuid";
import { useLocalStorage } from "@uidotdev/usehooks";
import { marketplace } from "@/app/(Analytics)/analytics/categories/statics";

interface SubscriptionResponse {
  active: boolean;
  createdAt: string;
  endAt: string;
  type: string;
  typeNumeric: number;
}

export function useCheckSubscription() {
    const [market] = useLocalStorage("market", marketplace[0]);
  const [isAllowed, setIsAllowed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useFirebaseToken();
    
  useEffect(() => {
    if(token === null) return;

    const checkSubscription = async () => {
      try {
        const response = await axios.get<SubscriptionResponse>(`https://${market.value === "KE" ? "ke" : "uzum"}-api.marketdb.pro/v1/user/subscription`, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "X-Request-ID": uuidv4()
            }
        });
        setIsAllowed(response.data.active);
      } catch (error) {
        console.error("Failed to check subscription:", error);
        setIsAllowed(false);
      } finally {
        setLoading(false);
      }
    };

    checkSubscription();
  }, [token, market]);

  return { isAllowed, loading };
}
