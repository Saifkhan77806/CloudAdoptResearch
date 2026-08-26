export interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  position: string;
  salary: number;
  startDate: string;
  status: 'Active' | 'Inactive';
}

export interface TableState {
  data: Employee[];
  filteredData: Employee[];
  currentPage: number;
  totalPages: number;
  searchTerm: string;
  sortField: keyof Employee | null;
  sortDirection: 'asc' | 'desc';
  itemsPerPage: number;
}

export interface FormData {
  name: string;
  email: string;
  department: string;
  position: string;
  salary: string;
  startDate: string;
  status: 'Active' | 'Inactive';
}