'use client';

import { useState, useEffect } from 'react';
import { MapPin, Save, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

interface LocationCheckerProps {
  targetLat: number;
  targetLng: number;
}

interface SavedLocation {
  lat: number;
  lng: number;
  accuracy: number;
  timestamp: number;
}

interface CurrentLocation {
  lat: number;
  lng: number;
  accuracy: number;
  speed: number | null;
  heading: number | null;
}

export function LocationChecker({ targetLat, targetLng }: LocationCheckerProps) {
  const [currentLocation, setCurrentLocation] = useState<CurrentLocation | null>(null);
  const [savedLocations, setSavedLocations] = useState<SavedLocation[]>([]);
  const [distance, setDistance] = useState<number | null>(null);
  const [status, setStatus] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [accuracyWarning, setAccuracyWarning] = useState<string>('');

  function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
    // Using Haversine formula for more accurate distance calculation
    const R = 6371e3; // Earth's radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  }

  const saveCurrentLocation = () => {
    if (currentLocation) {
      const newLocation: SavedLocation = {
        lat: currentLocation.lat,
        lng: currentLocation.lng,
        accuracy: currentLocation.accuracy,
        timestamp: Date.now(),
      };
      setSavedLocations(prev => [...prev, newLocation]);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const currentLat = position.coords.latitude;
        const currentLng = position.coords.longitude;
        const accuracy = position.coords.accuracy;
        const speed = position.coords.speed;
        const heading = position.coords.heading;
        
        // Update accuracy warning based on precision
        if (accuracy > 30) {
          setAccuracyWarning('Low location accuracy. Try moving to an open area or check GPS settings.');
        } else if (accuracy > 15) {
          setAccuracyWarning('Moderate location accuracy.');
        } else {
          setAccuracyWarning('');
        }
        
        setCurrentLocation({
          lat: currentLat,
          lng: currentLng,
          accuracy,
          speed,
          heading
        });
        
        const calculatedDistance = calculateDistance(
          currentLat,
          currentLng,
          targetLat,
          targetLng
        );
        
        // Consider accuracy in distance calculation
        const adjustedDistance = Math.max(0, calculatedDistance - accuracy);
        setDistance(adjustedDistance);
        
        // Check if within 50 meters, considering accuracy
        if (calculatedDistance <= 50 + accuracy) {
          setStatus('likely inside');
        } else if (calculatedDistance <= 50) {
          setStatus('inside');
        } else {
          setStatus('outside');
        }
      },
      (error) => {
        setError('Error getting location: ' + error.message);
      },
      {
        enableHighAccuracy: true,
        timeout: 30000, // Increased timeout for better accuracy
        maximumAge: 0 // Always get fresh position
      }
    );

    return () => {
      navigator.geolocation.clearWatch(watchId);
    };
  }, [targetLat, targetLng]);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-6">
      <div className="flex items-center space-x-4">
        <MapPin className="h-6 w-6 text-blue-500" />
        <div>
          <h2 className="text-xl font-medium text-black">Location Checker</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              {currentLocation && (
                <div className="space-y-2">
                  <p className="text-gray-500">
                    Current accuracy: ±{Math.round(currentLocation.accuracy)}m
                  </p>
                  {currentLocation.speed !== null && (
                    <p className="text-gray-500">
                      Speed: {Math.round(currentLocation.speed * 3.6)}km/h
                    </p>
                  )}
                  {distance !== null && (
                    <p className="text-gray-500">
                      Distance: {Math.round(distance)}m ±{Math.round(currentLocation.accuracy)}m
                    </p>
                  )}
                </div>
              )}
              {status && (
                <p className={`font-bold ${
                  status.includes('inside') ? 'text-green-500' : 'text-red-500'
                }`}>
                  You are {status} the target location (50m range)
                </p>
              )}
            </>
          )}
        </div>
      </div>

      {accuracyWarning && (
        <Alert variant="warning" className="mt-4">
          <AlertCircle className="h-4 w-4" />
          <p className="ml-2">{accuracyWarning}</p>
        </Alert>
      )}

      <div className="border-t pt-4">
        <Button
          onClick={saveCurrentLocation}
          disabled={!currentLocation || currentLocation.accuracy > 30}
          className="w-full flex items-center justify-center gap-2"
        >
          <Save className="h-4 w-4" />
          Save Current Location
          {currentLocation?.accuracy > 30 && " (Waiting for better accuracy)"}
        </Button>

        {savedLocations.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-medium mb-2">Saved Locations</h3>
            <div className="space-y-2">
              {savedLocations.map((loc, index) => (
                <div key={loc.timestamp} className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                  <p>Location {index + 1}</p>
                  <p>Lat: {loc.lat.toFixed(6)}</p>
                  <p>Lng: {loc.lng.toFixed(6)}</p>
                  <p>Accuracy: ±{Math.round(loc.accuracy)}m</p>
                  <p>Saved: {new Date(loc.timestamp).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}