"use client";

import { useEffect, useState } from "react";
import PageParent from "@/components/pageParent/pageParent";
import { useSession } from "next-auth/react";

export default function UserQuest() {
  const [userQuest, setUserQuest] = useState();
  const { data: session } = useSession();

  useEffect(() => {
    const getUserQuest = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/user/quest", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            provider: session.provider,
          }),
        });

        if (!res.ok) {
          throw new Error("Failed to add user");
        }

        const response = await res.json();
        if (response.status === 200 && response.data.length > 0) {
          setUserQuest(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (session && session.accessToken && session.provider) {
      getUserQuest();
    }
  }, [session]);

  if (!userQuest) return null;

  return (
    <PageParent>
      <div>{JSON.stringify(userQuest)}</div>
    </PageParent>
  );
}
