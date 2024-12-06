export interface Location {
  lat: number;
  lng: number;
  address: string;
}

export interface Route {
  id: string;
  points: google.maps.LatLng[];
  distance: string;
  duration: string;
  type: 'main' | 'alternative1' | 'alternative2';
  ecoFriendly: boolean;
  trafficLevel: 'low' | 'medium' | 'high';
}

export interface TransportIncident {
  id: string;
  type: 'accident' | 'construction' | 'congestion';
  location: {
    lat: number;
    lng: number;
  };
  description: string;
  timestamp: Date;
  severity: 'low' | 'medium' | 'high';
}

export interface MapState {
  origin: Location | null;
  destination: Location | null;
  routes: Route[];
  incidents: TransportIncident[];
  selectedIncidentType: string | null;
  addIncident: (incident: TransportIncident) => void;
  removeIncident: (id: string) => void;
  setOrigin: (location: Location | null) => void;
  setDestination: (location: Location | null) => void;
  setRoutes: (routes: Route[]) => void;
  setSelectedIncidentType: (type: string | null) => void;
}

// nuevos

export type User = {
  id: string;
  fullName: string;
  email: string;
  department: string;
};

export type Incident = {
  id: string;
  type: 'accident' | 'roadwork' | 'closure';
  location: {
    lat: number;
    lng: number;
  };
  department: string;
  city: string;
  severity: 'high' | 'medium' | 'low';
  timestamp: string;
  description: string;
  status: 'active' | 'resolved';
  estimatedResolutionTime: string;
};