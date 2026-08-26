import { z } from 'zod';

export const instituteTypes = [
  'School',
  'College',
  'University',
  'Training Institute',
  'Other',
] as const;

export const studentCounts = [
  'Less than 500',
  '500-1,000',
  '1,001-5,000',
  '5,001-10,000',
  'More than 10,000',
] as const;

export const employeeCounts = [
  'Less than 50',
  '50-100',
  '101-500',
  '501-1,000',
  'More than 1,000',
] as const;

export const cloudAdoptionOptions = [
  'Yes, extensively',
  'Yes, partially',
  'No',
  'Planning to adopt',
  'Not sure',
] as const;

export const adoptionDurations = [
  'Less than 1 year',
  '1-3 years',
  '3-5 years',
  'More than 5 years',
] as const;

export const deploymentModels = [
  'Public Cloud',
  'Private Cloud',
  'Hybrid Cloud',
  'Community Cloud',
  'Not sure',
] as const;

export const cloudServices = [
  'Cloud Storage',
  'Institutional Email',
  'Video Conferencing',
  'Learning Management System',
  'Cloud Databases',
  'Virtual Machines',
  'Cloud Backup',
  'Student Information Systems',
  'Collaboration Tools',
  'Data Analytics',
  'AI/ML Services',
  'Other',
] as const;

export const adoptionDrivers = [
  'Cost reduction',
  'Scalability',
  'Remote accessibility',
  'Improved collaboration',
  'Data backup',
  'Disaster recovery',
  'Improved performance',
  'Support for online learning',
  'Reduced infrastructure maintenance',
  'Faster deployment',
  'Access to advanced technology',
] as const;

export const benefits = [
  'Lower IT infrastructure costs',
  'Improved accessibility',
  'Better collaboration',
  'Easier maintenance',
  'Improved scalability',
  'Faster deployment',
  'Better backup',
  'Improved disaster recovery',
  'Better support for remote learning',
  'Improved productivity',
  'Better resource utilization',
  'Other',
] as const;

export const challenges = [
  'Security concerns',
  'Privacy concerns',
  'Cost',
  'Lack of technical expertise',
  'Poor internet connectivity',
  'Resistance to change',
  'Lack of management support',
  'Vendor dependency',
  'Migration difficulties',
  'Lack of awareness',
  'Compliance concerns',
  'Reliability concerns',
  'Other',
] as const;

export const nonAdoptionReasons = [
  'Security concerns',
  'Privacy concerns',
  'Cost',
  'Lack of technical expertise',
  'Poor internet connectivity',
  'Resistance to change',
  'Lack of management support',
  'Lack of awareness',
  'Compliance concerns',
  'No perceived need',
  'Other',
] as const;

export const futureAdoptionOptions = [
  'Definitely Yes',
  'Probably Yes',
  'Not Sure',
  'Probably No',
  'Definitely No',
] as const;

export const futureAreas = [
  'Learning Management',
  'Administration',
  'Student Management',
  'Research',
  'Data Storage',
  'Communication',
  'Data Analytics',
  'Artificial Intelligence',
  'Backup and Disaster Recovery',
  'Other',
] as const;

export const ratingLabels: Record<number, string> = {
  1: 'Very Limited',
  2: 'Limited',
  3: 'Moderate',
  4: 'Extensive',
  5: 'Very Extensive',
};

export const satisfactionLabels: Record<number, string> = {
  1: 'Very Dissatisfied',
  2: 'Dissatisfied',
  3: 'Neutral',
  4: 'Satisfied',
  5: 'Very Satisfied',
};

export const challengeSignificanceLabels: Record<number, string> = {
  1: 'Not Significant',
  2: 'Slightly Significant',
  3: 'Moderately Significant',
  4: 'Significant',
  5: 'Very Significant',
};

const isAdopter = (val: string) =>
  val === 'Yes, extensively' || val === 'Yes, partially';

export const surveySchema = z.object({
  // Step 1
  instituteType: z.enum(instituteTypes, {
    errorMap: () => ({ message: 'Please select an institute type' }),
  }),
  studentCount: z.enum(studentCounts, {
    errorMap: () => ({ message: 'Please select a student count range' }),
  }).optional(),
  employeeCount: z.enum(employeeCounts, {
    errorMap: () => ({ message: 'Please select an employee count range' }),
  }).optional(),
  instituteName: z.string().max(200).optional().or(z.literal('')),
  location: z.string().max(200).optional().or(z.literal('')),

  // Step 2
  cloudAdoption: z.enum(cloudAdoptionOptions, {
    errorMap: () => ({ message: 'Please select your cloud adoption status' }),
  }),
  adoptionDuration: z.enum(adoptionDurations).optional(),
  deploymentModel: z.enum(deploymentModels).optional(),

  // Step 3
  cloudServices: z.array(z.string()).default([]),
  serviceUsageLevel: z.number().min(1).max(5).optional(),

  // Step 4
  adoptionDrivers: z
    .record(z.string(), z.number().min(1).max(5))
    .default({}),

  // Step 5
  benefits: z.array(z.string()).default([]),
  satisfaction: z.number().min(1).max(5).optional(),

  // Step 6
  challenges: z.array(z.string()).default([]),
  nonAdoptionReasons: z.array(z.string()).default([]),
  challengeSignificance: z.number().min(1).max(5).optional(),

  // Step 7
  futureAdoption: z.enum(futureAdoptionOptions, {
    errorMap: () => ({ message: 'Please select a future adoption option' }),
  }),
  futureAreas: z.array(z.string()).default([]),
  comments: z.string().max(2000).optional().or(z.literal('')),
});

export type SurveyData = z.infer<typeof surveySchema>;

export const surveySteps = [
  { id: 1, title: 'Institute Profile', description: 'Tell us about your institution' },
  { id: 2, title: 'Cloud Adoption', description: 'Current cloud usage' },
  { id: 3, title: 'Cloud Services', description: 'Services and extent of use' },
  { id: 4, title: 'Adoption Drivers', description: 'What motivates adoption' },
  { id: 5, title: 'Benefits', description: 'Experienced benefits and satisfaction' },
  { id: 6, title: 'Challenges', description: 'Barriers and difficulties' },
  { id: 7, title: 'Future Adoption', description: 'Plans and priorities' },
];

export { isAdopter };
