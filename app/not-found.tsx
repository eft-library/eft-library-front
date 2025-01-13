import Logo from "@/assets/navi/logo";

export default function NotFound() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-Background">
      <div className="w-[50%] h-full flex items-center justify-center">
        <div className=" flex flex-col gap-4">
          <h1 className="text-8xl font-bold">404 ERROR</h1>
          <span className="text-4xl font-bold">Page Not Found</span>
          <span className="text-2xl font-bold">
            죄송합니다. 페이지를 찾을 수 없습니다.
          </span>
        </div>
      </div>
      <div className="w-[50%]">
        <Logo />
      </div>
    </div>
  );
}
