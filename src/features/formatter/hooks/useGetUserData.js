import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { userDataService } from "@/services/user";

export const useGetUserData = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);

      try {
        const res = await userDataService.getUsers();
        if (res?.status === "success") {
          setData(res?.data);
        }
      } catch (err) {
        toast({
          variant: "destructive",
          description: err?.message || "Something went wrong.",
        });
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [toast]);

  return { loading, data };
};
