/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

interface FetchSchema {
  status: number;
  msg: string;
  data: any;
}

export async function requestData(url: string): Promise<FetchSchema | null> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 14400 },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: FetchSchema = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestPostData(
  url: string,
  body: any
): Promise<FetchSchema | null> {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result: FetchSchema = await response.json();

    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestUserData(url: string, body: any, session: any) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result: FetchSchema = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function requestGetUserData(url: string, session: any) {
  try {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (session?.accessToken) {
      headers.Authorization = `Bearer ${session.accessToken}`;
    }

    const response = await fetch(url, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    const result: FetchSchema = await response.json();
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
