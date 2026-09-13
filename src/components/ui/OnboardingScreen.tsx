import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

export interface OnboardingScreenProps {
  title?: string;
  subtitle?: string;
  currentStep: number;
  totalSteps?: number;
  onNext?: () => void;
  onBack?: () => void;
  nextButtonText?: string;
  finishButtonText?: string;
  isNextDisabled?: boolean;
  tooltipMainText?: string;
  tooltipSubText?: string;
  rightSectionDescription?: string;
  rightCardContent?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  headerIcon?: React.ReactNode;
}

const spring = { type: "spring", stiffness: 300, damping: 30 } as const;
const progressSpring = { type: "spring", stiffness: 120, damping: 20 } as const;

export const OnboardingScreen: React.FC<OnboardingScreenProps> = ({
  title = "Student Onboarding",
  subtitle = "Complete your profile to unlock adaptive cognitive testing & placement radar.",
  currentStep = 1,
  totalSteps = 3,
  onNext,
  onBack,
  nextButtonText = "Continue",
  finishButtonText = "Complete Setup & Launch Portal",
  isNextDisabled = false,
  tooltipMainText = "360° Verified Student Identity",
  tooltipSubText = "Real-time institutional verification preview",
  rightSectionDescription = "Your validated profile is automatically indexed for top tech recruiters and campus placement drives.",
  rightCardContent,
  children,
  className,
  headerIcon,
}) => {
  return (
    <div className={cn("flex min-h-screen w-full flex-col items-center justify-center p-4 md:p-8 bg-transparent transition-colors duration-500", className)}>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={spring}
        className="flex w-full max-w-xl flex-col overflow-hidden rounded-[32px] border bg-white p-2.5 shadow-2xl transition-colors duration-500 md:max-w-5xl md:flex-row dark:bg-[#0A0E17] dark:border-white/10"
        style={{
          boxShadow: "0 25px 60px -15px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)",
        }}
      >
        {/* Left Form Section */}
        <div className="flex flex-[1.25] flex-col justify-between rounded-[26px] border border-black/5 bg-[#FAFAFA] px-7 py-8 transition-colors duration-500 md:rounded-l-[26px] md:rounded-r-none md:border-r-0 md:px-12 md:py-10 dark:border-white/10 dark:bg-[#111622]">
          <div className="mx-auto w-full max-w-md">
            {/* Header Icon */}
            <div className="mb-6 flex justify-between items-center">
              <div className="flex items-center gap-2.5">
                <div className="rounded-xl bg-teal-500/10 p-2.5 text-teal-600 dark:bg-teal-500/15 dark:text-teal-400">
                  {headerIcon || (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-xs font-black tracking-wider uppercase text-teal-700 dark:text-teal-400" style={{ fontFamily: "var(--font-mono)" }}>
                    OPTIVATORS ONBOARDING
                  </span>
                </div>
              </div>

              {/* Step indicator tag */}
              <div className="px-3 py-1 rounded-full text-xs font-bold text-slate-600 bg-slate-200/60 dark:text-slate-300 dark:bg-white/10" style={{ fontFamily: "var(--font-mono)" }}>
                STEP {currentStep} / {totalSteps}
              </div>
            </div>

            {/* Title & Subtitle */}
            <h1 className="mb-1.5 text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 transition-colors dark:text-white">
              {title}
            </h1>
            <p className="mb-6 text-xs md:text-sm text-slate-500 leading-relaxed transition-colors dark:text-slate-400">
              {subtitle}
            </p>

            {/* Progress Stepper Bars */}
            <div className="mb-8 flex gap-2">
              {Array.from({ length: totalSteps }).map((_, idx) => {
                const stepNum = idx + 1;
                return (
                  <div
                    key={stepNum}
                    className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-white/10"
                  >
                    <motion.div
                      animate={{ width: stepNum <= currentStep ? "100%" : "0%" }}
                      transition={progressSpring}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-teal-500 to-emerald-400"
                    />
                  </div>
                );
              })}
            </div>

            {/* Form Content */}
            <div className="mb-8 min-h-[290px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.25 }}
                >
                  {children}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Actions */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-200/80 dark:border-white/10">
              {currentStep > 1 && (
                <motion.button
                  type="button"
                  onClick={onBack}
                  whileTap={{ scale: 0.95 }}
                  className="shrink-0 flex items-center justify-center rounded-2xl border border-slate-200 bg-white p-3.5 text-slate-700 shadow-sm transition-all hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  <ChevronLeft size={20} />
                </motion.button>
              )}

              <motion.button
                type="button"
                onClick={onNext}
                disabled={isNextDisabled}
                whileTap={{ scale: isNextDisabled ? 1 : 0.98 }}
                className={cn(
                  "flex flex-1 items-center justify-center rounded-2xl px-8 py-3.5 text-sm font-bold text-white shadow-xl transition-all",
                  "bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 shadow-teal-500/25 hover:opacity-95",
                  isNextDisabled && "opacity-50 cursor-not-allowed"
                )}
              >
                {currentStep === totalSteps ? finishButtonText : nextButtonText}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right Interactive Preview Panel */}
        <div className="relative hidden flex-1 flex-col items-center justify-center rounded-[26px] border border-black/5 bg-[#F4F6F8] p-8 transition-colors duration-500 md:flex md:rounded-l-none md:rounded-r-[26px] md:border-l-0 dark:border-white/5 dark:bg-[#0B1019]">
          {/* Ambient Glow */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-r-[26px]">
            <div className="absolute top-1/4 -right-10 w-64 h-64 rounded-full bg-teal-500/10 blur-3xl dark:bg-teal-500/15" />
            <div className="absolute bottom-1/4 -left-10 w-64 h-64 rounded-full bg-purple-500/10 blur-3xl dark:bg-purple-500/15" />
          </div>

          {/* Floating Tooltip Pill */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-10 -mb-4 rounded-2xl border border-slate-200 bg-white/90 px-4 py-2 text-center text-xs font-semibold text-slate-800 shadow-lg backdrop-blur-md transition-colors dark:border-white/10 dark:bg-[#1A2232]/90 dark:text-white"
          >
            <p className="flex items-center justify-center gap-1.5 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {tooltipMainText}
            </p>
            <p className="text-[10px] font-normal text-slate-500 dark:text-slate-400">
              {tooltipSubText}
            </p>
          </motion.div>

          {/* Dynamic Card Display */}
          <motion.div
            layout
            className="relative my-7 w-full max-w-sm overflow-hidden rounded-[28px] border border-slate-200 bg-white p-6 shadow-xl backdrop-blur-xl transition-all dark:border-white/10 dark:bg-[#121826]"
            style={{
              boxShadow: "0 20px 40px -15px rgba(13, 148, 136, 0.15), 0 0 0 1px rgba(0,0,0,0.03)",
            }}
          >
            {rightCardContent}
          </motion.div>

          <p className="max-w-xs text-center text-xs leading-relaxed text-slate-500 transition-colors dark:text-slate-400">
            {rightSectionDescription}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default OnboardingScreen;
