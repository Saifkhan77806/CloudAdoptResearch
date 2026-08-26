import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Employee, TableState } from '../types';

// Dummy data
const initialData: Employee[] = [
  { id: 1, name: 'John Smith', email: 'john.smith@company.com', department: 'Engineering', position: 'Senior Developer', salary: 95000, startDate: '2021-03-15', status: 'Active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.johnson@company.com', department: 'Marketing', position: 'Marketing Manager', salary: 78000, startDate: '2020-11-22', status: 'Active' },
  { id: 3, name: 'Michael Brown', email: 'michael.brown@company.com', department: 'Sales', position: 'Sales Representative', salary: 65000, startDate: '2022-01-08', status: 'Active' },
  { id: 4, name: 'Emily Davis', email: 'emily.davis@company.com', department: 'HR', position: 'HR Specialist', salary: 58000, startDate: '2021-07-12', status: 'Active' },
  { id: 5, name: 'David Wilson', email: 'david.wilson@company.com', department: 'Engineering', position: 'Frontend Developer', salary: 82000, startDate: '2021-09-03', status: 'Active' },
  { id: 6, name: 'Lisa Anderson', email: 'lisa.anderson@company.com', department: 'Finance', position: 'Financial Analyst', salary: 72000, startDate: '2020-05-18', status: 'Active' },
  { id: 7, name: 'James Taylor', email: 'james.taylor@company.com', department: 'Operations', position: 'Operations Manager', salary: 89000, startDate: '2019-12-10', status: 'Active' },
  { id: 8, name: 'Jennifer Martinez', email: 'jennifer.martinez@company.com', department: 'Design', position: 'UX Designer', salary: 75000, startDate: '2022-02-28', status: 'Active' },
  { id: 9, name: 'Robert Garcia', email: 'robert.garcia@company.com', department: 'Engineering', position: 'Backend Developer', salary: 88000, startDate: '2021-06-14', status: 'Inactive' },
  { id: 10, name: 'Michelle Lee', email: 'michelle.lee@company.com', department: 'Marketing', position: 'Content Specialist', salary: 55000, startDate: '2022-04-05', status: 'Active' },
  { id: 11, name: 'Kevin Rodriguez', email: 'kevin.rodriguez@company.com', department: 'Sales', position: 'Sales Manager', salary: 92000, startDate: '2020-08-17', status: 'Active' },
  { id: 12, name: 'Amanda White', email: 'amanda.white@company.com', department: 'HR', position: 'HR Manager', salary: 85000, startDate: '2019-10-25', status: 'Active' },
  { id: 13, name: 'Daniel Thompson', email: 'daniel.thompson@company.com', department: 'Finance', position: 'Senior Accountant', salary: 68000, startDate: '2021-11-08', status: 'Active' },
  { id: 14, name: 'Jessica Clark', email: 'jessica.clark@company.com', department: 'Operations', position: 'Project Coordinator', salary: 62000, startDate: '2022-01-20', status: 'Active' },
  { id: 15, name: 'Christopher Lewis', email: 'christopher.lewis@company.com', department: 'Design', position: 'Graphic Designer', salary: 58000, startDate: '2021-08-30', status: 'Active' },
  { id: 16, name: 'Ashley Walker', email: 'ashley.walker@company.com', department: 'Engineering', position: 'DevOps Engineer', salary: 98000, startDate: '2020-03-12', status: 'Active' },
  { id: 17, name: 'Ryan Hall', email: 'ryan.hall@company.com', department: 'Marketing', position: 'Digital Marketing Specialist', salary: 64000, startDate: '2022-05-15', status: 'Active' },
  { id: 18, name: 'Stephanie Allen', email: 'stephanie.allen@company.com', department: 'Sales', position: 'Account Executive', salary: 71000, startDate: '2021-12-03', status: 'Inactive' },
  { id: 19, name: 'Matthew Young', email: 'matthew.young@company.com', department: 'Finance', position: 'Finance Manager', salary: 95000, startDate: '2019-07-22', status: 'Active' },
  { id: 20, name: 'Laura King', email: 'laura.king@company.com', department: 'Operations', position: 'Business Analyst', salary: 76000, startDate: '2021-04-18', status: 'Active' },
  { id: 21, name: 'Andrew Wright', email: 'andrew.wright@company.com', department: 'Engineering', position: 'Full Stack Developer', salary: 92000, startDate: '2020-09-07', status: 'Active' },
  { id: 22, name: 'Nicole Green', email: 'nicole.green@company.com', department: 'Design', position: 'UI Designer', salary: 69000, startDate: '2022-03-11', status: 'Active' },
  { id: 23, name: 'Joshua Baker', email: 'joshua.baker@company.com', department: 'HR', position: 'Recruiter', salary: 52000, startDate: '2021-10-14', status: 'Active' },
  { id: 24, name: 'Megan Adams', email: 'megan.adams@company.com', department: 'Marketing', position: 'Brand Manager', salary: 81000, startDate: '2020-12-05', status: 'Active' },
  { id: 25, name: 'Tyler Nelson', email: 'tyler.nelson@company.com', department: 'Sales', position: 'Regional Sales Director', salary: 110000, startDate: '2019-02-28', status: 'Active' }
];

const initialState: TableState = {
  data: initialData,
  filteredData: initialData,
  currentPage: 1,
  totalPages: Math.ceil(initialData.length / 10),
  searchTerm: '',
  sortField: null,
  sortDirection: 'asc',
  itemsPerPage: 10,
};

const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Omit<Employee, 'id'>>) => {
      const newId = Math.max(...state.data.map(emp => emp.id)) + 1;
      const newEmployee = { ...action.payload, id: newId };
      state.data.push(newEmployee);
      tableSlice.caseReducers.applyFiltersAndSort(state);
    },
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      state.currentPage = 1;
      tableSlice.caseReducers.applyFiltersAndSort(state);
    },
    setSort: (state, action: PayloadAction<{ field: keyof Employee; direction: 'asc' | 'desc' }>) => {
      state.sortField = action.payload.field;
      state.sortDirection = action.payload.direction;
      tableSlice.caseReducers.applyFiltersAndSort(state);
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    applyFiltersAndSort: (state) => {
      let filtered = [...state.data];

      // Apply search filter
      if (state.searchTerm) {
        const searchLower = state.searchTerm.toLowerCase();
        filtered = filtered.filter(employee =>
          Object.values(employee).some(value =>
            value.toString().toLowerCase().includes(searchLower)
          )
        );
      }

      // Apply sorting
      if (state.sortField) {
        filtered.sort((a, b) => {
          const aValue = a[state.sortField!];
          const bValue = b[state.sortField!];
          
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            const comparison = aValue.localeCompare(bValue);
            return state.sortDirection === 'asc' ? comparison : -comparison;
          }
          
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            const comparison = aValue - bValue;
            return state.sortDirection === 'asc' ? comparison : -comparison;
          }
          
          return 0;
        });
      }

      state.filteredData = filtered;
      state.totalPages = Math.ceil(filtered.length / state.itemsPerPage);
      
      // Adjust current page if necessary
      if (state.currentPage > state.totalPages && state.totalPages > 0) {
        state.currentPage = state.totalPages;
      } else if (state.totalPages === 0) {
        state.currentPage = 1;
      }
    },
  },
});

export const { addEmployee, setSearchTerm, setSort, setCurrentPage } = tableSlice.actions;
export default tableSlice.reducer;