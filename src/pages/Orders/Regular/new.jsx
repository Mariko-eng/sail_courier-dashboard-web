import { useState, useEffect } from 'react';
import { Box, Input } from '@mui/material';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import { Marker, Polyline, GoogleMap } from '@react-google-maps/api';

const RegularOrderNew = () => {
  const [addressOrigin, setAddressOrigin] = useState('');
  const [addressOriginPlaceId, setAddressOriginPlaceId] = useState('');
  const [originCordinates, setOriginCordinates] = useState({});
  const [addressDestination, setAddressDestination] = useState('');
  const [addressDestinationPlaceId, setAddressDestinationPlaceId] = useState('');
  const [destCordinates, setDestCordinates] = useState({});
  const [pathCoordinates, setPathCoordinates] = useState([]);


  const handleChangeOrigin = (newAddress) => {
    setAddressOrigin(newAddress);
  };

  const handleChangeDestination = (newAddress) => {
    setAddressDestination(newAddress);
  };

  const handleSelectOrigin = async (selectedAddress, placeId) => {
    setAddressOrigin(selectedAddress);
    setAddressOriginPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', selectedAddress);
      console.log('Lat, Lng:', latLng);
      setOriginCordinates(latLng);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };


  const handleSelectDestination = async (selectedAddress, placeId) => {
    setAddressDestination(selectedAddress);
    setAddressDestinationPlaceId(placeId);
    try {
      const results = await geocodeByAddress(selectedAddress);
      const latLng = await getLatLng(results[0]);
      console.log('Selected Location:', selectedAddress);
      console.log('Lat, Lng:', latLng);
      setDestCordinates(latLng);
    } catch (error) {
      console.error('Error getting location:', error);
    }
  };

    useEffect(() => {
      if (Object.keys(originCordinates).length !== 0 && Object.keys(destCordinates).length !== 0) {
        const directionsService = new window.google.maps.DirectionsService();

        const request = {
          origin: originCordinates,
          destination: destCordinates,
          travelMode: window.google.maps.TravelMode.DRIVING
        };

        directionsService.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const route = result.routes[0].overview_path;
            // console.log(result);
            // console.log(route);
            console.log(result.routes[0].legs[0].distance);
            console.log(result.routes[0].legs[0].duration);
            console.log(result.routes[0].overview_polyline);
            const coordinates = route.map((point) => ({
              lat: point.lat(),
              lng: point.lng()
            }));
            setPathCoordinates(coordinates);
          }
        });
      }
    }, [originCordinates, destCordinates]);



  const searchOptions = {
    // Restrict autocomplete suggestions to a specific country
    componentRestrictions: { country: 'UG' } // Replace 'US' with the desired country code
  };


  return (
    <div>
      <p>Add New Order</p>

      <Box mb={'20px'}>
        <PlacesAutocomplete
          value={addressOrigin}
          onChange={handleChangeOrigin}
          onSelect={handleSelectOrigin}
          searchOptions={searchOptions} // Pass the search options here
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input fullWidth type="text" placeholder="Pick up point" {...getInputProps({ placeholder: 'Enter Pickup Address' })} />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                  };
                  return (
                    <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Box>

      <Box mb={'20px'}>
        <PlacesAutocomplete
          value={addressDestination}
          onChange={handleChangeDestination}
          onSelect={handleSelectDestination}
          searchOptions={searchOptions} // Pass the search options here
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
              <Input fullWidth type="text" placeholder="Drop off point" {...getInputProps({ placeholder: 'Enter Drop Off Address' })} />
              <div>
                {loading ? <div>Loading...</div> : null}
                {suggestions.map((suggestion, index) => {
                  const style = {
                    backgroundColor: suggestion.active ? '#41b6e6' : '#fff'
                  };
                  return (
                    <div key={index} {...getSuggestionItemProps(suggestion, { style })}>
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </PlacesAutocomplete>
      </Box>

      {Object.keys(originCordinates).length !== 0 && Object.keys(destCordinates).length !== 0 && (
        <GoogleMap center={originCordinates} zoom={14} mapContainerStyle={{ height: '300px', width: '100%' }}>
          <Marker position={originCordinates} label={'Pick up'}/>
          <Marker position={destCordinates} label={'Drop off'}/>
          <Polyline
            path={pathCoordinates}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1.0,
              strokeWeight: 2
            }}
          />
        </GoogleMap>
      )}
    </div>
  );
};

export default RegularOrderNew
