import { cn } from "@/lib/utils"

type Step = {
  id: number
  name: string
}

interface StepIndicatorProps {
  steps: Step[]
  currentStep: number
}

export function StepIndicator({ steps, currentStep }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center w-full mt-4 overflow-x-auto">
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-center">
          <div
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full border text-sm font-medium",
              currentStep >= step.id
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-muted-foreground border-muted",
            )}
          >
            {step.id}
          </div>
          <div className="hidden sm:block ml-2 mr-4 text-sm font-medium whitespace-nowrap">{step.name}</div>
          {index < steps.length - 1 && (
            <div className={cn("hidden sm:block w-12 h-0.5 mx-1", currentStep > step.id ? "bg-primary" : "bg-muted")} />
          )}
        </div>
      ))}
    </div>
  )
}
