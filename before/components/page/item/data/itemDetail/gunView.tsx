import TextSpan from "@/components/custom/gridContents/textSpan";
import { getLocaleKey, getModesLocaleKey } from "@/lib/func/localeFunction";
import { useLocale } from "next-intl";
import type { ItemView } from "../itemType";
import Image from "next/image";
import { itemDetailI18N } from "@/lib/consts/i18nConsts";

export default function GunView({ item }: ItemView) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex w-full max-w-2xl">
        <h3 className="text-2xl max-w-2xl font-bold mb-2">
          {itemDetailI18N.info[localeKey]}
        </h3>
      </div>

      <div className="w-full max-w-2xl border-2 border-white rounded-sm overflow-hidden mb-6">
        <div className="grid grid-cols-2 border-b border-NeutralGray ">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.category[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.category}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.ergonomics[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.ergonomics}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.horizontalRecoil[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.recoil_horizontal}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.verticalRecoil[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold">
            {item.info.recoil_vertical}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.shootMode[localeKey]}
          </div>
          <div className="flex flex-col w-full">
            {item.info.modes &&
              item.info.modes[getModesLocaleKey(locale)].map(
                (area: string, index: number) => (
                  <TextSpan key={`${index}-area-${item.id}`}>{area}</TextSpan>
                )
              )}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.shootRate[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.fire_rate}
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.weight[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.weight} kg
          </div>
        </div>

        <div className="grid grid-cols-2 border-b border-NeutralGray">
          <div className="py-2 px-2  text-GoldenYellow font-bold flex justify-center items-center">
            {itemDetailI18N.defaultAmmo[localeKey]}
          </div>
          <div className="py-2 px-2  text-center font-bold ">
            {item.info.default_ammo}
          </div>
        </div>
      </div>

      {item.info.allowed_ammo && item.info.allowed_ammo.length > 0 && (
        <div className="w-full">
          <div className="flex w-full">
            <h3 className="text-2xl font-bold mb-2">
              {itemDetailI18N.ammo[localeKey]}
            </h3>
          </div>
          <div className="w-full grid grid-cols-5 border-2 border-white rounded-sm mb-6 gap-4 pt-4 pb-4">
            {item.info.allowed_ammo.map(
              (ammo: { name: any; gridImageLink: string }, index: number) => (
                <div
                  key={`allowed-ammo-${ammo.name.en}-${index}`}
                  className="flex flex-col items-center justify-center"
                >
                  <Image
                    src={ammo.gridImageLink}
                    alt={ammo.name}
                    sizes={"80"}
                    width={80}
                    height={80}
                    style={{ objectFit: "contain" }}
                    placeholder="blur"
                    blurDataURL={
                      "data:image/jpeg;base64," +
                      "iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                    }
                  />
                  <div className="py-2 px-2  text-center font-bold ">
                    {ammo.name[localeKey]}
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}
