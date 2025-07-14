"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { itemI18N } from "@/lib/consts/i18nConsts";
import Image from "next/image";
import ItemTableHeader from "@/components/custom/itemTable/item-table-header";
import ItemTableRowWrapper from "@/components/custom/itemTable/item-table-row-wrapper";
import type { WeaponViewTypes } from "../weapon.types";
