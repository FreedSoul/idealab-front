import React, { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { useMapStore } from '../store/mapStore';
import { getMarkerIconUrl } from '../utils/mapUtils';

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const { incidents, origin, destination, routes } = useMapStore();

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyBMtgyQ2jSK8B0ymMpVhoshgl6kT7-7Isk',
      version: 'weekly',
      libraries: ['places', 'routes'],
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 4.710989, lng: -74.072092 }, // Bogotá
          zoom: 6,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        });

        mapInstanceRef.current = map;
        directionsRendererRef.current = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true,
        });

        // Add markers for incidents
        incidents.forEach((incident) => {
          new google.maps.Marker({
            position: incident.location,
            map,
            title: incident.description,
            icon: {
              url: getMarkerIconUrl(incident.type),
              scaledSize: new google.maps.Size(30, 30),
            },
          });
        });
      }
    });
  }, []);

  useEffect(() => {
    if (origin && destination && mapInstanceRef.current) {
      const directionsService = new google.maps.DirectionsService();
      
      directionsService.route(
        {
          origin: origin.address,
          destination: destination.address,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: true,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            directionsRendererRef.current?.setDirections(result);
          }
        }
      );
    }
  }, [origin, destination]);

  return <div ref={mapRef} className="w-full h-full rounded-lg shadow-lg" />;
};

export default Map;