import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../schemas/employeeSchema';
import type { EmployeeFormData } from '../../schemas/employeeSchema';
import { useCreateEmployee } from '../../hooks/useEmployees';
import EmployeeForm from '../../components/employees/EmployeeForm';

const CreateEmployee: React.FC = () => {
  const navigate = useNavigate();
  const createEmployee = useCreateEmployee();

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      age: 25,
      gender: 'male',
      birthDate: '1990-01-01',
      bloodGroup: 'A+',
      height: 170,
      weight: 70,
      eyeColor: 'brown',
      address: {
        address: '',
        city: '',
        state: '',
        postalCode: '',
      },
      company: {
        name: '',
        department: '',
        title: '',
      },
      university: '',
      role: 'user',
    },
  });

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await createEmployee.mutateAsync(data);
      navigate('/employees');
    } catch (error) {
      console.error('Failed to create employee:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Create New Employee</h1>
      <EmployeeForm
        form={form}
        onSubmit={onSubmit}
        isLoading={createEmployee.isPending}
        submitLabel="Create Employee"
      />
    </div>
  );
};

export default CreateEmployee;
