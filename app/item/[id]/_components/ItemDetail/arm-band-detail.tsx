import { Card, CardHeader } from "@/components/ui/card";
import { ItemDetailTypes } from "../item.types";
import Image from "next/image";

export default function ArmBandDetail({ itemInfo }: ItemDetailTypes) {
  return (
    <Card className="rounded-xl shadow-lg border border-border bg-card">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-3 p-2 rounded-xl bg-secondary/50 w-20 h-20 sm:w-24 sm:h-24 flex items-center justify-center">
          <Image
            src={itemInfo.image || "/placeholder.svg"}
            alt={itemInfo.name.en}
            width={96}
            height={96}
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain rounded-lg"
          />
        </div>
      </CardHeader>
    </Card>
  );
}
