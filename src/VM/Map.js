import React from 'react';
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap
} from 'react-google-maps';
const Map = (props) => {
  return(
    <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat: 19.427065, lng:-99.167495}} //coordenada del lugar donde se quiere mostrar
    />
  );
};

export default withScriptjs(
  withGoogleMap(
    Map
  )
)
