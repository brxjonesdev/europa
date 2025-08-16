/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import type React from "react"
import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogTitle } from "@/shared/ui/dialog"
import { Checkbox } from "@/shared/ui/checkbox"
import { cn } from "@/lib/utils"
import pages from "./onboarding-pages"
import { createClient } from "@/lib/supabase/client"

function Button({
  onClick,
  children,
  className,
}: {
  onClick: () => void
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={cn(
        "relative flex h-8 shrink-0 scale-100 select-none appearance-none items-center justify-center rounded-lg border border-zinc-950/10 bg-transparent px-2 text-sm text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:ring-2 active:scale-[0.98] dark:border-zinc-50/10 dark:text-zinc-50 dark:hover:bg-zinc-800",
        className,
      )}
    >
      {children}
    </button>
  )
}

const ONBOARDING_STORAGE_KEY = "hideOnboardingOnStartup"

function initUser() {
  // Initialize user data or perform setup actions
  console.log("Initializing user...")
  // Add your user initialization logic here
}



export function OnboardingView() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [showOnboarding, setShowOnboarding] = useState(true)
  const [hideOnStartup, setHideOnStartup] = useState(false)

  useEffect(() => {
    const shouldHide = localStorage.getItem(ONBOARDING_STORAGE_KEY) === "true"
    if (shouldHide) {
      setShowOnboarding(false)
    }
    setHideOnStartup(shouldHide)
  }, [])

  const handleHideOnStartupChange = (checked: boolean) => {
    setHideOnStartup(checked)
    localStorage.setItem(ONBOARDING_STORAGE_KEY, checked.toString())
  }

  const handleSetActiveIndex = (newIndex: number) => {
    setActiveIndex(newIndex)
  }

  useEffect(() => {
    if (activeIndex < 0) setActiveIndex(0)
    if (activeIndex >= pages.length) setActiveIndex(pages.length - 1)
  }, [activeIndex])

  const currentPage = pages[activeIndex]

  return (
    <Dialog open={showOnboarding} onOpenChange={setShowOnboarding}>
      <DialogContent className="p-0 w-fit rounded-xl" showCloseButton={false}>
        <div className="w-[364px] overflow-hidden rounded-xl border border-zinc-950/10 bg-white dark:bg-zinc-700">
          <div className="px-4 pt-4 space-y-2">
            <div>{currentPage.image}</div>
            <DialogTitle className="mb-0.5 font-medium text-zinc-800 dark:text-zinc-100">
              {currentPage.title}
            </DialogTitle>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm">{currentPage.description}</p>
          </div>

         

          <div className="flex justify-between p-4">
            {activeIndex > 0 ? (
              <Button onClick={() => handleSetActiveIndex(activeIndex - 1)}>Previous</Button>
            ) : (
              <div />
            )}
            {activeIndex < pages.length - 1 ? (
              <Button onClick={() => handleSetActiveIndex(activeIndex + 1)}>Next</Button>
            ) : (
              <Button
                onClick={() => setShowOnboarding(false)}
                className="bg-primary text-white font-medium hover:bg-primary/90 hover:cursor-pointer"
              >
                Close
              </Button>
            )}
          </div>
           <div className="px-4 pb-2 border-t pt-2 text-right">
            <div className="flex items-right space-x-2">
              <Checkbox id="hide-startup" checked={hideOnStartup} onCheckedChange={handleHideOnStartupChange} />
              <label htmlFor="hide-startup" className="text-sm text-zinc-600 dark:text-zinc-400 cursor-pointer">
                Don&apos;t show this on startup
              </label>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
