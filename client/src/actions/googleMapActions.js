import { ADD_MAP_MARKER, CHANGE_CENTER, CHANGE_MARKER_SHOW_INFO, CHANGE_CENTER_SUCCESS, ADD_MAP_MARKERS_SUCCESS } from '../constants';
import concatAddress from '../components/helpers/concatAddress';
import { getAllListingsSuccess } from './allListingActions';
import { getCurrentListingSuccess } from './fullListingActions';

const geoCode = (data) => {
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ address: concatAddress(action.data.user) });
};

export const changeCenterSuccess = newCenter =>
  ({
    type: CHANGE_CENTER_SUCCESS,
    location: newCenter,
  });

export const addMapMarkersSuccess = markerArray =>
  ({
    type: ADD_MAP_MARKERS_SUCCESS,
    markerArray,
  });

export const changeCenter = data =>
  (dispatch) => {
    let addressString = '';
    typeof data === 'string' ? addressString = data : addressString = concatAddress(data);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: addressString }, (results) => {
      const newCenter = {
        lat: results[0].geometry.bounds.f.f,
        lng: results[0].geometry.bounds.b.b,
        position: results[0].geometry.location,
      };
      dispatch(changeCenterSuccess(newCenter));
    });
  };

export const changeMarkerShowInfo = index =>
  ({
    type: CHANGE_MARKER_SHOW_INFO,
    index,
  });

export const addMapMarkers = data =>
  (dispatch) => {
    const markerArray = [];
    const newData = [...data];
    const geocoder = new google.maps.Geocoder();
    for (let i = 0; i < data.length; i++) {
      geocoder.geocode({ address: concatAddress(data[i]) }, (results) => {
        const newCenter = {
          position: results[0].geometry.location,
          defaultAnimation: 2,
          key: data[i].id,
          showInfo: false,
        };
        markerArray.push(newCenter);
        newData[i].position = newCenter;
        if (i === data.length - 1) {
          dispatch(getAllListingsSuccess(newData));
          dispatch(addMapMarkersSuccess(markerArray));
        }
      });
    }
  };

export const addMapMarker = data =>
  (dispatch) => {
    const newData = {...data};
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: concatAddress(data)}, (results) => {
      const newCenter = {
        position: results[0].geometry.location,
        defaultAnimation: 2,
        key: data.id,
        showInfo: false,
      };
      newData.position = newCenter;
      dispatch(getCurrentListingSuccess(newData));
      dispatch(addMapMarkersSuccess([newCenter]));
    });
  };

export const sortMarkersByDistance = data =>
  (dispatch, getState) => {
    const markers = [...data];
    const centerPosition = getState().googleMap.center.position;
    for (let i = 0; i < markers.length; i++) {
      markers[i].distanceFromCenter = google.maps.geometry.spherical.computeDistanceBetween(centerPosition, markers[i].position);
    }
    markers.sort((a, b) => a.distanceFromCenter - b.distanceFromCenter);
    dispatch(addMapMarkersSuccess(markers));
  };
