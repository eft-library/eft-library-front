export const fetchDataWithNone = async (api: string, setData: Function) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${api}`, {
      next: { revalidate: 6000 },
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
