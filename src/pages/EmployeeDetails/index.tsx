import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEmployee, useDeleteEmployee } from '../../hooks/useEmployees';

const EmployeeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: employee, isLoading, isError, error } = useEmployee(id!);
  const deleteEmployee = useDeleteEmployee();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      await deleteEmployee.mutateAsync(id!);
      navigate('/employees');
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading employee details...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Failed to load employee details. Please try again.
            </p>
            <p className="text-xs text-red-500 mt-1">{error?.message}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Employee not found</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Employee Details</h1>
        <div className="flex gap-2">
          <Link
            to={`/employees/edit/${employee.id}`}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleteEmployee.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 disabled:opacity-50"
          >
            {deleteEmployee.isPending ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex items-center">
          <img
            className="h-20 w-20 rounded-full object-cover"
            src={employee.image}
            alt={employee.firstName}
          />
          <div className="ml-4">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {employee.firstName} {employee.lastName}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              {employee.role} • {employee.company?.department || 'No department'}
            </p>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.email}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.phone}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Age</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.age}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Gender</dt>
              <dd className="mt-1 text-sm text-gray-900 capitalize">{employee.gender}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Birth Date</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.birthDate}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Blood Group</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.bloodGroup}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Height</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.height} cm</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Weight</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.weight} kg</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">Eye Color</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.eyeColor}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500">University</dt>
              <dd className="mt-1 text-sm text-gray-900">{employee.university}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Address</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {employee.address.address}, {employee.address.city}, {employee.address.state} {employee.address.postalCode}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Company</dt>
              <dd className="mt-1 text-sm text-gray-900">
                {employee.company.name} • {employee.company.title}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
