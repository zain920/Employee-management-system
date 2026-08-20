export const API_BASE_URL = 'https://dummyjson.com';

export const employeeRoutes = {
  list: `${API_BASE_URL}/users`,
  byId: (id: string) => `${API_BASE_URL}/users/${id}`,
  search: `${API_BASE_URL}/users/search`,
  filter: `${API_BASE_URL}/users/filter`,
  add: `${API_BASE_URL}/users/add`,
  update: (id: string) => `${API_BASE_URL}/users/${id}`,
  delete: (id: string) => `${API_BASE_URL}/users/${id}`,
};

export const appRoutes = {
  login: '/login',
  dashboard: '/',
  employees: '/employees',
  employeeDetails: '/employees/:id',
  createEmployee: '/employees/create',
  editEmployee: '/employees/edit/:id',
};