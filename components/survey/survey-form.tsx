'use client';

import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  surveySchema,
  surveySteps,
  instituteTypes,
  studentCounts,
  employeeCounts,
  cloudAdoptionOptions,
  adoptionDurations,
  deploymentModels,
  cloudServices,
  adoptionDrivers,
  benefits,
  challenges,
  nonAdoptionReasons,
  futureAdoptionOptions,
  futureAreas,
  ratingLabels,
  satisfactionLabels,
  challengeSignificanceLabels,
  isAdopter,
  type SurveyData,
} from '@/lib/survey-constants';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { RadioQuestion } from '@/components/survey/radio-question';
import { CheckboxQuestion } from '@/components/survey/checkbox-question';
import { RatingQuestion } from '@/components/survey/rating-question';
import { MatrixQuestion } from '@/components/survey/matrix-question';
import { TextQuestion } from '@/components/survey/text-question';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft, ArrowRight, Check, Loader2, AlertCircle } from 'lucide-react';
import { submitSurveyAction } from '@/app/survey/actions';
import { cn } from '@/lib/utils';

const defaultValues = {
  instituteType: undefined,
  studentCount: undefined,
  employeeCount: undefined,
  instituteName: '',
  location: '',
  cloudAdoption: undefined,
  adoptionDuration: undefined,
  deploymentModel: undefined,
  cloudServices: [],
  serviceUsageLevel: undefined,
  adoptionDrivers: {},
  benefits: [],
  challenges: [],
  nonAdoptionReasons: [],
  challengeSignificance: undefined,
  satisfaction: undefined,
  futureAdoption: undefined,
  futureAreas: [],
  comments: '',
} as unknown as SurveyData;

export function SurveyForm() {
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    formState: { errors },
  } = useForm<SurveyData>({
    resolver: zodResolver(surveySchema),
    defaultValues,
    mode: 'onChange',
  });

  const cloudAdoption = watch('cloudAdoption');
  const showAdopterQuestions = isAdopter(cloudAdoption ?? '');
  const showNonAdopterQuestions =
    cloudAdoption === 'No' ||
    cloudAdoption === 'Planning to adopt' ||
    cloudAdoption === 'Not sure';

  const totalSteps = surveySteps.length;
  const progress = (step / totalSteps) * 100;

  const stepFields: Record<number, (keyof SurveyData)[]> = {
    1: ['instituteType'],
    2: ['cloudAdoption'],
    3: [],
    4: [],
    5: [],
    6: [],
    7: ['futureAdoption'],
  };

  const nextStep = async () => {
    const fields = stepFields[step] ?? [];
    if (fields.length > 0) {
      const valid = await trigger(fields as any);
      if (!valid) return;
    }
    setSubmitError(null);
    setStep((s) => Math.min(s + 1, totalSteps));
  };

  const prevStep = () => {
    setSubmitError(null);
    setStep((s) => Math.max(s - 1, 1));
  };

  const onSubmit = async (data: SurveyData) => {
    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitSurveyAction(data);
      if (!result.success) {
        setSubmitError(result.error);
        setSubmitting(false);
      }
    } catch {
      setSubmitError(
        'Something went wrong while submitting your response. Please try again.'
      );
      setSubmitting(false);
    }
  };

  const currentStepInfo = surveySteps[step - 1];

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
      {/* Progress */}
      <div className="mb-8">
        <div className="mb-2 flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              Step {step} of {totalSteps}
            </p>
            <h1 className="mt-0.5 text-xl font-semibold tracking-tight">
              {currentStepInfo.title}
            </h1>
          </div>
          <span className="text-sm font-medium text-muted-foreground">
            {Math.round(progress)}%
          </span>
        </div>
        <Progress value={progress} className="h-1.5" />
        <p className="mt-2 text-sm text-muted-foreground">
          {currentStepInfo.description}
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="animate-fade-in" key={step}>
          <CardHeader>
            <CardTitle className="text-lg">{currentStepInfo.title}</CardTitle>
            <CardDescription>{currentStepInfo.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Institute Profile */}
            {step === 1 && (
              <>
                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    Institute Type <span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="instituteType"
                    render={({ field }) => (
                      <RadioQuestion
                        name="instituteType"
                        value={field.value}
                        options={instituteTypes}
                        onChange={field.onChange}
                        error={errors.instituteType?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    Number of Students
                  </Label>
                  <Controller
                    control={control}
                    name="studentCount"
                    render={({ field }) => (
                      <RadioQuestion
                        name="studentCount"
                        value={field.value}
                        options={studentCounts}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    Number of Employees
                  </Label>
                  <Controller
                    control={control}
                    name="employeeCount"
                    render={({ field }) => (
                      <RadioQuestion
                        name="employeeCount"
                        value={field.value}
                        options={employeeCounts}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>

                <Controller
                  control={control}
                  name="instituteName"
                  render={({ field }) => (
                    <TextQuestion
                      label="Institute Name"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="e.g. Northfield University (optional)"
                      optional
                    />
                  )}
                />

                <Controller
                  control={control}
                  name="location"
                  render={({ field }) => (
                    <TextQuestion
                      label="Location"
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Country, state, or region (optional)"
                      optional
                    />
                  )}
                />
              </>
            )}

            {/* Step 2: Cloud Adoption */}
            {step === 2 && (
              <>
                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    Does your institute currently use cloud computing?{' '}
                    <span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="cloudAdoption"
                    render={({ field }) => (
                      <RadioQuestion
                        name="cloudAdoption"
                        value={field.value}
                        options={cloudAdoptionOptions}
                        onChange={field.onChange}
                        error={errors.cloudAdoption?.message}
                      />
                    )}
                  />
                </div>

                {showAdopterQuestions && (
                  <div className="space-y-6 border-t border-border/60 pt-6 animate-fade-in">
                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        How long has your institute been using cloud computing?
                      </Label>
                      <Controller
                        control={control}
                        name="adoptionDuration"
                        render={({ field }) => (
                          <RadioQuestion
                            name="adoptionDuration"
                            value={field.value}
                            options={adoptionDurations}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        What is your primary cloud deployment model?
                      </Label>
                      <Controller
                        control={control}
                        name="deploymentModel"
                        render={({ field }) => (
                          <RadioQuestion
                            name="deploymentModel"
                            value={field.value}
                            options={deploymentModels}
                            onChange={field.onChange}
                          />
                        )}
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            {/* Step 3: Cloud Services */}
            {step === 3 && (
              <>
                {showAdopterQuestions ? (
                  <>
                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        Which cloud services does your institute currently use?
                      </Label>
                      <Controller
                        control={control}
                        name="cloudServices"
                        render={({ field }) => (
                          <CheckboxQuestion
                            value={field.value}
                            options={cloudServices}
                            onChange={field.onChange}
                            columns={2}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        How extensively are cloud services used?
                      </Label>
                      <Controller
                        control={control}
                        name="serviceUsageLevel"
                        render={({ field }) => (
                          <RatingQuestion
                            value={field.value}
                            onChange={field.onChange}
                            labels={ratingLabels}
                          />
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      Since your institute does not currently use cloud
                      computing, this step does not apply. Please continue to
                      the next step.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Step 4: Adoption Drivers */}
            {step === 4 && (
              <>
                {showAdopterQuestions ? (
                  <div>
                    <Label className="mb-2 flex items-center gap-1.5">
                      Rate each factor that motivated your institute to adopt
                      cloud computing (1 = Not important, 5 = Very important)
                    </Label>
                    <Controller
                      control={control}
                      name="adoptionDrivers"
                      render={({ field }) => (
                        <MatrixQuestion
                          drivers={adoptionDrivers}
                          values={field.value ?? {}}
                          onChange={(driver, value) =>
                            field.onChange({
                              ...field.value,
                              [driver]: value,
                            })
                          }
                        />
                      )}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      This step applies to institutes using cloud computing.
                      Please continue to the next step.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Step 5: Benefits */}
            {step === 5 && (
              <>
                {showAdopterQuestions ? (
                  <>
                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        Which benefits has your institute experienced?
                      </Label>
                      <Controller
                        control={control}
                        name="benefits"
                        render={({ field }) => (
                          <CheckboxQuestion
                            value={field.value}
                            options={benefits}
                            onChange={field.onChange}
                            columns={2}
                          />
                        )}
                      />
                    </div>

                    <div>
                      <Label className="mb-2 flex items-center gap-1.5">
                        Overall satisfaction with cloud computing
                      </Label>
                      <Controller
                        control={control}
                        name="satisfaction"
                        render={({ field }) => (
                          <RatingQuestion
                            value={field.value}
                            onChange={field.onChange}
                            labels={satisfactionLabels}
                          />
                        )}
                      />
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-border/60 bg-secondary/30 p-6 text-center">
                    <p className="text-sm text-muted-foreground">
                      This step applies to institutes using cloud computing.
                      Please continue to the next step.
                    </p>
                  </div>
                )}
              </>
            )}

            {/* Step 6: Challenges */}
            {step === 6 && (
              <>
                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    What challenges does your institute face with cloud
                    computing?
                  </Label>
                  <Controller
                    control={control}
                    name="challenges"
                    render={({ field }) => (
                      <CheckboxQuestion
                        value={field.value}
                        options={challenges}
                        onChange={field.onChange}
                        columns={2}
                      />
                    )}
                  />
                </div>

                {showAdopterQuestions && (
                  <div className="animate-fade-in">
                    <Label className="mb-2 flex items-center gap-1.5">
                      How significant are cloud adoption challenges overall?
                    </Label>
                    <Controller
                      control={control}
                      name="challengeSignificance"
                      render={({ field }) => (
                        <RatingQuestion
                          value={field.value}
                          onChange={field.onChange}
                          labels={challengeSignificanceLabels}
                        />
                      )}
                    />
                  </div>
                )}

                {showNonAdopterQuestions && (
                  <div className="border-t border-border/60 pt-6 animate-fade-in">
                    <Label className="mb-2 flex items-center gap-1.5">
                      What are the main reasons your institute has not adopted
                      cloud computing?
                    </Label>
                    <Controller
                      control={control}
                      name="nonAdoptionReasons"
                      render={({ field }) => (
                        <CheckboxQuestion
                          value={field.value}
                          options={nonAdoptionReasons}
                          onChange={field.onChange}
                          columns={2}
                        />
                      )}
                    />
                  </div>
                )}
              </>
            )}

            {/* Step 7: Future Adoption */}
            {step === 7 && (
              <>
                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    How likely is your institute to increase cloud computing
                    adoption in the future? <span className="text-destructive">*</span>
                  </Label>
                  <Controller
                    control={control}
                    name="futureAdoption"
                    render={({ field }) => (
                      <RadioQuestion
                        name="futureAdoption"
                        value={field.value}
                        options={futureAdoptionOptions}
                        onChange={field.onChange}
                        error={errors.futureAdoption?.message}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label className="mb-2 flex items-center gap-1.5">
                    Which areas are most likely to move to the cloud?
                  </Label>
                  <Controller
                    control={control}
                    name="futureAreas"
                    render={({ field }) => (
                      <CheckboxQuestion
                        value={field.value}
                        options={futureAreas}
                        onChange={field.onChange}
                        columns={2}
                      />
                    )}
                  />
                </div>

                <div>
                  <Label className="mb-2">Additional Comments (optional)</Label>
                  <Controller
                    control={control}
                    name="comments"
                    render={({ field }) => (
                      <Textarea
                        value={field.value}
                        onChange={field.onChange}
                        placeholder="Share any additional thoughts about cloud computing in your institution..."
                        className="min-h-[120px]"
                      />
                    )}
                  />
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {submitError && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{submitError}</span>
          </div>
        )}

        {/* Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={prevStep}
            disabled={step === 1 || submitting}
            className={cn(step === 1 && 'invisible')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Previous
          </Button>

          {step < totalSteps ? (
            <Button type="button" onClick={nextStep} disabled={submitting}>
              Next
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          ) : (
            <Button type="submit" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Submit Survey
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </section>
  );
}
