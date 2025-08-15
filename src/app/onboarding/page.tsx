"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
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
  Archive,
} from "lucide-react";
import { completeOnboarding } from "~/app/onboarding/_actions";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSpaceType, setSelectedSpaceType] = useState<
    "blank" | "default" | null
  >(null);
  const [isPending, startTransition] = useTransition();
  const [loadingStep, setLoadingStep] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const nextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteOnboarding = () => {
    if (!selectedSpaceType) return;

    setError(null);

    startTransition(async () => {
      try {
        // Simuler les étapes pour l'UX
        setLoadingStep("Creating your workspace...");
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (selectedSpaceType === "default") {
          setLoadingStep("Setting up your folders...");
          await new Promise((resolve) => setTimeout(resolve, 600));

          setLoadingStep("Adding example files...");
          await new Promise((resolve) => setTimeout(resolve, 1000));
        }

        setLoadingStep("Finalizing your setup...");

        const result = await completeOnboarding(selectedSpaceType);

        if (result.success && result.redirectTo) {
          setLoadingStep("Welcome to LPX DRIVE!");
          await new Promise((resolve) => setTimeout(resolve, 500));
          router.push(result.redirectTo);
        } else {
          setError(result.error ?? "An error occurred during setup");
          setLoadingStep("");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to complete onboarding");
        setLoadingStep("");
      }
    });
  };

  // Loading State
  if (isPending) {
    return (
      <div className="bg-background min-h-screen">
        {/* Header */}
        <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Cloud className="text-primary mr-3 h-8 w-8" />
                <div className="flex items-center gap-2">
                  <span className="text-primary text-2xl font-bold">
                    LPX DRIVE
                  </span>
                  <span className="bg-accent/10 text-accent rounded-full px-2 py-1 text-xs font-medium">
                    BETA
                  </span>
                </div>
              </div>
              <div className="text-muted-foreground flex items-center gap-2 text-sm">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Setting up...</span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar - Full */}
        <div className="bg-muted h-1 w-full">
          <div className="bg-primary h-1 w-full transition-all duration-300 ease-out" />
        </div>

        <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card className="bg-card border-border shadow-xl">
              <CardHeader className="pb-6 text-center">
                <div className="bg-primary/10 mx-auto mb-6 w-fit rounded-full p-4">
                  <Loader2 className="text-primary h-12 w-12 animate-spin" />
                </div>
                <CardTitle className="text-card-foreground mb-2 text-3xl font-bold">
                  Setting up your Drive
                </CardTitle>
                <CardDescription className="text-muted-foreground text-lg">
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
                        completed={
                          loadingStep.includes("Adding example files") ||
                          loadingStep.includes("Finalizing") ||
                          loadingStep.includes("Welcome")
                        }
                        active={loadingStep.includes("Setting up your folders")}
                      />

                      <LoadingStep
                        icon={<FileText className="h-5 w-5" />}
                        text="Adding example files"
                        completed={
                          loadingStep.includes("Finalizing") ||
                          loadingStep.includes("Welcome")
                        }
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
                  <div className="bg-muted/50 mt-6 rounded-lg p-4">
                    <h4 className="text-foreground mb-3 text-center font-medium">
                      Creating these folders for you:
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-muted-foreground flex items-center gap-2">
                        <FileText className="h-4 w-4" />
                        <span>Documents</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        {/* eslint-disable-next-line jsx-a11y/alt-text */}
                        <Image className="h-4 w-4" />
                        <span>Pictures</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
                        <Video className="h-4 w-4" />
                        <span>Videos</span>
                      </div>
                      <div className="text-muted-foreground flex items-center gap-2">
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
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="border-border bg-background/95 supports-[backdrop-filter]:bg-background/60 border-b backdrop-blur">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Cloud className="text-primary mr-3 h-8 w-8" />
              <div className="flex items-center gap-2">
                <span className="text-primary text-2xl font-bold">
                  LPX DRIVE
                </span>
                <span className="bg-accent/10 text-accent rounded-full px-2 py-1 text-xs font-medium">
                  BETA
                </span>
              </div>
            </div>
            <div className="text-muted-foreground flex items-center gap-2 text-sm">
              <span>Step {currentStep} of 2</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-muted h-1 w-full">
        <div
          className="bg-primary h-1 transition-all duration-300 ease-out"
          style={{ width: `${(currentStep / 2) * 100}%` }}
        />
      </div>

      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Error Display */}
          {error && (
            <div className="mx-auto mb-6 max-w-2xl">
              <Card className="border-destructive bg-destructive/5">
                <CardContent className="pt-6">
                  <div className="text-destructive flex items-center gap-2">
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
                <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
                  Welcome to <span className="text-primary">LPX DRIVE</span>
                </h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  {`Let's set up your cloud storage space. Choose how you'd like to start your journey.`}
                </p>
              </div>

              <div className="mx-auto mb-8 grid max-w-3xl gap-6 md:grid-cols-2">
                {/* Blank Space Option */}
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    selectedSpaceType === "blank"
                      ? "ring-primary bg-primary/5 ring-2"
                      : "bg-card border-border"
                  }`}
                  onClick={() => setSelectedSpaceType("blank")}
                >
                  <CardHeader className="pb-4 text-center">
                    <div className="bg-muted mx-auto mb-4 w-fit rounded-2xl p-4">
                      <FolderOpen className="text-foreground h-8 w-8" />
                    </div>
                    <CardTitle className="text-card-foreground flex items-center justify-center gap-2 text-xl font-bold">
                      Start Fresh
                      {selectedSpaceType === "blank" && (
                        <Check className="text-primary h-5 w-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center leading-relaxed">
                      Begin with a completely empty space. Perfect if you want
                      to organize everything your own way from scratch.
                    </CardDescription>
                    <div className="mt-4 text-center">
                      <span className="text-accent text-sm font-medium">
                        Clean slate approach
                      </span>
                    </div>
                  </CardContent>
                </Card>

                {/* Default Folders Option */}
                <Card
                  className={`cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    selectedSpaceType === "default"
                      ? "ring-primary bg-primary/5 ring-2"
                      : "bg-card border-border"
                  }`}
                  onClick={() => setSelectedSpaceType("default")}
                >
                  <CardHeader className="pb-4 text-center">
                    <div className="bg-accent/10 mx-auto mb-4 w-fit rounded-2xl p-4">
                      <Sparkles className="text-accent h-8 w-8" />
                    </div>
                    <CardTitle className="text-card-foreground flex items-center justify-center gap-2 text-xl font-bold">
                      Pre-organized
                      {selectedSpaceType === "default" && (
                        <Check className="text-primary h-5 w-5" />
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground text-center leading-relaxed">
                      Start with helpful folders like Documents, Photos, and
                      Archive. Great for getting organized quickly.
                    </CardDescription>
                    <div className="mt-4 text-center">
                      <span className="text-accent text-sm font-medium">
                        Ready to use
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg"
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
                <h1 className="text-foreground mb-4 text-4xl font-bold md:text-5xl">
                  Choose Your Plan
                </h1>
                <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                  During our beta phase, enjoy full access to LPX DRIVE
                  completely free.
                </p>
              </div>

              <div className="mx-auto mb-8 max-w-md">
                <Card className="from-primary to-secondary text-primary-foreground border-0 bg-gradient-to-br shadow-xl">
                  <CardHeader className="pb-4 text-center">
                    <div className="bg-accent mx-auto mb-4 w-fit rounded-2xl p-4">
                      <Cloud className="text-accent-foreground h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl font-bold">
                      Free Beta Access
                    </CardTitle>
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
                        <Check className="text-accent h-5 w-5 flex-shrink-0" />
                        <span>Unlimited file storage</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent h-5 w-5 flex-shrink-0" />
                        <span>Cross-platform sync</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent h-5 w-5 flex-shrink-0" />
                        <span>Secure file sharing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Check className="text-accent h-5 w-5 flex-shrink-0" />
                        <span>Priority beta support</span>
                      </div>
                    </div>

                    <div className="border-primary-foreground/20 border-t pt-4">
                      <p className="text-primary-foreground/80 text-center text-sm">
                        Help us perfect LPX DRIVE while enjoying full access
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col justify-center gap-4 sm:flex-row">
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent px-8 py-4 text-lg"
                  onClick={prevStep}
                >
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back
                </Button>
                <Button
                  size="lg"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 text-lg"
                  onClick={handleCompleteOnboarding}
                  disabled={!selectedSpaceType}
                >
                  Start Using LPX DRIVE
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <p className="text-muted-foreground mt-4 text-sm">
                No credit card required • Cancel anytime • Upgrade options
                coming soon
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// Composant pour les étapes de loading
function LoadingStep({
  icon,
  text,
  completed,
  active,
}: {
  icon: React.ReactNode;
  text: string;
  completed: boolean;
  active: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg p-3 transition-all duration-300 ${
        active
          ? "bg-primary/10 border-primary/20 border"
          : completed
            ? "bg-accent/10 border-accent/20 border"
            : "bg-muted/50"
      }`}
    >
      <div
        className={`flex-shrink-0 transition-colors duration-300 ${
          completed
            ? "text-accent"
            : active
              ? "text-primary"
              : "text-muted-foreground"
        }`}
      >
        {completed ? <Check className="h-5 w-5" /> : icon}
      </div>
      <span
        className={`text-sm font-medium transition-colors duration-300 ${
          completed
            ? "text-accent"
            : active
              ? "text-primary"
              : "text-muted-foreground"
        }`}
      >
        {text}
      </span>
      {active && (
        <Loader2 className="text-primary ml-auto h-4 w-4 animate-spin" />
      )}
      {completed && <Check className="text-accent ml-auto h-4 w-4" />}
    </div>
  );
}
