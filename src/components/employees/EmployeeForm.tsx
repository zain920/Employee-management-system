import React from 'react';
import type { Path, UseFormReturn } from 'react-hook-form';
import type { EmployeeFormData } from '../../schemas/employeeSchema';

interface EmployeeFormProps {
  form: UseFormReturn<EmployeeFormData>;
  onSubmit: (data: EmployeeFormData) => void;
  isLoading: boolean;
  submitLabel: string;
}

type FieldConfig = {
  name: Path<EmployeeFormData>;
  label: string;
  type?: string;
  valueAsNumber?: boolean;
  wide?: boolean;
};

const sections: { title: string; fields: FieldConfig[] }[] = [
  {
    title: 'Personal Information',
    fields: [
      { name: 'firstName', label: 'First Name' },
      { name: 'lastName', label: 'Last Name' },
      { name: 'email', label: 'Email', type: 'email' },
      { name: 'phone', label: 'Phone' },
      { name: 'age', label: 'Age', type: 'number', valueAsNumber: true },
      { name: 'gender', label: 'Gender' },
      { name: 'birthDate', label: 'Birth Date', type: 'date' },
      { name: 'bloodGroup', label: 'Blood Group' },
      { name: 'height', label: 'Height (cm)', type: 'number', valueAsNumber: true },
      { name: 'weight', label: 'Weight (kg)', type: 'number', valueAsNumber: true },
      { name: 'eyeColor', label: 'Eye Color' },
    ],
  },
  {
    title: 'Address',
    fields: [
      { name: 'address.address', label: 'Street Address', wide: true },
      { name: 'address.city', label: 'City' },
      { name: 'address.state', label: 'State' },
      { name: 'address.postalCode', label: 'Postal Code' },
    ],
  },
  {
    title: 'Employment Information',
    fields: [
      { name: 'company.name', label: 'Company' },
      { name: 'company.department', label: 'Department' },
      { name: 'company.title', label: 'Job Title' },
      { name: 'university', label: 'University' },
      { name: 'role', label: 'Role' },
    ],
  },
];

const selectOptions: Record<string, { value: string; label: string }[]> = {
  gender: [
    { value: 'male', label: 'Male' },
    { value: 'female', label: 'Female' },
    { value: 'other', label: 'Other' },
  ],
  role: [
    { value: 'user', label: 'User' },
    { value: 'moderator', label: 'Moderator' },
    { value: 'admin', label: 'Admin' },
  ],
};

const getError = (errors: Record<string, unknown>, name: string): string | undefined => {
  const error = name.split('.').reduce<Record<string, unknown> | undefined>(
    (current, key) => current?.[key] as Record<string, unknown> | undefined,
    errors,
  );

  return typeof error?.message === 'string' ? error.message : undefined;
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  form,
  onSubmit,
  isLoading,
  submitLabel,
}) => {
  const { register, handleSubmit, formState: { errors } } = form;
  const inputClass = 'mt-1 block w-full rounded border border-gray-300 px-3 py-2 text-sm';

  const renderField = ({ name, label, type, valueAsNumber, wide }: FieldConfig) => {
    const options = selectOptions[name];
    const error = getError(errors as Record<string, unknown>, name);
    const registration = register(name, valueAsNumber ? { valueAsNumber: true } : undefined);

    return (
      <div className={wide ? 'sm:col-span-2' : undefined} key={name}>
        <label className="block text-sm font-medium text-gray-700">{label} *</label>
        {options ? (
          <select {...registration} className={inputClass}>
            {options.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : (
          <input {...registration} type={type} className={inputClass} />
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="rounded bg-white p-4 shadow sm:p-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {sections.map((section) => (
            <React.Fragment key={section.title}>
              <h3 className="sm:col-span-2 text-lg font-medium text-gray-900">{section.title}</h3>
              {section.fields.map(renderField)}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <button type="button" onClick={() => window.history.back()} className="rounded border px-4 py-2 text-sm">
          Cancel
        </button>
        <button type="submit" disabled={isLoading} className="rounded bg-blue-600 px-4 py-2 text-sm text-white disabled:opacity-50">
          {isLoading ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
