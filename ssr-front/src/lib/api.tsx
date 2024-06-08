export const fetchDataWithNone = async (api: string, setData: Function) => {
  try {
    const response = await fetch(`${api}`, {
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
