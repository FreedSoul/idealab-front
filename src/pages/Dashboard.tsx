import React, { useEffect, useState } from 'react';
import { Map } from '../components/Map';
import { IncidentFilters } from '../components/IncidentFilters';
import { ThemeToggle } from '../components/ThemeToggle';
import { mockIncidents } from '../lib/mockData';
import { useIncidentsStore } from '../store/incidents';

export function Dashboard() {
  const { setIncidents } = useIncidentsStore();
  const [showIncidentFilter,setShowIncidentFilter] = useState<boolean>(true);

  useEffect(() => {
    setIncidents(mockIncidents);
  }, [setIncidents]);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Traffic Incident Monitor
          </h1>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
          <button onClick={()=>setShowIncidentFilter(!showIncidentFilter)}>hola mundo</button>
      </header>
      <main className="flex-1 flex">
      <>{showIncidentFilter ? 
        <div className="w-80 p-4 bg-gray-50 dark:bg-gray-900 overflow-y-auto">
          <IncidentFilters /> 
          {/* <IncidentFilters /> */}
        </div>
        : ''}</>
        <div className="flex-1">
          <Map />
        </div>
      </main>
    </div>
  );
}