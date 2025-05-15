import Logo from "@/assets/navi/logo";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-Background">
      <div className="w-[50%] flex items-center justify-center">
        <div className=" flex flex-col gap-4">
          <h1 className="text-8xl font-bold">404 ERROR</h1>
          <span className="text-4xl font-bold">Page Not Found</span>
        </div>
      </div>
      <div className="w-[50%]">
        <Logo width={600} height={400} />
      </div>
    </div>
  );
}
