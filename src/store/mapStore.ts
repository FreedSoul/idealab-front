import { create } from 'zustand';
import { MapState } from '../types';
import { sampleIncidents, sampleRoutes } from '../utils/sampleData';

export const useMapStore = create<MapState>((set) => ({
  origin: null,
  destination: null,
  routes: sampleRoutes,
  incidents: sampleIncidents,
  selectedIncidentType: null,
  addIncident: (incident) =>
    set((state) => ({
      incidents: [...state.incidents, incident],
    })),
  removeIncident: (id) =>
    set((state) => ({
      incidents: state.incidents.filter((incident) => incident.id !== id),
    })),
  setOrigin: (location) => set({ origin: location }),
  setDestination: (location) => set({ destination: location }),
  setRoutes: (routes) => set({ routes }),
  setSelectedIncidentType: (type) => set({ selectedIncidentType: type }),
}));