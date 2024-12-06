import React from 'react';
import { useIncidentsStore } from '../store/incidents';
import { COLOMBIA_DEPARTMENTS } from '../lib/constants';

export function IncidentFilters() {
  const { filters, setFilters } = useIncidentsStore();

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.department || ''}
            onChange={(e) => setFilters({ department: e.target.value || null })}
          >
            <option value="">All Departments</option>
            {COLOMBIA_DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Severity</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.severity || ''}
            onChange={(e) => setFilters({ severity: e.target.value || null })}
          >
            <option value="">All Severities</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            className="w-full p-2 border rounded-md"
            value={filters.type || ''}
            onChange={(e) => setFilters({ type: e.target.value || null })}
          >
            <option value="">All Types</option>
            <option value="accident">Accident</option>
            <option value="roadwork">Roadwork</option>
            <option value="closure">Closure</option>
          </select>
        </div>
      </div>
    </div>
  );
}