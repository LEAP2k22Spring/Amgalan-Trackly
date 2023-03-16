import React from 'react';
import {Dimensions} from 'react-native';
import {useMainContext} from '../context';
import MapView, {Marker} from 'react-native-maps';

export const GetLocation = () => {
  const {userPosition} = useMainContext();

  return (
    <MapView
      style={{
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      }}
      initialRegion={{
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
        latitude: userPosition.latitude,
        longitude: userPosition.longitude,
      }}
      showsUserLocation={true}>
      <Marker
        coordinate={{
          latitude: userPosition.latitude,
          longitude: userPosition.longitude,
        }}
        pinColor="gold"
      />
    </MapView>
  );
};
