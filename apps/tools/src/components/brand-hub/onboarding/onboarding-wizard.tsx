"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useOnboardingWizard } from "@/hooks/use-onboarding-wizard";
import { WizardProgressBar } from "./wizard-progress-bar";
import { WizardStepHandles } from "./wizard-step-handles";
import { WizardStepScraping } from "./wizard-step-scraping";
import { WizardStepReview } from "./wizard-step-review";
import type { BrandProfile } from "@/types/brand-hub";

interface OnboardingWizardProps {
  onComplete: (profile: BrandProfile) => void;
  onCancel: () => void;
}

export function OnboardingWizard({ onComplete, onCancel }: OnboardingWizardProps) {
  const wizard = useOnboardingWizard(onComplete);

  return (
    <Card className="border-copper/15">
      <CardHeader>
        <WizardProgressBar currentStep={wizard.step} />
      </CardHeader>
      <CardContent>
        {wizard.step === "handles" && (
          <WizardStepHandles
            instagramHandle={wizard.instagramHandle}
            tiktokHandle={wizard.tiktokHandle}
            onChangeHandles={wizard.setHandles}
            onAnalyze={wizard.analyze}
            onCancel={onCancel}
            error={wizard.error}
          />
        )}

        {wizard.step === "scraping" && <WizardStepScraping />}

        {wizard.step === "review" && wizard.analysis && (
          <WizardStepReview
            analysis={wizard.analysis}
            instagramHandle={wizard.instagramHandle}
            tiktokHandle={wizard.tiktokHandle}
            postsAnalyzed={wizard.postsAnalyzed}
            loading={wizard.loading}
            error={wizard.error}
            onCreateProfile={wizard.createProfile}
            onBack={wizard.goBack}
          />
        )}
      </CardContent>
    </Card>
  );
}
