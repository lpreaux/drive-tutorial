"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Button } from "~/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card"
import {
  Cloud,
  ArrowRight,
  ArrowLeft,
  FolderOpen,
  Sparkles,
  Check,
  Loader2,
  FolderPlus,
  FileText,
  Image,
  Video,
  Archive
} from "lucide-react"
import { completeOnboarding } from "~/app/onboarding/_actions"

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSpaceType, setSelectedSpaceType] = useState<"blank" | "default" | null>(null)
  const [isPending, startTransition] = useTransition()
  const [loadingStep, setLoadingStep] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleCompleteOnboarding = () => {
    if (!selectedSpaceType) return

    setError(null)

    startTransition(async () => {
      try {
        // Simuler les étapes pour l'UX
        setLoadingStep("Creating your workspace...")
        await new Promise(resolve => setTimeout(resolve, 800))

        if (selectedSpaceType === "default") {
          setLoadingStep("Setting up your folders...")
          await new Promise(resolve => setTimeout(resolve, 600))

          setLoadingStep("Adding example files...")
          await new Promise(resolve => setTimeout(resolve, 1000))
        }

        setLoadingStep("Finalizing your setup...")

        const result = await completeOnboarding(selectedSpaceType)

        if (result.success && result.redirectTo) {
          setLoadingStep("Welcome to LPX DRIVE!")
          await new Promise(resolve => setTimeout(resolve, 500))
          router.push(result.redirectTo)
        } else {
          setError(result.error ?? "An error occurred during setup")
          setLoadingStep("")
        }
      } catch (err) {
        console.error(err)
        setError("Failed to complete onboarding")
        setLoadingStep("")
      }
    })
  }

  // Loading State
  if (isPending) {
    return (
        <div className="min-h-screen bg-background">
          {/* Header */}
          <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <Cloud className="h-8 w-8 text-primary mr-3" />
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">LPX DRIVE</span>
                    <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">BETA</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Setting up...</span>
                </div>
              </div>
            </div>
          </header>

          {/* Progress Bar - Full */}
          <div className="w-full bg-muted h-1">
            <div className="h-1 bg-primary w-full transition-all duration-300 ease-out" />
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="max-w-2xl mx-auto">
              <Card className="bg-card border-border shadow-xl">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-6 p-4 bg-primary/10 rounded-full w-fit">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold text-card-foreground mb-2">
                    Setting up your Drive
                  </CardTitle>
                  <CardDescription className="text-lg text-muted-foreground">
                    {loadingStep || "Please wait while we prepare everything..."}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Progress Steps */}
                  <div className="space-y-3">
                    <LoadingStep
                        icon={<FolderPlus className="h-5 w-5" />}
                        text="Creating your workspace"
                        completed={!loadingStep.includes("Creating your workspace")}
                        active={loadingStep.includes("Creating your workspace")}
                    />

                    {selectedSpaceType === "default" && (
                        <>
                          <LoadingStep
                              icon={<FolderOpen className="h-5 w-5" />}
                              text="Setting up default folders"
                              completed={loadingStep.includes("Adding example files") || loadingStep.includes("Finalizing") || loadingStep.includes("Welcome")}
                              active={loadingStep.includes("Setting up your folders")}
                          />

                          <LoadingStep
                              icon={<FileText className="h-5 w-5" />}
                              text="Adding example files"
                              completed={loadingStep.includes("Finalizing") || loadingStep.includes("Welcome")}
                              active={loadingStep.includes("Adding example files")}
                          />
                        </>
                    )}

                    <LoadingStep
                        icon={<Check className="h-5 w-5" />}
                        text="Finalizing your setup"
                        completed={loadingStep.includes("Welcome")}
                        active={loadingStep.includes("Finalizing")}
                    />
                  </div>

                  {/* Preview of what's being created for default type */}
                  {selectedSpaceType === "default" && (
                      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                        <h4 className="font-medium text-foreground mb-3 text-center">Creating these folders for you:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <FileText className="h-4 w-4" />
                            <span>Documents</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            {/* eslint-disable-next-line jsx-a11y/alt-text */}
                            <Image className="h-4 w-4" />
                            <span>Pictures</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Video className="h-4 w-4" />
                            <span>Videos</span>
                          </div>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Archive className="h-4 w-4" />
                            <span>Archived</span>
                          </div>
                        </div>
                      </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
    )
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Cloud className="h-8 w-8 text-primary mr-3" />
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-primary">LPX DRIVE</span>
                  <span className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">BETA</span>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>Step {currentStep} of 2</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="w-full bg-muted h-1">
          <div
              className="h-1 bg-primary transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 2) * 100}%` }}
          />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-4xl mx-auto">
            {/* Error Display */}
            {error && (
                <div className="mb-6 max-w-2xl mx-auto">
                  <Card className="border-destructive bg-destructive/5">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-2 text-destructive">
                        <span className="font-medium">Setup Error:</span>
                        <span>{error}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>
            )}

            {/* Step 1: Welcome & Space Type Selection */}
            {currentStep === 1 && (
                <div className="text-center">
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                      Welcome to <span className="text-primary">LPX DRIVE</span>
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      {`Let's set up your cloud storage space. Choose how you'd like to start your journey.`}
                    </p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-8">
                    {/* Blank Space Option */}
                    <Card
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                            selectedSpaceType === "blank" ? "ring-2 ring-primary bg-primary/5" : "bg-card border-border"
                        }`}
                        onClick={() => setSelectedSpaceType("blank")}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 p-4 bg-muted rounded-2xl w-fit">
                          <FolderOpen className="h-8 w-8 text-foreground" />
                        </div>
                        <CardTitle className="text-xl font-bold text-card-foreground flex items-center justify-center gap-2">
                          Start Fresh
                          {selectedSpaceType === "blank" && <Check className="h-5 w-5 text-primary" />}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-muted-foreground leading-relaxed">
                          Begin with a completely empty space. Perfect if you want to organize everything your own way from
                          scratch.
                        </CardDescription>
                        <div className="mt-4 text-center">
                          <span className="text-sm font-medium text-accent">Clean slate approach</span>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Default Folders Option */}
                    <Card
                        className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                            selectedSpaceType === "default" ? "ring-2 ring-primary bg-primary/5" : "bg-card border-border"
                        }`}
                        onClick={() => setSelectedSpaceType("default")}
                    >
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 p-4 bg-accent/10 rounded-2xl w-fit">
                          <Sparkles className="h-8 w-8 text-accent" />
                        </div>
                        <CardTitle className="text-xl font-bold text-card-foreground flex items-center justify-center gap-2">
                          Pre-organized
                          {selectedSpaceType === "default" && <Check className="h-5 w-5 text-primary" />}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-center text-muted-foreground leading-relaxed">
                          Start with helpful folders like Documents, Photos, and Archive. Great for getting organized
                          quickly.
                        </CardDescription>
                        <div className="mt-4 text-center">
                          <span className="text-sm font-medium text-accent">Ready to use</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-4"
                      onClick={nextStep}
                      disabled={!selectedSpaceType}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
            )}

            {/* Step 2: Tier Selection */}
            {currentStep === 2 && (
                <div className="text-center">
                  <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Choose Your Plan</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                      During our beta phase, enjoy full access to LPX DRIVE completely free.
                    </p>
                  </div>

                  <div className="max-w-md mx-auto mb-8">
                    <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground border-0 shadow-xl">
                      <CardHeader className="text-center pb-4">
                        <div className="mx-auto mb-4 p-4 bg-accent rounded-2xl w-fit">
                          <Cloud className="h-8 w-8 text-accent-foreground" />
                        </div>
                        <CardTitle className="text-2xl font-bold">Free Beta Access</CardTitle>
                        <CardDescription className="text-primary-foreground/90 text-lg">
                          Full features, no limits
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="text-center">
                          <span className="text-4xl font-bold">$0</span>
                          <span className="text-primary-foreground/80">/month</span>
                        </div>

                        <div className="space-y-3 text-left">
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0" />
                            <span>Unlimited file storage</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0" />
                            <span>Cross-platform sync</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0" />
                            <span>Secure file sharing</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Check className="h-5 w-5 text-accent flex-shrink-0" />
                            <span>Priority beta support</span>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-primary-foreground/20">
                          <p className="text-sm text-primary-foreground/80 text-center">
                            Help us perfect LPX DRIVE while enjoying full access
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" size="lg" className="text-lg px-8 py-4 bg-transparent" onClick={prevStep}>
                      <ArrowLeft className="mr-2 h-5 w-5" />
                      Back
                    </Button>
                    <Button
                        size="lg"
                        className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-4"
                        onClick={handleCompleteOnboarding}
                        disabled={!selectedSpaceType}
                    >
                      Start Using LPX DRIVE
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mt-4">
                    No credit card required • Cancel anytime • Upgrade options coming soon
                  </p>
                </div>
            )}
          </div>
        </div>
      </div>
  )
}

// Composant pour les étapes de loading
function LoadingStep({
                       icon,
                       text,
                       completed,
                       active
                     }: {
  icon: React.ReactNode;
  text: string;
  completed: boolean;
  active: boolean;
}) {
  return (
      <div className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
          active ? 'bg-primary/10 border border-primary/20' :
              completed ? 'bg-accent/10 border border-accent/20' :
                  'bg-muted/50'
      }`}>
        <div className={`flex-shrink-0 transition-colors duration-300 ${
            completed ? 'text-accent' :
                active ? 'text-primary' :
                    'text-muted-foreground'
        }`}>
          {completed ? <Check className="h-5 w-5" /> : icon}
        </div>
        <span className={`text-sm font-medium transition-colors duration-300 ${
            completed ? 'text-accent' :
                active ? 'text-primary' :
                    'text-muted-foreground'
        }`}>
        {text}
      </span>
        {active && (
            <Loader2 className="h-4 w-4 animate-spin text-primary ml-auto" />
        )}
        {completed && (
            <Check className="h-4 w-4 text-accent ml-auto" />
        )}
      </div>
  );
}