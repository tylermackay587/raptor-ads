import React from 'react';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
} from 'react-google-maps';

const GoogleMapRender = withGoogleMap(props =>
  <GoogleMap
    center={props.defaultCenter}
    zoom={12}
  >
    {props.markers.map((marker, index) => (
      <Marker
        {...marker.position}
        onClick={() => props.handleInfoWindow(marker, index)}
      />
    ))}
  </GoogleMap>
);

export default GoogleMapRender;


      //       {marker.position && marker.position.showInfo && (
      //   <InfoWindow onCloseClick={() => props.handleInfoWindow(marker, index)}>
      //     <GoogleMapInfoWindow
      //       title={marker.title}
      //       distance={marker.distanceFromCenter}
      //     />
      //   </InfoWindow>
      // )}