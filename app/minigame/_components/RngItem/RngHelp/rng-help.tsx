"use client";

import { useLocale } from "next-intl";
import { getLocaleKey } from "@/lib/func/localeFunction";
import { useState } from "react";
import { HelpCircle, Keyboard, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { minigameI18N, questI18N } from "@/lib/consts/i18nConsts";

export default function RngHelp() {
  const locale = useLocale();
  const localeKey = getLocaleKey(locale); // "en" | "ja" | "ko"
  const [currentStep, setCurrentStep] = useState(0);

  const steps = minigameI18N.help.steps;
  const step = steps[currentStep];
  const Icon = step.icon;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  return (
    <Dialog onOpenChange={() => setCurrentStep(0)}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="z-50 size-14 rounded-full shadow-lg border-2 border-orange-400 bg-white hover:bg-orange-50 hover:border-orange-500 transition-all duration-200 cursor-pointer"
        >
          <HelpCircle className="size-7 text-orange-500" />
          <span className="sr-only">{minigameI18N.help.title[localeKey]}</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-4xl max-h-[92vh] overflow-hidden p-0">
        <DialogHeader className="px-6 pt-6 pb-2">
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <HelpCircle className="size-6 text-orange-500" />
            {minigameI18N.help.title[localeKey]}
          </DialogTitle>
        </DialogHeader>

        {/* Step Indicators */}
        <div className="flex justify-center gap-2 px-6 pb-4">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentStep(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                index === currentStep
                  ? "w-8 bg-orange-500"
                  : "w-2 bg-gray-200 hover:bg-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="px-6 pb-6">
          <div className="rounded-xl border-2 border-gray-100 bg-gray-50 overflow-hidden">
            {/* Step Header */}
            <div className={`${step.color} px-4 py-3 flex items-center gap-3`}>
              <div className="flex items-center justify-center size-10 rounded-full bg-white/20">
                <Icon className="size-5 text-white" />
              </div>
              <div>
                <p className="text-white/80 text-sm font-medium">
                  Step {step.id}
                </p>
                <h3 className="text-white font-bold text-lg">
                  {step.title[localeKey]}
                </h3>
              </div>
            </div>

            {/* Image */}
            <div className="relative aspect-[16/9] min-h-[360px] bg-gray-200">
              <Image
                src={step.image[localeKey]}
                alt={step.title[localeKey]}
                fill
                className="object-cover"
              />
            </div>

            {/* Description */}
            <div className="p-4 bg-white">
              <p className="text-gray-700 leading-relaxed">
                {step.description[localeKey]}
              </p>

              {/* Keyboard hint */}
              {step.id === 5 && (
                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <Keyboard className="size-4" />
                  <span>{minigameI18N.help.hint.keyboard[localeKey]}</span>
                  <kbd className="px-2 py-1 bg-gray-100 border border-gray-300 rounded text-xs font-mono font-semibold">
                    R
                  </kbd>
                  <span>{minigameI18N.help.hint.pressKey[localeKey]}</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 0}
              className="gap-2 bg-transparent cursor-pointer"
            >
              {questI18N.prev[localeKey]}
            </Button>

            <span className="text-sm text-gray-500">
              {currentStep + 1} / {steps.length}
            </span>

            <Button
              onClick={nextStep}
              disabled={currentStep === steps.length - 1}
              className="gap-2 bg-orange-500 hover:bg-orange-600 cursor-pointer"
            >
              {questI18N.next[localeKey]}
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
