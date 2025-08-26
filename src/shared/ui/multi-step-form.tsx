/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, ReactNode } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Progress } from "@/shared/ui/progress"
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react"

type StepConfig<T> = {
  title: string
  content: (formData: T, update: (field: keyof T, value: T[keyof T]) => void) => ReactNode
  validate?: (formData: T) => boolean
}

interface MultiStepFormProps<T> {
  title?: string
  description?: string
  initialData: T
  steps: StepConfig<T>[]
  onSubmit: (data: T) => void
  successContent?: ReactNode
  type: string
}

export function MultiStepForm<T extends Record<string, any>>({
  title,
  description,
  initialData,
  steps,
  onSubmit,
  type,
  successContent,
}: MultiStepFormProps<T>) {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState<T>(initialData)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = steps.length
  const progress = ((currentStep + 1) / totalSteps) * 100

  const updateFormData = (field: keyof T, value: T[keyof T]) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps - 1) setCurrentStep((s) => s + 1)
  }

  const prevStep = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1)
  }

  const handleSubmit = () => {
    onSubmit(formData)
    setIsSubmitted(true)
  }

  const isStepValid = () => {
    const validator = steps[currentStep].validate
    return validator ? validator(formData) : true
  }

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6 text-center space-y-4">
          {successContent || (
            <p className="text-muted-foreground">
              Your form has been submitted successfully. We&#39;ll get back to you soon!
            </p>
          )}
          <Button
            onClick={() => {
              setIsSubmitted(false)
              setCurrentStep(0)
              setFormData(initialData)
            }}
          >
            Submit Another {type}
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full  mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardDescription>
          Step {currentStep + 1} of {totalSteps}
        </CardDescription>
        <Progress value={progress} className="w-full" />
      </CardHeader>

      <CardContent className="space-y-6 border-t pt-4">
        <h3 className="text-lg font-semibold">{steps[currentStep].title}</h3>
        {steps[currentStep].content(formData, updateFormData)}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </Button>

          {currentStep < totalSteps - 1 ? (
            <Button onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2">
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={!isStepValid()} className="flex items-center gap-2">
              Submit Form
              <CheckCircle className="w-4 h-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
