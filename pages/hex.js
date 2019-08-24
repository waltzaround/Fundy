import React, {Component} from 'react';
import {render} from 'react-dom';
import DeckGL, {GeoJsonLayer, HexagonLayer} from 'deck.gl';

// source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz

const PROPERTY =
  'https://raw.githubusercontent.com/uber-common/deck.gl-data/master/examples/geojson/vancouver-blocks.json';

  

const INITIAL_VIEW_STATE = {
    longitude: -1.4157,
      latitude: 52.2324,
      zoom: 6,
      minZoom: 5,
      maxZoom: 15,
      pitch: 40.5,
  bearing: 0
  
};

const OPTIONS = ['radius', 'coverage', 'upperPercentile'];

    const COLOR_RANGE = [
      [1, 152, 189],
      [73, 227, 206],
      [216, 254, 181],
      [254, 237, 177],
      [254, 173, 84],
      [209, 55, 78]
    ];

    const COLOR_SCALE = [
        // negative
        [65, 182, 196],
        [127, 205, 187],
        [199, 233, 180],
        [237, 248, 177],
  
        // positive
        [255, 255, 204],
        [255, 237, 160],
        [254, 217, 118],
        [254, 178, 76],
        [253, 141, 60],
        [252, 78, 42],
        [227, 26, 28],
        [189, 0, 38],
        [128, 0, 38]
      ];

class Root extends Component {
  _onClick(info) {
    if (info.object) {
      // eslint-disable-next-line
      alert(`${info.object.properties.name} (${info.object.properties.abbrev})`);
    }
  }

  colorScale(x) {
    const i = Math.round(x * 7) + 4;
    if (x < 0) {
      return COLOR_SCALE[i] || COLOR_SCALE[0];
    }
    return COLOR_SCALE[i] || COLOR_SCALE[COLOR_SCALE.length - 1];
  }
   
  render() {
    return (
      <DeckGL controller={true} initialViewState={INITIAL_VIEW_STATE}>
     
        <GeoJsonLayer
          id="airports"
          data={PROPERTY}
          opacity={1}
          stroked={false}
      filled={true}
      extruded={true}
      wireframe={true}
      fp64={true}
      getElevation={ f => Math.sqrt(f.properties.valuePerSqm) * 10}
      getFillColor={f => this.colorScale(f.properties.growth)}
      getLineColor={ [255, 255, 255]}
      pickable={true}
      //onHover= {this.updateTooltip}
        />
        <HexagonLayer
          id="heatmap"
          data={PROPERTY}
        //   dataTransform={d => d.features.filter(f => f.properties.valuePerSqm >1000)}
        //   getSourcePosition={f => [-0.4531566, 51.4709959]}
        //   getTargetPosition={f => f.geometry.coordinates}
        //   getSourceColor={[0, 128, 200]}
        //   getTargetColor={COLOR_RANGE}
        elevationRange= {[0, 1000]}
        elevationScale= {250}
        extruded={true}
        getPosition={d => d}
        opacity={1}
        colorRange= { COLOR_RANGE}
        />
      </DeckGL>
    );
  }
}
export default Root;

/* global document */
//render(<Root />, document.body.appendChild(document.createElement('div')));