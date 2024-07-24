import { signOut } from "next-auth/react";

export const fetchDataWithNone = async (url: string, setData: Function) => {
  try {
    const response = await fetch(`${url}`, {
      next: { revalidate: 60000 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: any = await response.json();

    setData(result.data);
  } catch (error) {
    console.error("Fetch error:", error);
    return [];
  }
};

export const fetchUserData = async (
  url: string,
  method: string,
  body: any,
  session: any
) => {
  try {
    const res = await fetch(url, {
      method: method,
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const response = await res.json();

    return response;
  } catch (error) {
    console.log(error);
  }
};
