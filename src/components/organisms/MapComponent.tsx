"use client";

import { useEffect, useState } from 'react';
import { 
  MapContainer as LeafletMapContainer, 
  TileLayer as LeafletTileLayer, 
  CircleMarker as LeafletCircleMarker, 
  Popup as LeafletPopup 
} from 'react-leaflet';
import { useGetDonorLocationCountsQuery } from '@/store/api/donorsApi';
import { getDistrictCoordinates } from '@/constants/districtCoordinates';

type MapComponents = {
  MapContainer: typeof LeafletMapContainer;
  TileLayer: typeof LeafletTileLayer;
  CircleMarker: typeof LeafletCircleMarker;
  Popup: typeof LeafletPopup;
};

interface DonorLocation {
  district: string;
  displayName: string;
  lat: number;
  lng: number;
  donorCount: number;
}

export default function MapComponent() {
  const [mapComponents, setMapComponents] = useState<MapComponents | null>(null);
  const [isMapLoading, setIsMapLoading] = useState(true);
  
  // Fetch donor location counts from API
  const { 
    data: donorLocationData = [], 
    isLoading: isDataLoading, 
    isError: isDataError,
    error: dataError
  } = useGetDonorLocationCountsQuery();

  useEffect(() => {
    // Only import on client side
    if (typeof window !== 'undefined') {
      Promise.all([
        import('react-leaflet'),
        import('leaflet/dist/leaflet.css')
      ]).then(([reactLeaflet]) => {
        setMapComponents({
          MapContainer: reactLeaflet.MapContainer,
          TileLayer: reactLeaflet.TileLayer,
          CircleMarker: reactLeaflet.CircleMarker,
          Popup: reactLeaflet.Popup
        });
        setIsMapLoading(false);
      }).catch((error) => {
        console.error('Failed to load map components:', error);
        setIsMapLoading(false);
      });
    }
  }, []);

  // Transform API data to include coordinates
  const donorLocations: DonorLocation[] = donorLocationData
    .map((item) => {
      const coords = getDistrictCoordinates(item.district);
      if (!coords) {
        console.warn(`No coordinates found for district: ${item.district}`);
        return null;
      }
      return {
        district: item.district,
        displayName: coords.displayName,
        lat: coords.lat,
        lng: coords.lng,
        donorCount: item.donorCount,
      };
    })
    .filter((item): item is DonorLocation => item !== null);

  // Show loading state during SSR and while loading components or data
  if (typeof window === 'undefined' || isMapLoading || !mapComponents) {
    return (
      <div className="h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading map...</p>
        </div>
      </div>
    );
  }

  // Show loading state while fetching data
  if (isDataLoading) {
    return (
      <div className="h-96 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
        <div className="text-gray-500 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Loading donor data...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (isDataError) {
    return (
      <div className="h-96 rounded-xl overflow-hidden bg-red-50 border border-red-200 flex items-center justify-center">
        <div className="text-red-600 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-semibold">Failed to load donor location data</p>
          <p className="text-sm mt-1">
            {dataError && 'status' in dataError 
              ? `Error ${dataError.status}: Unable to fetch data from server`
              : 'Please check your connection and try again'}
          </p>
        </div>
      </div>
    );
  }

  // Show empty state if no data
  if (donorLocations.length === 0) {
    return (
      <div className="h-96 rounded-xl overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center">
        <div className="text-gray-500 text-center p-4">
          <svg className="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          <p className="font-semibold">No donor location data available</p>
          <p className="text-sm mt-1">Donor locations will appear here when data is available</p>
        </div>
      </div>
    );
  }

  const { MapContainer, TileLayer, CircleMarker, Popup } = mapComponents;

  return (
    <div className="h-96 rounded-xl overflow-hidden shadow-sm border border-gray-200">
      <MapContainer
        center={[7.8731, 80.7718] as [number, number]}
        zoom={7}
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {donorLocations.map((location) => (
          <CircleMarker
            key={location.district}
            center={[location.lat, location.lng] as [number, number]}
            radius={Math.max(location.donorCount * 3, 8)}
            fillColor="#ef4444"
            color="#dc2626"
            weight={2}
            opacity={0.8}
            fillOpacity={0.6}
          >
            <Popup>
              <div className="text-center p-2">
                <h3 className="font-semibold text-gray-900">{location.displayName}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  <span className="font-medium text-red-600">{location.donorCount}</span> {location.donorCount === 1 ? 'donor' : 'donors'}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}
