import { create } from 'zustand';
import type { Incident } from '../types';

interface IncidentsState {
  incidents: Incident[];
  selectedIncident: Incident | null;
  filters: {
    department: string | null;
    severity: string | null;
    type: string | null;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
  setIncidents: (incidents: Incident[]) => void;
  setSelectedIncident: (incident: Incident | null) => void;
  setFilters: (filters: Partial<IncidentsState['filters']>) => void;
}

export const useIncidentsStore = create<IncidentsState>((set) => ({
  incidents: [],
  selectedIncident: null,
  filters: {
    department: null,
    severity: null,
    type: null,
    dateRange: {
      start: null,
      end: null,
    },
  },
  setIncidents: (incidents) => set({ incidents }),
  setSelectedIncident: (incident) => set({ selectedIncident: incident }),
  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),
}));