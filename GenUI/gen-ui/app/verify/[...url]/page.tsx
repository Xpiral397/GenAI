"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { verifyAccount } from "../../_api/auth/verify";
import { Button } from "@nextui-org/button";
import { NotAccessible, Verified } from "@mui/icons-material";

export default function VerifyAccount({ params }: any) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isV, setV] = useState<boolean>(false);
  const [uid, token] = params.url;
  console.log(params);

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await verifyAccount(uid, token);
        // throw response;

        if (response == 200) {
          // Email confirmation successful
          toast.success("Email confirmed successfully!", {
            autoClose: 3000,
          });
          setTimeout(() => router.push("/signin"), 3900); // Redirect to the login page upon success
        } else {
          setV(true);
          setIsLoading(false);
          toast.error("Email confirmation failed. Please try again.");
        }
      } catch (error) {
        setV(true);
        setIsLoading(false);
        console.error("Error confirming email:", error);
        toast.error("An error occurred. Please try again later.");
      }
    };

    verifyEmail();
  }, [isLoading, isV]);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <Button
        startContent={
          !isLoading &&
          (!isV ? (
            <Verified color="success" />
          ) : (
            <NotAccessible color="error" />
          ))
        }
        isLoading={isLoading}
        className="text-slate-200 bg-secondary-200 w-[300px]"
      >
        {!isLoading
          ? isV
            ? "Verification Failed"
            : "Verification Successful"
          : " Verifying Email..."}
      </Button>
    </div>
  );
}
