import React from 'react';
import H from "@here/maps-api-for-javascript";

export default class Map extends React.Component {
  constructor(props) {
    super(props);
    // the reference to the container
    this.ref = React.createRef();
    // reference to the map
    this.map = null;
  }

  componentDidMount() {
    if (!this.map) {
      // instantiate a platform, default layers and a map as usual
      const platform = new H.service.Platform({
        apikey: '{YOUR_API_KEY}'
      });
      const layers = platform.createDefaultLayers();
      const map = new H.Map(
        this.ref.current,
        layers.vector.normal.map,
        {
          pixelRatio: window.devicePixelRatio,
          center: {lat: 0, lng: 0},
          zoom: 2,
        },
      );
      this.map = map;
    }
  }

  render() {
    return (
      <div
        style={{ width: '300px', height:'300px' }}
        ref={this.ref}
      />
    )
  }
}
