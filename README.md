# CloudAdopt

CloudAdopt is a **Next.js + TypeScript + Supabase** web application for conducting an academic survey on cloud computing adoption in educational institutes.

The application provides:

- A public research landing page
- A structured **7-step survey**
- Conditional questions for cloud adopters and non-adopters
- Client-side and server-side validation
- Secure survey-response storage in Supabase
- Automatically generated response IDs
- A survey success/confirmation page
- Public research insights and charts
- About and methodology pages
- Survey open/closed control through Supabase
- Netlify deployment configuration

---

## 1. Technology Stack

| Technology      | Purpose                                                     |
| --------------- | ----------------------------------------------------------- |
| Next.js 13.5.1  | Full-stack React framework                                  |
| React 18        | UI                                                          |
| TypeScript      | Type safety                                                 |
| Supabase        | PostgreSQL database, API and authentication/session support |
| `@supabase/ssr` | Supabase clients for Next.js server/browser environments    |
| React Hook Form | Form state management                                       |
| Zod             | Form validation                                             |
| Recharts        | Analytics charts                                            |
| Tailwind CSS    | Styling                                                     |
| Radix UI        | Accessible UI primitives                                    |
| Lucide React    | Icons                                                       |
| Vercel          | Deployment                                                  |

Main dependencies are defined in:

```text
package.json
```

---

# 2. Project Structure

Important project files:

```text
CloudAdopt/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── about/
│   │   └── page.tsx
│   │
│   ├── methodology/
│   │   └── page.tsx
│   │
│   ├── insights/
│   │   └── page.tsx
│   │
│   └── survey/
│       ├── page.tsx
│       ├── actions.ts
│       └── success/
│           └── page.tsx
│
├── components/
│   ├── navbar.tsx
│   ├── footer.tsx
│   ├── charts.tsx
│   ├── chart-card.tsx
│   ├── stat-card.tsx
│   ├── section-header.tsx
│   ├── empty-state.tsx
│   ├── loading-state.tsx
│   │
│   └── survey/
│       ├── survey-form.tsx
│       ├── radio-question.tsx
│       ├── checkbox-question.tsx
│       ├── rating-question.tsx
│       ├── matrix-question.tsx
│       └── text-question.tsx
│
├── lib/
│   ├── survey-constants.ts
│   ├── queries.ts
│   ├── chart-data.ts
│   ├── database.types.ts
│   ├── utils.ts
│   │
│   └── supabase/
│       ├── server.ts
│       └── browser.ts
│
├── supabase/
│   └── migrations/
│       └── 20260826163434_create_survey_responses_and_settings.sql
│
├── middleware.ts
├── next.config.js
├── netlify.toml
├── tailwind.config.js
├── package.json
└── .env
```

---

# 3. Application Routes

| URL               | File                          | Purpose                                                 |
| ----------------- | ----------------------------- | ------------------------------------------------------- |
| `/`               | `app/page.tsx`                | Landing page and high-level statistics                  |
| `/about`          | `app/about/page.tsx`          | Research objective, questions, participants and privacy |
| `/methodology`    | `app/methodology/page.tsx`    | Research methodology and analysis approach              |
| `/survey`         | `app/survey/page.tsx`         | Survey entry page                                       |
| `/survey/success` | `app/survey/success/page.tsx` | Submission confirmation                                 |
| `/insights`       | `app/insights/page.tsx`       | Aggregate research charts/statistics                    |

---

# 4. High-Level Architecture

The survey follows this flow:

```text
User
 │
 │ opens /survey
 ▼
app/survey/page.tsx
 │
 │ checks survey_status
 ▼
components/survey/survey-form.tsx
 │
 │ React Hook Form
 │ + Zod validation
 │ + 7 survey steps
 ▼
submitSurveyAction(data)
 │
 │ Next.js Server Action
 ▼
app/survey/actions.ts
 │
 │ server-side validation
 │ survey status check
 │ data transformation
 ▼
Supabase
 │
 ▼
public.survey_responses
 │
 │ PostgreSQL generates response_code
 ▼
response_code
 │
 ▼
/survey/success?code=CA-YYYY-NNNNNN
```

---

# 5. Survey Form

The main survey UI is implemented in:

```text
components/survey/survey-form.tsx
```

This is a **Client Component**:

```tsx
"use client";
```

It uses:

```tsx
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
```

The form is connected to the Zod schema:

```tsx
const {
  control,
  handleSubmit,
  trigger,
  watch,
  formState: { errors },
} = useForm<SurveyData>({
  resolver: zodResolver(surveySchema),
  defaultValues,
  mode: "onChange",
});
```

### Responsibilities of `survey-form.tsx`

- Maintains the current survey step
- Stores all answers in React Hook Form
- Connects custom question components to form state
- Performs step-level validation
- Displays conditional questions
- Handles Previous/Next navigation
- Handles final submission
- Displays submission errors/loading state

---

# 6. The Seven Survey Steps

Survey step definitions are in:

```text
lib/survey-constants.ts
```

```tsx
export const surveySteps = [
  {
    id: 1,
    title: "Institute Profile",
    description: "Tell us about your institution",
  },
  {
    id: 2,
    title: "Cloud Adoption",
    description: "Current cloud usage",
  },
  {
    id: 3,
    title: "Cloud Services",
    description: "Services and extent of use",
  },
  {
    id: 4,
    title: "Adoption Drivers",
    description: "What motivates adoption",
  },
  {
    id: 5,
    title: "Benefits",
    description: "Experienced benefits and satisfaction",
  },
  {
    id: 6,
    title: "Challenges",
    description: "Barriers and difficulties",
  },
  {
    id: 7,
    title: "Future Adoption",
    description: "Plans and priorities",
  },
];
```

The form stores the current step with:

```tsx
const [step, setStep] = useState(1);
```

Progress is calculated with:

```tsx
const progress = (step / totalSteps) * 100;
```

---

# 7. Survey Questions

The allowed options are centralized in:

```text
lib/survey-constants.ts
```

Examples include:

```tsx
export const instituteTypes = [
  "School",
  "College",
  "University",
  "Training Institute",
  "Other",
] as const;
```

```tsx
export const cloudAdoptionOptions = [
  "Yes, extensively",
  "Yes, partially",
  "No",
  "Planning to adopt",
  "Not sure",
] as const;
```

Other option lists include:

- Student count ranges
- Employee count ranges
- Adoption duration
- Deployment models
- Cloud services
- Adoption drivers
- Benefits
- Challenges
- Non-adoption reasons
- Future adoption options
- Future cloud areas

Keeping these options in one file makes the questionnaire easier to maintain.

---

# 8. Question Components

The survey uses reusable components instead of implementing every question from scratch.

## Radio questions

File:

```text
components/survey/radio-question.tsx
```

Used for single-choice answers such as:

```text
Institute Type
Cloud Adoption
Student Count
Employee Count
Deployment Model
Future Adoption
```

Example:

```tsx
<RadioQuestion
  name="instituteType"
  value={field.value}
  options={instituteTypes}
  onChange={field.onChange}
  error={errors.instituteType?.message}
/>
```

---

## Checkbox questions

File:

```text
components/survey/checkbox-question.tsx
```

Used for multiple-choice answers such as:

```text
Cloud Services
Benefits
Challenges
Non-adoption Reasons
Future Areas
```

The selected values are stored as an array:

```ts
["Cloud Storage", "Institutional Email", "Cloud Databases"];
```

---

## Rating questions

File:

```text
components/survey/rating-question.tsx
```

Ratings use a 1–5 scale.

For example:

```text
1  2  3  4  5
```

Different labels are supplied for different questions.

Examples:

```tsx
ratingLabels;
satisfactionLabels;
challengeSignificanceLabels;
```

---

## Matrix questions

File:

```text
components/survey/matrix-question.tsx
```

Used for adoption drivers.

Each driver receives a 1–5 rating.

The resulting data has the form:

```json
{
  "Cost reduction": 4,
  "Scalability": 5,
  "Remote accessibility": 4
}
```

---

## Text questions

File:

```text
components/survey/text-question.tsx
```

Used for optional text fields such as:

```text
Institute Name
Location
```

The final comments field uses the shared textarea component.

---

# 9. Conditional Survey Logic

One of the important features of the survey is that questions change depending on the respondent's cloud-adoption status.

In:

```text
components/survey/survey-form.tsx
```

the current adoption answer is watched:

```tsx
const cloudAdoption = watch("cloudAdoption");
```

Then:

```tsx
const showAdopterQuestions = isAdopter(cloudAdoption ?? "");
```

The helper is defined in:

```text
lib/survey-constants.ts
```

```tsx
const isAdopter = (val: string) =>
  val === "Yes, extensively" || val === "Yes, partially";
```

## Adopter path

If the answer is:

```text
Yes, extensively
```

or:

```text
Yes, partially
```

the survey shows questions about:

- Adoption duration
- Deployment model
- Cloud services
- Service usage level
- Adoption drivers
- Benefits
- Satisfaction
- Challenge significance

## Non-adopter path

For:

```text
No
Planning to adopt
Not sure
```

the survey displays non-adoption questions where appropriate.

For example:

```text
What are the main reasons your institute has not adopted cloud computing?
```

This is controlled by:

```tsx
const showNonAdopterQuestions =
  cloudAdoption === "No" ||
  cloudAdoption === "Planning to adopt" ||
  cloudAdoption === "Not sure";
```

---

# 10. Validation

Validation is defined in:

```text
lib/survey-constants.ts
```

using Zod:

```tsx
export const surveySchema = z.object({
  ...
});
```

Required fields include:

```text
instituteType
cloudAdoption
futureAdoption
```

Optional fields include:

```text
studentCount
employeeCount
instituteName
location
adoptionDuration
deploymentModel
serviceUsageLevel
satisfaction
challengeSignificance
comments
```

The rating fields are constrained to 1–5:

```tsx
z.number().min(1).max(5);
```

Comments are limited to 2,000 characters:

```tsx
z.string().max(2000);
```

---

# 11. Step Navigation Validation

The form does not necessarily validate every question when the user presses Next.

The fields specifically required before moving forward are configured in:

```text
components/survey/survey-form.tsx
```

```tsx
const stepFields: Record<number, (keyof SurveyData)[]> = {
  1: ["instituteType"],
  2: ["cloudAdoption"],
  3: [],
  4: [],
  5: [],
  6: [],
  7: ["futureAdoption"],
};
```

The next-step handler calls:

```tsx
const valid = await trigger(fields as any);
```

If validation fails, the user remains on the current step.

---

# 12. Final Submission

The form is submitted with:

```tsx
<form onSubmit={handleSubmit(onSubmit)}>
```

The submit function is:

```tsx
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
      "Something went wrong while submitting your response. Please try again.",
    );
    setSubmitting(false);
  }
};
```

The important call is:

```tsx
submitSurveyAction(data);
```

This transfers the survey data to the Next.js server.

---

# 13. Backend / Server Action

The backend submission logic is:

```text
app/survey/actions.ts
```

It begins with:

```tsx
"use server";
```

This makes the function a Next.js Server Action.

The exported function is:

```tsx
export async function submitSurveyAction(
  rawData: unknown,
): Promise<SubmitResult>;
```

The backend receives the submitted form data and validates it again.

---

# 14. Server-Side Validation

The backend does not trust the browser's validation.

It runs:

```tsx
const result = surveySchema.safeParse(rawData);
```

If invalid:

```tsx
if (!result.success) {
  const firstError = result.error.issues[0];

  return {
    success: false,
    error: firstError?.message ?? "Please complete all required fields.",
  };
}
```

This provides a second validation layer.

The architecture is therefore:

```text
Browser validation
       +
Server validation
       ↓
Validated data
```

---

# 15. Checking Whether the Survey Is Open

The server action queries:

```text
app_settings
```

with:

```tsx
const { data: settings } = await supabase
  .from("app_settings")
  .select("survey_status")
  .eq("id", "00000000-0000-0000-0000-000000000001")
  .maybeSingle();
```

If the survey is closed:

```tsx
if (settings?.survey_status === "closed") {
  return {
    success: false,
    error: "The survey is currently closed and not accepting responses.",
  };
}
```

This means the survey status is enforced on the server as well as on the survey page.

---

# 16. Preparing Database Data

The frontend uses camelCase names:

```text
instituteType
cloudAdoption
cloudServices
futureAdoption
```

The database uses snake_case:

```text
institute_type
cloud_adoption
cloud_services
future_adoption
```

The conversion happens in:

```text
app/survey/actions.ts
```

Example:

```tsx
const insertData = {
  institute_type: data.instituteType,
  institute_name: data.instituteName || null,
  student_count: data.studentCount ?? null,
  employee_count: data.employeeCount ?? null,
  location: data.location || null,
  cloud_adoption: data.cloudAdoption,
  ...
};
```

This object is the database-ready version of the survey.

---

# 17. Adopter-Specific Database Data

The backend also determines whether the respondent is an adopter:

```tsx
const isAdopter =
  data.cloudAdoption === "Yes, extensively" ||
  data.cloudAdoption === "Yes, partially";
```

For adopters, fields such as:

```text
adoption_duration
deployment_model
cloud_services
service_usage_level
adoption_drivers
benefits
satisfaction
```

are stored.

For non-adopters, adopter-specific fields are reset to safe defaults:

```tsx
cloud_services: isAdopter ? data.cloudServices : [],
adoption_drivers: isAdopter ? data.adoptionDrivers : {},
satisfaction: isAdopter
  ? (data.satisfaction ?? null)
  : null,
```

Non-adoption reasons are stored separately:

```tsx
non_adoption_reasons:
  !isAdopter ? data.nonAdoptionReasons : [],
```

---

# 18. Supabase Database

The database schema is defined in:

```text
supabase/migrations/20260826163434_create_survey_responses_and_settings.sql
```

The main table is:

```text
public.survey_responses
```

Important fields include:

```text
id
response_code
institute_type
institute_name
student_count
employee_count
location
cloud_adoption
adoption_duration
deployment_model
cloud_services
service_usage_level
adoption_drivers
benefits
challenges
non_adoption_reasons
challenge_significance
satisfaction
future_adoption
future_areas
comments
is_demo
created_at
updated_at
```

---

# 19. Response ID Generation

The database automatically generates a human-friendly response ID.

A sequence is created:

```sql
create sequence if not exists survey_response_seq start 1;
```

The generator function creates IDs in this format:

```text
CA-YYYY-NNNNNN
```

For example:

```text
CA-2026-000001
CA-2026-000002
CA-2026-000003
```

The table uses:

```sql
response_code text unique not null default generate_response_code()
```

Therefore the application does not need to generate the response number itself.

---

# 20. Database Insert

The actual database insert occurs in:

```text
app/survey/actions.ts
```

```tsx
const { data: inserted, error } = await supabase
  .from("survey_responses")
  .insert(insertData)
  .select("response_code")
  .single();
```

The flow is:

```text
SurveyData
   ↓
insertData
   ↓
Supabase INSERT
   ↓
PostgreSQL generates response_code
   ↓
response_code returned
```

---

# 21. Row Level Security

RLS is enabled on:

```text
survey_responses
app_settings
```

The survey submission policy allows anonymous and authenticated users to insert survey responses:

```sql
create policy "public_insert_survey_responses"
  on survey_responses
  for insert
  to anon, authenticated
  with check (true);
```

Authenticated users are allowed to read, update and delete survey responses according to the policies in the migration.

The intended security model is:

```text
Public respondent
      │
      └── INSERT survey response

Authorized user
      │
      └── Read/manage responses
```

This prevents the public survey from automatically exposing all submitted responses.

---

# 22. Supabase Client Configuration

Server-side Supabase code is in:

```text
lib/supabase/server.ts
```

It uses:

```tsx
createServerClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  ...
);
```

The browser client is in:

```text
lib/supabase/browser.ts
```

It uses:

```tsx
createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);
```

---

# 23. Environment Variables

The application expects:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_publishable_or_anon_key
```

For local development, preferably create:

```text
.env.local
```

Do not commit real secrets to source control.

For example:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_KEY
```

After changing environment variables, restart the Next.js development server:

```bash
npm run dev
```

---

# 24. Survey Success Page

After a successful insert, the backend executes:

```tsx
redirect(`/survey/success?code=${inserted.response_code}`);
```

The page is:

```text
app/survey/success/page.tsx
```

It reads:

```tsx
const responseCode = searchParams.code ?? "—";
```

The respondent then sees:

```text
Thank you for participating.

Response ID    CA-2026-000001
Status         Confirmed
Submitted      <current date/time>
```

The page also provides links back to:

```text
/
 /insights
```

---

# 25. Research Insights

The public insights page is:

```text
app/insights/page.tsx
```

It loads survey data using:

```tsx
getAllResponsesForAnalytics();
```

and summary statistics using:

```tsx
getDashboardStats();
```

Both are implemented in:

```text
lib/queries.ts
```

The page displays:

- Total responses
- Cloud adoption rate
- Planning-to-adopt count
- Average satisfaction
- Cloud adoption distribution
- Most used cloud services
- Main adoption drivers
- Main challenges
- Satisfaction distribution
- Adoption by institute type
- Future adoption intent

---

# 26. Analytics Calculations

Chart preparation is separated into:

```text
lib/chart-data.ts
```

Examples:

```tsx
computeAdoptionDistribution(data);
```

```tsx
computeServiceUsage(data);
```

```tsx
computeAdoptionDrivers(data);
```

```tsx
computeChallenges(data);
```

```tsx
computeSatisfactionDistribution(data);
```

```tsx
computeAdoptionByInstituteType(data);
```

```tsx
computeFutureAdoption(data);
```

This keeps database querying and chart calculations separate.

---

# 27. Landing Page Statistics

The home page is:

```text
app/page.tsx
```

It uses:

```tsx
getLandingStats();
```

from:

```text
lib/queries.ts
```

The landing page shows:

```text
Institutes Surveyed
Cloud Adoption Rate
Average Satisfaction
Most Used Service
```

These values are calculated from submitted survey responses.

---

# 28. About Page

File:

```text
app/about/page.tsx
```

The About page explains:

- Research objective
- Research questions
- Who should participate
- Privacy approach

The research questions cover:

1. Cloud adoption
2. Cloud services
3. Adoption motivations
4. Benefits
5. Barriers
6. Satisfaction
7. Future adoption intentions

---

# 29. Methodology Page

File:

```text
app/methodology/page.tsx
```

The methodology describes the study as a quantitative survey.

It covers:

- Research approach
- Target population
- Data collection
- Survey areas
- Data analysis

The listed analysis methods include:

```text
Frequency
Percentage
Average scores
Distribution
Cross-tabulation
Comparative analysis
```

---

# 30. Survey Status

The survey status is stored in:

```text
public.app_settings
```

The default status is:

```text
open
```

The allowed values are:

```text
open
closed
```

When the status is `closed`, `/survey` displays:

```text
Survey currently closed
```

The server action also checks the status before accepting a submission.

This provides two layers of protection:

```text
Frontend/page check
        +
Server submission check
```

---

# 31. Middleware

The file:

```text
middleware.ts
```

creates a Supabase server client and calls:

```tsx
await supabase.auth.getUser();
```

Its main purpose is to keep Supabase authentication/session cookies synchronized with Next.js requests.

The middleware applies broadly through the configured matcher while excluding static assets.

---

# 32. TypeScript Database Types

Database types are stored in:

```text
lib/database.types.ts
```

The application uses these types to represent Supabase rows.

For example:

```tsx
type SurveyResponse = Database["public"]["Tables"]["survey_responses"]["Row"];
```

This is used by analytics/query functions to keep database data type-safe.

---

# 33. Installation

Clone or copy the project, then install dependencies:

```bash
npm install
```

Create the environment file:

```text
.env.local
```

Add:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_public_key
```

Start development:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 34. Database Setup

Create a Supabase project.

Then open:

```text
Supabase Dashboard
→ SQL Editor
→ New Query
```

Run the complete SQL from:

```text
supabase/migrations/20260826163434_create_survey_responses_and_settings.sql
```

This creates:

```text
survey_responses
app_settings
survey_response_seq
generate_response_code()
touch_updated_at()
```

as well as indexes, triggers and RLS policies.

---

# 35. Development Commands

Start development server:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

Start production server:

```bash
npm run start
```

Run TypeScript checking:

```bash
npm run typecheck
```

---

# 37. End-to-End Submission Example

Suppose a respondent chooses:

```text
Institute Type:
University

Cloud Adoption:
Yes, extensively

Adoption Duration:
3-5 years

Deployment Model:
Public Cloud

Cloud Services:
Cloud Storage
Institutional Email
Cloud Databases

Service Usage:
4

Satisfaction:
5

Future Adoption:
Definitely Yes
```

The frontend stores these values in React Hook Form.

On Submit:

```text
components/survey/survey-form.tsx
        ↓
submitSurveyAction(data)
        ↓
app/survey/actions.ts
        ↓
Zod server validation
        ↓
survey status check
        ↓
camelCase → snake_case mapping
        ↓
Supabase INSERT
        ↓
survey_responses
        ↓
PostgreSQL generates:
CA-2026-000001
        ↓
redirect()
        ↓
/survey/success?code=CA-2026-000001
```

---

# 38. Data Flow in One Diagram

```text
                    ┌──────────────────┐
                    │      USER        │
                    └────────┬─────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ /survey             │
                  │ app/survey/page.tsx │
                  └──────────┬──────────┘
                             │
                      survey_status
                             │
                             ▼
              ┌──────────────────────────────┐
              │ SurveyForm                   │
              │ survey-form.tsx              │
              │                              │
              │ React Hook Form              │
              │ Zod                          │
              │ 7 Steps                      │
              │ Conditional Logic             │
              └──────────────┬───────────────┘
                             │
                             │ Submit
                             ▼
              ┌──────────────────────────────┐
              │ submitSurveyAction()         │
              │ app/survey/actions.ts         │
              │                              │
              │ Server validation             │
              │ Status check                  │
              │ Data transformation           │
              └──────────────┬───────────────┘
                             │
                             ▼
                  ┌─────────────────────┐
                  │ Supabase             │
                  │ survey_responses     │
                  └──────────┬──────────┘
                             │
                    PostgreSQL generates
                       response_code
                             │
                             ▼
                  ┌─────────────────────┐
                  │ /survey/success     │
                  │                     │
                  │ Response ID         │
                  │ Confirmed           │
                  └─────────────────────┘
```

---

# 39. Security Model

The application is designed around Supabase Row Level Security.

### Public respondent

Can:

```text
Read survey settings/status
Insert a survey response
```

Should not be able to freely read all survey responses.

### Authorized users

Can access protected survey-response operations according to the authenticated RLS policies.

### Important

Do not put a Supabase `service_role` or secret key in:

```text
NEXT_PUBLIC_*
```

or browser code.

The `NEXT_PUBLIC_SUPABASE_ANON_KEY`/publishable key is intended for public client-side use with RLS protecting the database.

---

# 40. Important RLS / Insights Note

The current migration intentionally defines:

```sql
survey_responses
SELECT → authenticated
```

while the public survey needs:

```sql
survey_responses
INSERT → anon, authenticated
```

This is a secure default for protecting individual responses.

However, the current `/insights` implementation reads `survey_responses` through the normal server Supabase client. If anonymous visitors need to see the aggregate `/insights` page, the database access strategy must allow the required aggregate data without exposing individual responses.

Do **not** solve this by blindly adding:

```sql
SELECT → anon
USING (true)
```

because that could expose all survey responses.

A production implementation should use an appropriate aggregate/RPC/view strategy or another controlled access pattern.

---

# 41. Troubleshooting

## Error: `PGRST205`

```text
Could not find the table 'public.survey_responses'
```

Cause:

The table does not exist in the Supabase project configured in the application.

Fix:

Run:

```text
supabase/migrations/20260826163434_create_survey_responses_and_settings.sql
```

in the correct Supabase project's SQL Editor.

---

## Error: `42501`

```text
new row violates row-level security policy
```

Check:

```text
Supabase
→ Database
→ Policies
→ survey_responses
```

The public insert policy should allow:

```text
anon
authenticated
```

for:

```text
INSERT
```

with an appropriate `WITH CHECK` expression.

Also verify that the application's Supabase URL points to the same project where the policy was created.

---

## Environment variable changes not working

After changing `.env.local`:

```bash
Ctrl+C
npm run dev
```

Next.js needs to restart so the environment variables are loaded again.

---

## Survey says it is closed

Check:

```text
app_settings
```

and the row:

```text
00000000-0000-0000-0000-000000000001
```

The value should be:

```text
survey_status = open
```

---

# 42. Recommended Development Workflow

When modifying the survey:

### Change question options

Edit:

```text
lib/survey-constants.ts
```

### Change question UI

Edit:

```text
components/survey/
```

### Change survey step behavior

Edit:

```text
components/survey/survey-form.tsx
```

### Change validation

Edit:

```text
lib/survey-constants.ts
```

### Change database submission

Edit:

```text
app/survey/actions.ts
```

### Change database schema

Create/update a Supabase migration:

```text
supabase/migrations/
```

### Change analytics calculations

Edit:

```text
lib/chart-data.ts
lib/queries.ts
```

### Change public insights UI

Edit:

```text
app/insights/page.tsx
components/charts.tsx
```

---

# 43. Key Files to Understand First

If you are learning or maintaining this project, start with these files in this order:

```text
1. components/survey/survey-form.tsx
       ↓
2. lib/survey-constants.ts
       ↓
3. app/survey/actions.ts
       ↓
4. supabase/migrations/20260826163434_create_survey_responses_and_settings.sql
       ↓
5. lib/queries.ts
       ↓
6. lib/chart-data.ts
       ↓
7. app/insights/page.tsx
```

These files contain most of the application's core business logic.

---

# 44. Summary

CloudAdopt separates the application into three main layers:

```text
FRONTEND
components/survey/*
app/survey/page.tsx
lib/survey-constants.ts

        ↓

BACKEND
app/survey/actions.ts
lib/supabase/server.ts

        ↓

DATABASE
Supabase PostgreSQL
survey_responses
app_settings
RLS
response-code generation
```

The survey is a **7-step conditional questionnaire**. React Hook Form manages the answers, Zod validates them, the Next.js Server Action validates and transforms the data again, and Supabase stores the final response.

Each successful submission receives a database-generated response ID such as:

```text
CA-2026-000001
```

The response is then shown on:

```text
/survey/success?code=CA-2026-000001
```

Analytics are generated from stored responses through:

```text
lib/queries.ts
        +
lib/chart-data.ts
        +
app/insights/page.tsx
```

---

## License / Research Use

CloudAdopt is intended for academic/research survey use. Add the project's chosen license and research/ethical approval information here if the application is published or distributed.
