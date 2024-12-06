import { Incident } from '../types';
import { COLOMBIA_DEPARTMENTS } from './constants';

// Helper function to generate random coordinates within Colombia
function getRandomCoordinates() {
  return {
    lat: 4.570868 + (Math.random() - 0.5) * 8, // Colombia's approximate latitude range
    lng: -74.297333 + (Math.random() - 0.5) * 8, // Colombia's approximate longitude range
  };
}

// Helper function to get random city for each department
const CITIES: Record<string, string[]> = {
  'Antioquia': ['Medellín', 'Bello', 'Envigado', 'Itagüí'],
  'Bogotá': ['Bogotá', 'Suba', 'Usaquén', 'Kennedy'],
  'Valle del Cauca': ['Cali', 'Palmira', 'Buenaventura', 'Yumbo'],
  'Atlántico': ['Barranquilla', 'Soledad', 'Malambo', 'Galapa'],
  'Santander': ['Bucaramanga', 'Floridablanca', 'Girón', 'Piedecuesta'],
};

const INCIDENT_TYPES: Incident['type'][] = ['accident', 'roadwork', 'closure'];
const SEVERITY_LEVELS: Incident['severity'][] = ['high', 'medium', 'low'];

const DESCRIPTIONS = {
  accident: [
    'Multiple vehicle collision causing traffic delays',
    'Single vehicle accident blocking right lane',
    'Motorcycle accident with injuries',
    'Vehicle overturned on highway',
  ],
  roadwork: [
    'Road maintenance and resurfacing',
    'Bridge repair work in progress',
    'Emergency utility repairs',
    'Lane expansion project',
  ],
  closure: [
    'Full road closure due to flooding',
    'Temporary closure for public event',
    'Emergency road closure due to landslide',
    'Planned closure for infrastructure improvements',
  ],
};

function generateMockIncident(id: number): Incident {
  const department = COLOMBIA_DEPARTMENTS[Math.floor(Math.random() * COLOMBIA_DEPARTMENTS.length)];
  const type = INCIDENT_TYPES[Math.floor(Math.random() * INCIDENT_TYPES.length)];
  const severity = SEVERITY_LEVELS[Math.floor(Math.random() * SEVERITY_LEVELS.length)];
  const cities = CITIES[department] || ['Unknown City'];
  const city = cities[Math.floor(Math.random() * cities.length)];
  
  // Generate a random timestamp within the last 24 hours
  const now = new Date();
  const timestamp = new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000).toISOString();
  
  // Generate estimated resolution time between 1 and 6 hours from the incident time
  const resolutionTime = new Date(new Date(timestamp).getTime() + (1 + Math.random() * 5) * 60 * 60 * 1000).toISOString();

  return {
    id: `INC-${id.toString().padStart(5, '0')}`,
    type,
    location: getRandomCoordinates(),
    department,
    city,
    severity,
    timestamp,
    description: DESCRIPTIONS[type][Math.floor(Math.random() * DESCRIPTIONS[type].length)],
    status: Math.random() > 0.3 ? 'active' : 'resolved',
    estimatedResolutionTime: resolutionTime,
  };
}

export const mockIncidents: Incident[] = Array.from({ length: 50 }, (_, i) => 
  generateMockIncident(i + 1)
);