import React from 'react';
import Map from './components/Map';
import { LocationSearch } from './components/search/LocationSearch';
import { RouteList } from './components/routes/RouteList';
import { IncidentFilter } from './components/incidents/IncidentFilter';
import { SafetyStats } from './components/stats/SafetyStats';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-900">
            Sistema de Planificación de Viajes y Seguridad Vial
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-lg font-semibold mb-4">Planifica tu Ruta</h2>
              <div className="space-y-4">
                <LocationSearch
                  type="origin"
                  placeholder="Punto de partida"
                />
                <LocationSearch
                  type="destination"
                  placeholder="Punto de destino"
                />
              </div>
            </div>
            
            <SafetyStats />
            
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <IncidentFilter />
              <RouteList />
            </div>
          </div>
          
          <div className="lg:col-span-3">
            <div className="h-[calc(100vh-12rem)]">
              <Map />
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;