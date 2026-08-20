import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { employeeSchema } from '../../schemas/employeeSchema';
import type { EmployeeFormData } from '../../schemas/employeeSchema';
import { useEmployee, useUpdateEmployee } from '../../hooks/useEmployees';
import EmployeeForm from '../../components/employees/EmployeeForm';

const EditEmployee: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: employee, isLoading: isLoadingEmployee } = useEmployee(id!);
  const updateEmployee = useUpdateEmployee();

  const form = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  React.useEffect(() => {
    if (employee) {
      form.reset({
        firstName: employee.firstName,
        lastName: employee.lastName,
        email: employee.email,
        phone: employee.phone,
        age: employee.age,
        gender: employee.gender,
        birthDate: employee.birthDate,
        bloodGroup: employee.bloodGroup,
        height: employee.height,
        weight: employee.weight,
        eyeColor: employee.eyeColor,
        address: {
          address: employee.address.address,
          city: employee.address.city,
          state: employee.address.state,
          postalCode: employee.address.postalCode,
        },
        company: {
          name: employee.company.name,
          department: employee.company.department,
          title: employee.company.title,
        },
        university: employee.university,
        role: employee.role,
      });
    }
  }, [employee, form]);

  const onSubmit = async (data: EmployeeFormData) => {
    try {
      await updateEmployee.mutateAsync({ id: id!, data });
      navigate(`/employees/${id}`);
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };

  if (isLoadingEmployee) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Edit Employee</h1>
      <EmployeeForm
        form={form}
        onSubmit={onSubmit}
        isLoading={updateEmployee.isPending}
        submitLabel="Update Employee"
      />
    </div>
  );
};

export default EditEmployee;
