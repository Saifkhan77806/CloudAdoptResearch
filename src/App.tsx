import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import DataTable from './components/DataTable';
import TableForm from './components/TableForm';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Employee Management System
            </h1>
            <p className="text-lg text-gray-600">
              Manage your employee data with advanced filtering, sorting, and export capabilities
            </p>
          </div>
          
          <TableForm />
          <DataTable />
        </div>
      </div>
    </Provider>
  );
}

export default App;