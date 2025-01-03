"use client";
import { usePathname, useRouter } from "next/navigation";
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function EventTab() {
    const pathname = usePathname();
    const router = useRouter();

    return     <Tabs defaultValue={pathname.split('/').filter(Boolean)[0]} className="w-[400px]">
        <TabsList className="grid w-full grid-cols-3 ">
            <TabsTrigger className={"font-bold text-white"} value="event" onClick={() => router.push("/event?id=1")}>이벤트</TabsTrigger>
            <TabsTrigger className={"font-bold text-white"} value="patch-notes" onClick={() => router.push("/patch-notes?id=1")}>패치노트</TabsTrigger>
            <TabsTrigger className={"font-bold text-white"} value="notice" onClick={() => router.push("/notice?id=1")}>공지</TabsTrigger>
        </TabsList>
    </Tabs>
}