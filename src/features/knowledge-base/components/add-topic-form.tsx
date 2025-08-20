"use client"

import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { set, z } from "zod"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { Textarea } from "@/shared/ui/textarea"
import { CheckCircle, ChevronLeft, ChevronRight, Plus, Trash2, BookOpen, Target} from "lucide-react"
import { Badge } from "@/shared/ui/badge"
import { Label } from "@/shared/ui/label"
import { addLearningObjective, addTopic} from "../services"
import { LearningObjective, Topic } from "../types"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

const formSchema = z.object({
  topicTitle: z
    .string()
    .min(3, "Topic title must be at least 3 characters")
    .max(100, "Topic title must be less than 100 characters"),
  topicDescription: z
    .string()
    .min(10, "Please provide a brief description of what you want to learn")
    .max(500, "Description must be less than 500 characters"),
  topicReasoning: z
    .string()
    .min(10, "Please share why this topic matters to you")
    .max(1000, "Reasoning must be less than 1000 characters")
    .optional(),
  learningObjectives: z
    .array(
      z.object({
        id: z.string(),
        title: z
          .string()
          .min(3, "Objective title must be at least 3 characters")
          .max(100, "Title must be less than 100 characters"),
        description: z
          .string()
          .min(10, "Please describe what you want to achieve")
          .max(500, "Description must be less than 500 characters"),
        reasoning: z.string().optional(),
      }),
    )
    .min(1, "Add at least one learning objective")
    .max(5, "Maximum 5 learning objectives allowed"),
})

type FormData = z.infer<typeof formSchema>

export function AddTopicForm() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 3


  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topicTitle: "",
      topicDescription: "",
      topicReasoning: "",
      learningObjectives: [
        {
          id: crypto.randomUUID(),
          title: "",
          description: "",
          reasoning: "",
        },
      ],
    },
    mode: "onChange",
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "learningObjectives",
  })

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const onSubmit = async (data: FormData) => {
    const supabase = await createClient()
    const { data:{ user }, error } = await supabase.auth.getUser()
    if( error || !user?.id) {
      setIsSubmitting(false)
      return
    }
    setIsSubmitting(true)
    // split data into topic and objectives
    const id = crypto.randomUUID()
    const newTopic: Topic = {
      id,
      ownerId: user.id,
      title: data.topicTitle,
      description: data.topicDescription,
      createdAt: new Date().toISOString(),
      reasoning: data.topicReasoning
    }
    const objectives: LearningObjective[] = data.learningObjectives.map((obj) => ({
      ...obj,
      id: crypto.randomUUID(),
      topicId: id
    }))
    // insert topic
     const topicResult = await addTopic(newTopic)
     if (!topicResult.ok) {
      setIsSubmitting(false)
      // Handle error (e.g., show notification)
     }
    // then insert objectives
    const objectiveResult = await addLearningObjective(objectives)
    if (!objectiveResult.ok) {
      setIsSubmitting(false)
      // Handle error (e.g., show notification)
      return
    }
    setIsSubmitting(false)
    resetForm()
    router.push(`/learning/${newTopic.id}`)
  }

  const isStepValid = () => {
    const values = getValues()

    switch (currentStep) {
      case 1:
        return values.topicTitle && values.topicDescription && !errors.topicTitle && !errors.topicDescription
      case 2:
        return values.topicReasoning || !errors.topicReasoning || !values.topicReasoning
      case 3:
        return (
          values.learningObjectives.length > 0 &&
          values.learningObjectives.every((obj) => obj.title && obj.description) &&
          !errors.learningObjectives
        )
      default:
        return false
    }
  }

  const addObjective = () => {
    if (fields.length < 5) {
      append({
        id: crypto.randomUUID(),
        title: "",
        description: "",
        reasoning: "",
      })
    }
  }

  const resetForm = () => {
    setCurrentStep(1)
    reset()
  }


  const stepTitles = ["What do you want to learn?", "Why does this matter to you?", "What are your learning goals?"]

  const stepDescriptions = [
    "Tell us about the topic you're excited to explore",
    "Understanding your motivation helps us create a better learning experience",
    "Define specific objectives to guide your learning journey",
  ]

  return (
    <Card className="w-full mx-auto border-none shadow-none  md:p-0">
      <CardHeader className="space-y-4 md:p-0">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <CardTitle className="text-lg">{stepTitles[currentStep - 1]}</CardTitle>
            <CardDescription className="text-xs">{stepDescriptions[currentStep - 1]}</CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 text-sm md:p-0">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-sm">
          {/* Step 1: Topic Information */}
          {currentStep === 1 && (
            <div className="space-y-6 text-sm">
              <div className="space-y-2">
                <Label htmlFor="topicTitle" className="text-sm font-medium">
                  Topic Title
                </Label>
                <Input
                  id="topicTitle"
                  placeholder="e.g., Machine Learning Fundamentals, Spanish Conversation, Web Development..."
                  className="text-xs"
                  {...register("topicTitle")}
                />
                <p className="text-xs text-muted-foreground">Give your learning topic a clear, descriptive name</p>
                {errors.topicTitle && <p className="text-sm text-destructive">{errors.topicTitle.message}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="topicDescription" className="text-sm font-medium">
                  What do you want to learn?
                </Label>
                <Textarea
                  id="topicDescription"
                  placeholder="Describe what you want to learn about this topic. What specific areas or skills are you most interested in exploring?"
                  className="min-h-[100px] text-xs"
                  {...register("topicDescription")}
                />
                <p className="text-xs text-muted-foreground">Help us understand the scope and focus of your learning</p>
                {errors.topicDescription && (
                  <p className="text-xs text-destructive">{errors.topicDescription.message}</p>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Motivation & Reasoning */}
          {currentStep === 2 && (
            <div className="space-y-6 ">
              <div className="items-start gap-3 p-4 bg-cyan-50 rounded-lg border border-cyan-200 md:block hidden">
                <div className="space-y-1">
                  <p className="font-medium text-sm text-cyan-900">Why does motivation matter?</p>
                  <p className="text-xs text-cyan-700">
                    Understanding your &quot;why&quot; helps us create a more personalized learning experience and keeps you
                    motivated throughout your journey.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="topicReasoning" className="text-sm font-medium">
                  Why do you want to learn about this?
                </Label>
                <Textarea
                  id="topicReasoning"
                  placeholder="Share your motivation... Are you looking to advance your career? Pursue a personal interest? Solve a specific problem? The more you share, the better we can tailor your learning experience."
                  className="min-h-[120px] text-sm"
                  {...register("topicReasoning")}
                />
                <p className="text-xs text-muted-foreground">
                  Your personal motivation helps us customize your learning path
                </p>
                {errors.topicReasoning && <p className="text-xs text-destructive">{errors.topicReasoning.message}</p>}
              </div>
            </div>
          )}

          {/* Step 3: Learning Objectives */}
          {currentStep === 3 && (
            <div className="space-y-6 ">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  <h3 className="font-medium">Learning Objectives</h3>
                  <Badge variant="secondary">{fields.length}/5</Badge>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addObjective}
                  disabled={fields.length >= 5}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Objective
                </Button>
              </div>

              <div className="space-y-4 max-h-72 overflow-y-scroll">
                {fields.map((field, index) => (
                  <Card key={field.id} className="p-4 border-2 border-dashed border-muted">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-sm text-muted-foreground">Objective {index + 1}</h4>
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => remove(index)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`objective-${index}-title`} className="text-sm">
                          What do you want to achieve?
                        </Label>
                        <Input
                          id={`objective-${index}-title`}
                          placeholder="e.g., Build a web application, Have basic conversations, Understand core concepts..."
                          {...register(`learningObjectives.${index}.title`)}
                        />
                        {errors.learningObjectives?.[index]?.title && (
                          <p className="text-sm text-destructive">{errors.learningObjectives[index]?.title?.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`objective-${index}-description`} className="text-sm">
                          Describe this objective
                        </Label>
                        <Textarea
                          id={`objective-${index}-description`}
                          placeholder="Provide more details about what success looks like for this objective..."
                          className="min-h-[80px]"
                          {...register(`learningObjectives.${index}.description`)}
                        />
                        {errors.learningObjectives?.[index]?.description && (
                          <p className="text-sm text-destructive">
                            {errors.learningObjectives[index]?.description?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200 md:block hidden">
                <p className="text-sm text-amber-800">
                  <strong>Tip:</strong> Good learning objectives are specific and measurable. Instead of &quot;learn
                  programming,&quot; try &quot;build a personal website using HTML, CSS, and JavaScript.&quot;
                </p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center gap-2 bg-transparent"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>

            {currentStep < totalSteps ? (
              <Button type="button" onClick={nextStep} disabled={!isStepValid()} className="flex items-center gap-2">
                Continue
                <ChevronRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={!isStepValid()}
                
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700"
              >
                {isSubmitting ? "Creating..." : "Create Learning Path"}
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
