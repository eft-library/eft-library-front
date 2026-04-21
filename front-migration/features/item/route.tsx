import { ItemListPage } from "@/features/item/components/item-list-page";
import { getItemList } from "@/features/item/api";
import {
  getItemSectionConfig,
  type ItemTypeSlug,
} from "@/features/item/config";
import { getUserLocale } from "@/i18n/locale";

export async function ItemListRoute({ itemType }: { itemType: ItemTypeSlug }) {
  const [items, locale] = await Promise.all([
    getItemList(itemType),
    getUserLocale(),
  ]);
  const copy = getItemSectionConfig(itemType, locale);

  return (
    <ItemListPage
      itemType={itemType}
      items={items}
      labels={{
        ...copy,
        locale,
      }}
    />
  );
}
