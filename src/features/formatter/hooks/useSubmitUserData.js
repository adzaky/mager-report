import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { userDataService } from "@/services/user";

export const useSubmitUserData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitUserData = async (data) => {
    setLoading(true);
    try {
      await userDataService.postUser(data);
    } catch (err) {
      toast({
        variant: "destructive",
        description: err?.message || "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, submitUserData };
};
