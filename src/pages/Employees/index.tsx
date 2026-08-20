import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useEmployees, useDeleteEmployee, useSearchEmployees } from '../../hooks/useEmployees';

const Employees: React.FC = () => {
  const [page, setPage] = useState(0);
  const [limit] = useState(10);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'firstName' | 'lastName' | 'email' | 'age'>('firstName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const { data, isLoading, isError, error } = useEmployees({ limit, skip: page * limit, sortBy, order: sortOrder });
  const { data: searchData, isLoading: isSearchLoading } = useSearchEmployees(searchQuery);
  const deleteEmployee = useDeleteEmployee();
  const employees = searchQuery ? searchData?.users : data?.users;
  const total = searchQuery ? searchData?.total : data?.total;
  const loading = searchQuery ? isSearchLoading : isLoading;

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this employee?')) deleteEmployee.mutate(id);
  };

  if (loading) return <p>Loading employees...</p>;
  if (isError) return <div><p>Failed to load employees. Please try again.</p><p>{error?.message}</p></div>;
  if (!employees?.length) return <div><h3>No employees</h3><p>{searchQuery ? 'No employees match your search.' : 'Get started by creating a new employee.'}</p><Link to="/employees/create">Add Employee</Link></div>;

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div><h1 className="text-2xl font-semibold text-gray-900">Employees</h1><p>A list of all employees including their name, email, and role.</p></div>
        <Link to="/employees/create" className="text-white bg-blue-600 px-4 py-2 rounded-md">Add Employee</Link>
      </div>
      <div className="mt-6 flex flex-col sm:flex-row gap-4">
        <input type="text" placeholder="Search employees..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="w-full px-4 py-2 border border-gray-300 rounded-md" />
        <div className="flex gap-2"><select value={sortBy} onChange={(event) => setSortBy(event.target.value as typeof sortBy)} className="px-4 py-2 border border-gray-300 rounded-md"><option value="firstName">First Name</option><option value="lastName">Last Name</option><option value="email">Email</option><option value="age">Age</option></select><button onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')} className="px-4 py-2 border border-gray-300 rounded-md">{sortOrder === 'asc' ? '↑' : '↓'}</button></div>
      </div>
      <div className="mt-8 overflow-x-auto"><table className="min-w-full"><thead><tr><th>Employee</th><th>Email</th><th>Role</th><th>Department</th><th>Actions</th></tr></thead><tbody>
        {employees.map((employee) => <tr key={employee.id}><td><img className="h-10 w-10 rounded-full inline-block" src={employee.image} alt={employee.firstName} /> {employee.firstName} {employee.lastName}</td><td>{employee.email}</td><td>{employee.role}</td><td>{employee.company?.department || 'N/A'}</td><td><Link to={`/employees/${employee.id}`} className="text-blue-600 mr-4">View</Link><Link to={`/employees/edit/${employee.id}`} className="text-indigo-600 mr-4">Edit</Link><button onClick={() => handleDelete(String(employee.id))} className="text-red-600" disabled={deleteEmployee.isPending}>{deleteEmployee.isPending && deleteEmployee.variables === String(employee.id) ? 'Deleting...' : 'Delete'}</button></td></tr>)}
      </tbody></table></div>
      <div className="mt-6 flex items-center justify-between"><span>Showing {page * limit + 1} to {Math.min((page + 1) * limit, total || 0)} of {total} results</span><div className="flex gap-2"><button onClick={() => setPage(page - 1)} disabled={page === 0}>Previous</button><button onClick={() => setPage(page + 1)} disabled={!total || (page + 1) * limit >= total}>Next</button></div></div>
    </div>
  );
};

export default Employees;
