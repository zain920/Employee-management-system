import { z } from 'zod';

export const employeeSchema = z.object({
  firstName: z.string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be at most 50 characters'),

  lastName: z.string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be at most 50 characters'),

  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),

  phone: z.string()
    .min(10, 'Phone number must be at least 10 characters')
    .max(15, 'Phone number must be at most 15 characters'),

  age: z.number()
    .min(18, 'Age must be at least 18')
    .max(100, 'Age must be at most 100'),

  gender: z.enum(['male', 'female', 'other']),

  birthDate: z.string().min(1, 'Birth date is required'),

  bloodGroup: z.string().min(1, 'Blood group is required'),

  height: z.number()
    .min(50, 'Height must be at least 50 cm')
    .max(300, 'Height must be at most 300 cm'),

  weight: z.number()
    .min(10, 'Weight must be at least 10 kg')
    .max(500, 'Weight must be at most 500 kg'),

  eyeColor: z.string().min(1, 'Eye color is required'),

  address: z.object({
    address: z.string().min(5, 'Address must be at least 5 characters'),
    city: z.string().min(2, 'City must be at least 2 characters'),
    state: z.string().min(2, 'State must be at least 2 characters'),
    postalCode: z.string().min(4, 'Postal code must be at least 4 characters'),
  }),

  company: z.object({
    name: z.string().min(2, 'Company name must be at least 2 characters'),
    department: z.string().min(2, 'Department must be at least 2 characters'),
    title: z.string().min(2, 'Job title must be at least 2 characters'),
  }),

  university: z.string().min(2, 'University must be at least 2 characters'),

  role: z.enum(['admin', 'moderator', 'user']),
});

export type EmployeeFormData = z.infer<typeof employeeSchema>;