import { useEffect, useRef, useState } from 'react';
import { Box, Stack, Slide, Text, useDisclosure, VStack } from '@chakra-ui/react';
import mapboxgl, { Marker, Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { MapboxSearchBox } from '@mapbox/search-js-web';
import 'mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import { config } from '../../../config.ts';
import HomeOfficeAddressLayOver from '../../components/HomeOfficeAddressLayover';
import axios from 'axios';


function SetupDailyRoute() {
  
  const [mapMarkers, setMapMarkers] = useState<mapboxgl.Marker[]>([])
  const [directions, setDirections] = useState([{distance: 0}]);
  const { isOpen, onToggle } = useDisclosure();
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<Map | null>(null);
  mapboxgl.accessToken = 'pk.eyJ1IjoiemFoaWR0d3QiLCJhIjoiY2xnaWV0YXB1MHVzNDNwbXk4NmdjZDBzZiJ9.7yB9lTwtcki0wvg2BQHNaw';
  

  const generateNewMarker = ({ lat, lng, map }: { lng: number; lat: number; map: Map }) => {
    const marker = new Marker({ color: '#63df29', scale: 1.5 })
      .setLngLat([lng, lat])
      .setDraggable(true)
      .on('dragend', () => { setMapMarkers(prevState => prevState.map((mark) => mark)) })
      .addTo(map);

    marker.getElement().addEventListener('click', () => {
      const markerLatLng = marker.getLngLat();
      marker.remove();
      setMapMarkers((prevState) => prevState.filter((marker) => marker.getLngLat().lat !== markerLatLng.lat && marker.getLngLat().lng !== markerLatLng.lng));
    });

    setMapMarkers(prevState => [...prevState, marker]);
  };


  useEffect(() => {
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/zahidtwt/clgienaqi005u01o1d5rzcmgi',
        center: [90.30857818617242, 23.880958224097034],
        zoom: 13,
      });
      const search = new MapboxSearchBox();
      search.accessToken = config.mapboxAccess;
      search.theme = {
        variables: {
          fontFamily: 'Poppins, sans-serif',
          unit: '15px',
          padding: '0.5em',
          borderRadius: '10px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        },
        cssText: '.Input:active { opacity: 0.5; }, ',
      };
      mapRef.current.addControl(search);
      mapRef.current &&
        mapRef.current.on('click', ({ lngLat }: { lngLat: any }) => {
          generateNewMarker({ map: mapRef.current!, ...lngLat })
        }
        );
    }
    return () => mapRef.current?.remove();
  }, []);


  useEffect(() => {
    const fetchData = async () => {
      if (mapMarkers.length > 1) {
        try {
          const coordinatePairs = mapMarkers.reduce((acc: string, marker: mapboxgl.Marker, index: number) => {
            return acc + marker.getLngLat().lng + ',' + marker.getLngLat().lat + (index === mapMarkers.length - 1 ? '' : ';');
          }, '');
          const response = await axios.get(
            `https://api.mapbox.com/directions/v5/mapbox/cycling/${coordinatePairs}`,
            {
              params: {
                alternatives: true,
                continue_straight: true,
                geometries: 'geojson',
                language: 'en',
                overview: 'simplified',
                steps: true,
                access_token: mapboxgl.accessToken,
              },
            }
          );
          if (mapRef.current) {
            if (mapRef.current.getSource('route')) {
              mapRef.current.removeLayer('route');
              mapRef.current.removeSource('route');
            }
            mapRef.current.addLayer({
              id: 'route',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {},
                  geometry: {
                    type: 'LineString',
                    coordinates: response.data.routes[0].geometry.coordinates,
                  },
                },
              },
              layout: {
                'line-join': 'round',
                'line-cap': 'round',
              },
              paint: {
                'line-color': '#3887be',
                'line-width': 5,
                'line-opacity': 0.75,
              },
            });
          }
          setDirections(response.data.routes);
        } catch (error) {
          console.error('Error fetching directions:', error);
        }
      }
    };
    fetchData();
  }, [mapMarkers]);

  
  useEffect(() => {
    const distance = directions[0].distance;
    localStorage.setItem('totalDistance', JSON.stringify(distance));
  }, [directions]);


  function convertMapMarkersToMarkars() {
    return mapMarkers.map((marker) => ({ lat: marker.getLngLat().lat, lng: marker.getLngLat().lng }));
  }

  function clearMarkersAndRoutes () {
    if (mapRef.current) {
      if (mapRef.current.getSource('route')) {
        mapRef.current.removeLayer('route');
        mapRef.current.removeSource('route');
      }
    }

    mapMarkers.forEach(marker => marker.remove());
    setMapMarkers([]);
    setDirections([{distance: 0}]);
  }



  return (
    <VStack spacing={4}>
      <Box
        style={{
          width: '100vw',
          height: '100vh',
          position: 'relative',
        }}
        ref={mapContainerRef}
      />
      <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
        <Stack
          p={4}
          spacing={7}
          style={{
            borderRadius: '2rem 2rem 0 0',
            bottom: 0,
            left: 0,
            right: 0,
            position: 'absolute',
            width: '100%',
            height: '40vh',
            backgroundColor: '#001F3F',
            zIndex: 200,
          }}
        >
          <Text mt={'0.5rem'} color={'accent'} fontWeight={'semibold'} fontSize={'xl'} px={1}>
            Your daily commute details
          </Text>
          <HomeOfficeAddressLayOver markars={convertMapMarkersToMarkars()} onToggle={onToggle} onClear={clearMarkersAndRoutes} />
        </Stack>
      </Slide>
    </VStack>
  );
}

export default SetupDailyRoute;
