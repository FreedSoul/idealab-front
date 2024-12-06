import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';
import { useMapStore } from '../../store/mapStore';
import { Location } from '../../types';

interface LocationSearchProps {
  type: 'origin' | 'destination';
  placeholder: string;
}

export const LocationSearch: React.FC<LocationSearchProps> = ({ type, placeholder }) => {
  const { setOrigin, setDestination } = useMapStore();
  const [error, setError] = useState<string>('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (value: string) => {
    if (!value) {
      setError('');
      return;
    }

    setIsSearching(true);
    setError('');

    try {
      // Add Colombia bias to improve results
      const geocoder = new google.maps.Geocoder();
      const result = await geocoder.geocode({
        address: value,
        componentRestrictions: {
          country: 'CO'
        },
        region: 'CO'
      });

      if (result.results && result.results.length > 0) {
        const location: Location = {
          lat: result.results[0].geometry.location.lat(),
          lng: result.results[0].geometry.location.lng(),
          address: result.results[0].formatted_address,
        };
        
        if (type === 'origin') {
          setOrigin(location);
        } else {
          setDestination(location);
        }
        setError('');
      } else {
        setError('No se encontró la ubicación. Por favor, intente ser más específico.');
      }
    } catch (error) {
      setError('Error al buscar la ubicación. Por favor, intente de nuevo.');
      console.error('Geocoding error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className={`h-5 w-5 ${isSearching ? 'text-blue-500' : 'text-gray-400'}`} />
        </div>
        <input
          type="text"
          className={`block w-full pl-10 pr-3 py-2 border ${
            error ? 'border-red-300' : 'border-gray-300'
          } rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
          placeholder={placeholder}
          onChange={(e) => handleSearch(e.target.value)}
          // disabled={isSearching}
        />
      </div>
      
      {error && (
        <div className="flex items-center gap-1 text-sm text-red-600">
          <AlertCircle className="h-4 w-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};