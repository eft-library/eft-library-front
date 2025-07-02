"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requestUserData } from "@/lib/config/api";
import { USER_API_ENDPOINTS } from "@/lib/config/endpoint";
import { signOut, useSession } from "next-auth/react";
import { useState } from "react";
import TextSpan from "../../../custom/gridContents/textSpan";
import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import DefaultAlert from "@/components/custom/alert/defaultAlert";
import { headerI18N, exitI18N } from "@/lib/consts/i18nConsts";

export default function ExitDialog() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale);
  const { data: session } = useSession();
  const [email, setEmail] = useState<string>("");
  const [alertDesc, setAlertDesc] = useState<string>("");
  const [alertStatus, setAlertStatus] = useState<boolean>(false);

  const userExit = async () => {
    try {
      if (email !== session?.email) {
        setAlertDesc(exitI18N.emailMismatch[localeKey]);
        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        return;
      }

      const data = await requestUserData(
        USER_API_ENDPOINTS.DELETE_USER,
        {},
        session
      );

      if (!data || data.status !== 200) {
        setAlertDesc(exitI18N.tryAgainLater[localeKey]);
        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        location.reload();
      } else {
        setAlertDesc(exitI18N.withdrawComplete[localeKey]);
        setTimeout(() => {
          setAlertStatus(true);
        }, 500);
        signOut();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="px-2 py-2 font-bold text-white bg-transparent mx-1 text-base hover:bg-NeutralGray focus:outline-none backdrop-blur-md backdrop-contrast-60">
          {headerI18N.withdrawal[localeKey]}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] border-white bg-Background">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <TextSpan isCenter={false} size="lg">
              {exitI18N.confirmWithdrawalEmail[localeKey]}
            </TextSpan>
            <br />
            <br />
            <span className="font-bold text-base text-GoldenYellow underline decoration-white">
              {exitI18N.withdrawInfoRetention[localeKey]}
            </span>
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right font-bold text-base">
              {exitI18N.email[localeKey]}
            </Label>
            <Input
              id="name"
              className="col-span-3 text-base font-bold border-white placeholder:text-SilverGray"
              value={email}
              placeholder="Email"
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            onClick={() => userExit()}
            variant={"outline"}
            className="text-base font-semibold text-white bg-Background border-white"
          >
            {exitI18N.withdraw[localeKey]}
          </Button>
          <DialogClose asChild>
            <Button
              variant={"outline"}
              className="text-base font-semibold text-white bg-Background border-white"
            >
              {exitI18N.cancel[localeKey]}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>

      <DefaultAlert
        open={alertStatus}
        setOpen={setAlertStatus}
        title="Notice"
        description={alertDesc}
      />
    </Dialog>
  );
}
