/// app.js
import React from 'react';
import DeckGL from '@deck.gl/react';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1Ijoic2Frc2hhbWFuYW5kIiwiYSI6ImNqenA1cmltczA5dzIzbm1pd2U4MTBsd2UifQ.ogkekrC5WwkBuq7c-obCcA';

// Initial viewport settings
const initialViewState = {
  longitude: 174.763336,
  latitude: -36.848461,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Data to be used by the LineLayer
const data = [{sourcePosition: [-36.848461, 174.763336], targetPosition: [-36.848461, 174.763336]}];

class Map extends React.Component {
  render() {
    const layers = [
      new LineLayer({id: 'line-layer', data})
    ];

    return (
        <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={layers}
    >
        <StaticMap mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
    );
  }
}

export default Map;