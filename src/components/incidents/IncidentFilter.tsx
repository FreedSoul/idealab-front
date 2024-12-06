import React from 'react';
import { useMapStore } from '../../store/mapStore';

export const IncidentFilter: React.FC = () => {
  const { setSelectedIncidentType } = useMapStore();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Filtrar por tipo de incidente
      </label>
      <select
        onChange={(e) => setSelectedIncidentType(e.target.value || null)}
        className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Todos los incidentes</option>
        <option value="accident">Accidentes</option>
        <option value="construction">Obras en vía</option>
        <option value="congestion">Congestión</option>
      </select>
    </div>
  );
};