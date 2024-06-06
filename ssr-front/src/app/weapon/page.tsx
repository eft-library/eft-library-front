"use client";

import SubHeader from "@/components/subHeader/subHeader";
import PageParent from "@/components/pageParent/pageParent";
import { useAppStore } from "@/store/provider";
import { WEAPON_TYPE } from "@/util/consts/columnConsts";
import ContentsSelector from "@/components/contentsSelector/contentsSelector";
import WeaponDetail from "./detail/weaponDetail/weaponDetail";

export default function Weapon() {
  const { weaponCategory, setWeaponCategory } = useAppStore((state) => state);

  const onClickCategory = (weaponCategory: string) => {
    setWeaponCategory(weaponCategory);
  };

  return (
    <PageParent>
      <SubHeader title="무기" />
      <ContentsSelector
        onClickEvent={onClickCategory}
        itemList={WEAPON_TYPE.json_value}
        currentId={weaponCategory}
        selectorId="value"
        itemDesc="desc_kr"
      />
      <WeaponDetail category={weaponCategory} />
    </PageParent>
  );
}
