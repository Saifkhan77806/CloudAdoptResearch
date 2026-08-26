import * as XLSX from 'xlsx';
import { Employee } from '../types';

export const exportToExcel = (data: Employee[], filename: string = 'employees.xlsx') => {
  // Create a new workbook
  const workbook = XLSX.utils.book_new();
  
  // Convert data to worksheet format
  const worksheet = XLSX.utils.json_to_sheet(data.map(employee => ({
    'ID': employee.id,
    'Name': employee.name,
    'Email': employee.email,
    'Department': employee.department,
    'Position': employee.position,
    'Salary': employee.salary,
    'Start Date': employee.startDate,
    'Status': employee.status
  })));

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Employees');

  // Write the file
  XLSX.writeFile(workbook, filename);
};