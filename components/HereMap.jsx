import React, { Component } from 'react';
import { View, StyleSheet, Modal, useState, Text, Pressable } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Polyline, Marker } from 'react-native-maps';
import { connect } from 'react-redux';
import uuid from 'react-native-uuid';
//import { decode } from './Here/PolylineEncoderDecoder';
//import stops from "../Test/stops.json";
import { originPropType, destinationPropType } from '../commonPropTypes'; // function to decode polyline string
import { TouchableOpacity} from 'react-native-gesture-handler';
import Attraction from './restaurant';
import Card from './modal';
import { navigationPropType } from '../commonPropTypes';
 import Navigation from '../AppNavigation';
 import { useNavigation } from '@react-navigation/native';
import Input from "./Input";

//const destinationIcon = require('../assets/destinationIcon.png');


class HereMap extends Component {



  constructor(props) {
    super(props);
    this.state = {
      allRoutesFullPolylines: [],
    };
    

    this.state = {
      listofCoordinates:[],
      routeStops: [],
      restaurantIds: [],
      restaurantInfo:[],
      modalVisible: false
    };



    // this.getPolylineCoords = this.getPolylineCoords.bind(this);
  }




  async getRestaurantIds(id) {

    const url = `https://publictransithub.com/api/restaurants/getrestaurants?stop_id=${id}`;
    const restaurantData = await fetch(url);
    const restaurantJson = await restaurantData.json();
    this.getRestaurantInfo(restaurantJson);
  }

  async getRestaurantInfo(restaurantJson) {
    const restaurantData = await Promise.all(
        restaurantJson.map( async id => {
          if(id[0] > 0) {
            const url = `https://publictransithub.com/api/restaurants/getrestaurant?restaurant_id=${id[0]}`;
            const data = await fetch(url);
            const jsonData = await data.json();
            return jsonData;
          }
          return null;
    }))
    this.setState(() => ({
      restaurantInfo: [...restaurantData]

    }))

  }

  // Then, create a function to set the modal visible when the user clicks on the Marker:

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

// Then, create a function to show the modal when the user clicks on the Marker:

  showAttraction(id) {
    this.setModalVisible(true)
    this.getRestaurantIds(id);
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

        if(curIndex === 2)
          coordinate["longitude"] = currStop;
        else if(curIndex === 3)
          coordinate["latitude"] = currStop;
        else if(curIndex === 0)
          coordinate["id"] = currStop;

      })

    allCoordinates.push(coordinate);


    })


    this.setState( () => ({
      listofCoordinates: [...allCoordinates],
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
         <View>
           <Modal
               animationType="slide"
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => {
                 Alert.alert("Modal has been closed.");
               }}
           >
             <View style={styles.centeredView}>
               <View style={styles.modalView}>
                <View style = {styles.textView}>
                 <Text style={styles.modalText}> Name:
                   {this.state.restaurantInfo[0] !== undefined ? this.state.restaurantInfo[0][4] : "Null"}</Text>
                 <Text style={styles.modalText}> "Address - "
                   {this.state.restaurantInfo[0] !== undefined ? this.state.restaurantInfo[0][3] : "Null"}</Text>
                </View>
                <View style = {styles.textView}>
                 <Text style={styles.modalText}> Name:
                   {this.state.restaurantInfo[0] !== undefined ? this.state.restaurantInfo[1][4] : "Null"}</Text>
                 <Text style={styles.modalText}> "Address - "
                   {this.state.restaurantInfo[0] !== undefined ? this.state.restaurantInfo[2][3] : "Null"}</Text>
                </View>
                 <Pressable
                     style={[styles.button, styles.buttonClose]}
                     onPress={() => this.setModalVisible(!this.state.modalVisible)}
                 >
                   <Text style={styles.textStyle}>Back</Text>
                 </Pressable>
               </View>
             </View>
           </Modal>
        </View>
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
                  return <Marker onPress ={()=>this.showAttraction(busCoordinate.id)} id = {busCoordinate.id} coordinate = {busCoordinate}  pinColor="orange"/>
                  //
          })
          }
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  textView: {
    margin: 10,
    flexDirection: 'collumn',
    justifyContent: "center",
    flexWrap: 'wrap',
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 100,
    backgroundColor: "white",
    borderRadius: 20,
    width: 200,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 10
  },
  button: {
    borderRadius: 20,
    padding: 20,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "rgba(222, 34, 34, 0.78)",
    width: 100,
    elevation: 2
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom:100,
    textAlign: "center"
  }
});


const mapStateToProps = (state) => ({
  origin: state.originCoords,
  destination: state.destinationCoords,
  destinationRaw: state.destinationString,
});

HereMap.defaultProps = {
  //navigation: navigationPropType,
  origin: null,
  destination: null,
};

HereMap.propTypes = {
  //navigation: navigationPropType,
  origin: originPropType,
  destination: destinationPropType,
};

export default connect(mapStateToProps)(HereMap);