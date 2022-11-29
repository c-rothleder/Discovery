import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
//import { decode } from './Here/PolylineEncoderDecoder';
//import stops from "../Test/stops.json";
import { originPropType, destinationPropType } from '../commonPropTypes'; // function to decode polyline string


import Input from "./Input";

const destinationIcon = require('../assets/destinationIcon.png');


class HereMap extends Component {

  // const busStop = {
  //   latitude: 37.377591,
  //   longitude: -122.030962
  // }

  // const buildCoordinates = () => {
  //
  //   stops.forEach(stop => {
  //     let coordinate = {};
  //     stop.forEach((currStop, curIndex) => {
  //
  //       if(curIndex == 2)
  //         Object.assign(coordinate, {longitude:currStop});
  //       else if(curIndex == 3)
  //         Object.assign(coordinate, {latitude:currStop});
  //
  //     })
  //     this.listofCoordinates.push(coordinate);
  //   })
  // }

  constructor(props) {
    super(props);
    this.state = {
      allRoutesFullPolylines: [],
    };

    this.state = {
      listofCoordinates:[],
      routeStops: []
    };




    // this.getPolylineCoords = this.getPolylineCoords.bind(this);
  }

  handleFindRoute(StopData){
    this.setState( () => ({
      routeStops: [...StopData]
    }))
    this.buildCoordinates();
  }

  buildCoordinates() {
    let allCoordinates = [];
    this.state.routeStops.forEach(stop => {
      let coordinate = {};
      stop.forEach((currStop, curIndex) => {

        if(curIndex == 2)
          coordinate["longitude"] = currStop;
        else if(curIndex == 3)
          coordinate["latitude"] = currStop;

        coordinate["id"] = uuid.v4();

      })

    allCoordinates.push(coordinate);


    })


    this.setState( () => ({
      listofCoordinates: [...allCoordinates]

    }))

  }

  /**
     *
     * @param {String} polylineString The API returns a polyline string that looks like a bunch of numbers, letters, and underscores. Pass that into this function.
     * @returns the decoded polyline string (an array of coordinate objects).
     * /
  getPolylineCoords(polylineString) {
    this.setState({
      polylineCoords: decode(polylineString),
    });
  }
   */

  /* ComponentDid*/
  componentDidMount() {
    this.getRouteData();
  }





  /**
     * Send request to the HERE API for the routing polyline data (the lines on the map)
     */
  async getRouteData() {
    if (this.props.destination) {
      const url = `https://transit.router.hereapi.com/v8/routes?apiKey=SRVWUJjjR1Yeiztz_s3jxRVkEVEdbnEC6v4Mr_ktKI0&origin=${this.props.origin.latitude},${this.props.origin.longitude}&destination=${this.props.destination.latitude},${this.props.destination.longitude}&alternatives=1&return=polyline&pedestrian[maxDistance]=6000`;
      const resp = await fetch(url);
      const respJSONRouteData = await resp.json();
      let routesAvailable;
      if (respJSONRouteData.routes.length === 0) {
        routesAvailable = false;
      } else {
        routesAvailable = true;
      }

      // If routes are available, then get each route's polyline and store in this.state.allRoutesFullPolylines
      if (routesAvailable) {
        const allPolylines = [];
        respJSONRouteData.routes.forEach((route) => {
          const { sections } = route;
          const coords = [];
        //   sections.forEach((section) => {
        //     coords.push(decode(section.polyline));
        //   });
          const polyline = [];
          coords.forEach((subArray) => {
            subArray.polyline.forEach((element) => {
              polyline.push(element);
            });
          });
          allPolylines.push(polyline);
        });
        this.setState({ allRoutesFullPolylines: allPolylines });
      }
    }
  }

  /**
     * @returns an array of <Polyline/> components that each show a possible route on the map.
     */
  showAllPolylines() {
    const polylines = [];
    if (this.state.allRoutesFullPolylines) {
      for (let i = 0; i < this.state.allRoutesFullPolylines.length; ++i) {
        if (i === 0) {
          polylines.push(
            <Polyline
              key={i}
              coordinates={this.state.allRoutesFullPolylines[i]}
              strokeWidth={3}
              strokeColor="blue"
            />,
          );
        } else {
          polylines.push(
            <Polyline
              key={i}
              coordinates={this.state.allRoutesFullPolylines[i]}
              strokeWidth={3}
              strokeColor="rgba(135, 206, 250, 0.75)"
            />,
          );
        }
      }
    }
    return polylines;
  }

  render() {
    /*
            Sometimes the origin doesn't get initialized right (depends on app performance and location permissions), so if it's not defined yet, just show a map without an initial region.
        */
    if (!this.props.origin) {
      return (
        <View style={styles.outerView}>
          <MapView style={{ flex: 1 }} provider={PROVIDER_GOOGLE} showsUserLocation />
        </View>
      );
    }

    return (
      <View style={styles.outerView}>
        <Input handleFindRoute = {this.handleFindRoute.bind(this)}/>
        <MapView
          style={{ flex: 1 }}
          provider={PROVIDER_GOOGLE}
          showsUserLocation
          initialRegion={{
            latitude: this.props.origin.latitude,
            longitude: this.props.origin.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >

          <Marker coordinate = {{
            latitude: this.props.origin.latitude,
            longitude: this.props.origin.longitude
          }}  pinColor="orange"/>

          {

            this.state.listofCoordinates.map( busCoordinate => {
                  return <Marker  id = {busCoordinate.id} coordinate = {busCoordinate}  pinColor="orange"/>
            })
          }



          {/*/>*/}

          {/*  )*/}
          {/*}*/}
          {/*<Marker  coordinate = {this.busStop} />*/}
          {/*{this.showAllPolylines()}*/}
          {/*{this.props.destination*/}
          {/*                  && <Marker coordinate={this.props.destination} icon={destinationIcon} />}*/}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerView: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
});

const mapStateToProps = (state) => ({
  origin: state.originCoords,
  destination: state.destinationCoords,
  destinationRaw: state.destinationString,
});

HereMap.defaultProps = {
  origin: null,
  destination: null,
};

HereMap.propTypes = {
  origin: originPropType,
  destination: destinationPropType,
};

export default connect(mapStateToProps)(HereMap);
