export default async function Map(props: any) {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/map/all`, {
    next: { revalidate: 600 },
  });
  const map = await resp.json();
  return (
    <div>
      <div>{props.params.id}</div>
      <div>{JSON.stringify(map)}</div>
    </div>
  );
}
