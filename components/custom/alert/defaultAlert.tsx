import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N } from "@/lib/consts/i18nConsts";

interface DefaultAlert {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  description: string;
}

export default function DefaultAlert({
  open,
  setOpen,
  title,
  description,
}: DefaultAlert) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="sm:max-w-[600px] border-white bg-Background">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-bold">{title}</AlertDialogTitle>
          <AlertDialogDescription className="font-bold text-base text-white">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => setOpen(false)}
            className="text-base font-semibold text-white bg-Background border-white hover:bg-NeutralGray"
          >
            {alertMessageI18N.close[localeKey]}
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
