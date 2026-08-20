import { apiRequest } from '../lib/apiRequest';
import { employeeRoutes } from '../constants/routes';
import type {
  Employee,
  EmployeeResponse,
  CreateEmployeeDto,
  UpdateEmployeeDto,
  EmployeeFilterParams,
} from '../types/employee.types';

export const employeeService = {
  getAll(params?: EmployeeFilterParams): Promise<EmployeeResponse> {
    const { limit = 10, skip = 0, sortBy, order } = params || {};
    let url = `${employeeRoutes.list}?limit=${limit}&skip=${skip}`;
    
    if (sortBy && order) {
      url += `&sortBy=${sortBy}&order=${order}`;
    }
    
    return apiRequest<EmployeeResponse>({ url, method: 'GET' });
  },

  search(query: string): Promise<EmployeeResponse> {
    return apiRequest<EmployeeResponse>({ 
      url: `${employeeRoutes.search}?q=${encodeURIComponent(query)}`, 
      method: 'GET' 
    });
  },

  getById(id: string): Promise<Employee> {
    return apiRequest<Employee>({ 
      url: employeeRoutes.byId(id), 
      method: 'GET' 
    });
  },

  create(employee: CreateEmployeeDto): Promise<Employee> {
    return apiRequest<Employee>({ 
      url: employeeRoutes.add, 
      method: 'POST', 
      data: employee 
    });
  },

  update(id: string, employee: UpdateEmployeeDto): Promise<Employee> {
    return apiRequest<Employee>({ 
      url: employeeRoutes.update(id), 
      method: 'PUT', 
      data: employee 
    });
  },

  delete(id: string): Promise<{ id: string; isDeleted: boolean; deletedOn: string }> {
    return apiRequest<{ id: string; isDeleted: boolean; deletedOn: string }>({ 
      url: employeeRoutes.delete(id), 
      method: 'DELETE' 
    });
  },
};