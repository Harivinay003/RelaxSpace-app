import AIPromptForm from './ai-prompt-form';

export default function AIPromptPage() {
  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      <div className="flex flex-col items-start space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Personalized Meditation Prompt</h2>
        <p className="text-muted-foreground max-w-2xl">
          Feeling unsure where to begin? Let our AI guide you. Describe your current mood and what you hope to achieve with your meditation, and we'll generate a custom prompt to start your session with intention.
        </p>
      </div>
      <AIPromptForm />
    </div>
  );
}
