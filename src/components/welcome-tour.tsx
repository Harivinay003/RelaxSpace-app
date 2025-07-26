
'use client';

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';

const tourSteps = [
  {
    title: 'Welcome to SereneScape!',
    description: "Let's take a quick tour to see what you can do.",
  },
  {
    title: 'Meditation Library',
    description:
      'Explore our collection of guided meditations to find the perfect session for any moment. You can find this in the sidebar.',
  },
  {
    title: 'Ambient Sounds & Timer',
    description:
      'Use our ambient soundscapes to create a relaxing atmosphere, or set a simple unguided timer for your own practice.',
  },
  {
    title: 'AI Personalized Prompts',
    description:
      "Need inspiration? Our AI can generate a personalized meditation prompt based on your mood and goals.",
  },
  {
    title: 'Track Your Progress',
    description:
      "Keep track of your meditation journey, view your history, and see how much time you've dedicated to your practice.",
  },
  {
    title: 'You are all set!',
    description:
      'Enjoy your journey to a more mindful and peaceful state. Happy meditating!',
  },
];

const TOUR_STORAGE_KEY = 'serenescape_tour_completed';

export function WelcomeTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const tourCompleted = localStorage.getItem(TOUR_STORAGE_KEY);
    // We add a small delay to ensure it doesn't pop up immediately
    // and clash with the username prompt.
    const timer = setTimeout(() => {
        if (!tourCompleted) {
            setIsOpen(true);
        }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFinish = () => {
    localStorage.setItem(TOUR_STORAGE_KEY, 'true');
    setIsOpen(false);
  };
  
  const isLastStep = currentStep === tourSteps.length - 1;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {tourSteps[currentStep].title}
          </DialogTitle>
          <DialogDescription>{tourSteps[currentStep].description}</DialogDescription>
        </DialogHeader>

        <div className="flex justify-center my-4">
            <div className="flex gap-2">
                {tourSteps.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-colors ${
                            currentStep === index ? 'bg-primary' : 'bg-muted'
                        }`}
                    />
                ))}
            </div>
        </div>

        <DialogFooter className="flex justify-between w-full">
          {currentStep > 0 && (
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="mr-2" />
              Back
            </Button>
          )}
          <Button onClick={handleNext} className="ml-auto">
            {isLastStep ? 'Finish' : 'Next'}
            {isLastStep ? <CheckCircle className="ml-2" /> : <ArrowRight className="ml-2" />}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
