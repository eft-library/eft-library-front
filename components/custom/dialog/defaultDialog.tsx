import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { alertMessageI18N } from "@/lib/consts/i18nConsts";

interface DefaultDialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  title: string;
  children: React.ReactNode;
}

export default function DefaultDialog({
  open,
  setOpen,
  title,
  children,
}: DefaultDialogProps) {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[1600px] border-white bg-Background">
        <DialogHeader>
          <DialogTitle className="font-bold">{title}</DialogTitle>
          {children}
        </DialogHeader>
        <DialogDescription />
        <DialogFooter>
          <DialogClose asChild onClick={() => setOpen(false)}>
            <button className="text-base font-semibold text-white bg-Background border-white hover:bg-NeutralGray">
              {alertMessageI18N.close[localeKey]}
            </button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
