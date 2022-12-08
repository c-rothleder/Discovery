import React, { Component } from 'react';
import {
  View, TouchableOpacity, Image, StyleSheet, Text,
} from 'react-native';
import PropTypes from 'prop-types';

import CardFlip from 'react-native-card-flip';
//import AttractionImage from './AttractionImages/AttractionImage';

//import { originPropType, hereLocationPropType, navigationPropType } from '../commonPropTypes';

//import { getTravelDurationString } from './Here/DirectionsHelperFuncs';

const tripleDot = require('../assets/TripleDot.png');
//const redDot = require('../assets/RedDot.png');
const attractionRedLine = require('../assets/AttractionRedLine.png');
//const backwardsArrow = require('../assets/BackwardsArrow.png');

// TODO: This component needs a "loading..." image, for when the yelp data is still being resolved, and a "no image found" image for when the yelp api has no data for us.

class Attraction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resturantsInfo: this.props.data,
      //name: this.props.data[4],
      response: null,
      // visible: this.props.visible,
      // mounted: false, // make sure state not updated on unmounted component
    };
    this.go = this.go.bind(this);
  }

  /*
    * TODO: Handle edge case where no public transit routes are found for a given destination.
    *  If that happens, the AttractionView component should remove this Attraction card.
    * */
  // async componentDidMount(id) {
  //   //replace below with restaurant
  //   const respjson = await resp.json();
  //   if (!respjson[0]) {
  //     this.setState({ response: respjson});
  //   } else {
  //     this.setState({ response: respjson});
  //   }
  // }

  // getAddress() {
  //   const fullAddress = this.props.data.address.label;
  //   const address = fullAddress.substring(fullAddress.indexOf(',') + 2); // The full address includes the place name. We don't need that, so this code just removes that part.
  //   return address;
  // }

  // go() {
  //   alert("directions page")
  // }

  render() {
    // if (this.state.visible && this.state.mounted) {
    //   let name = resturantsInfo[4];
    //   if (name.length > 23) {
    //     name = `${name.substr(0, 20).trim()}...`; // Making sure the place name stays on one line. Also making sure it doesn't overlap with button on back of card.
    //   }
    //   const dist = this.getDist();
    //   const cuisine = this.getCuisine();
    //   const contact = this.getContactInfo();
    //   const travelDuration = getTravelDurationString(this.state.response.routes[0]);

      const imageOrPlaceholder = (
        // eslint-disable-next-line global-require,import/no-dynamic-require
        <View style={styles.imagePlaceholder}>
          <TouchableOpacity style={styles.tripleDotButton} onPress={() => this.card.flip()}>
            <Image source={tripleDot} style={{ height: 40, width: 40 }} />
          </TouchableOpacity>
        </View>
      );
      return (
        <CardFlip style={styles.cardView} ref={(card) => this.card = card}>
          <View style={styles.cardFrontSide}>
            {imageOrPlaceholder}
            <View style={styles.infoView}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text key={0} style={styles.name}>{name}</Text>
                {/* <Image source={redDot} style={{ margin: 5 }} /> */}
                { /* Only render this item if this attraction is a restaurant or something similar. */ }
                {/* { this.state.dining && <Text key={1} style={styles.cuisine}>{cuisine}</Text> } */}
              </View>
              <Image source={attractionRedLine} style={{ margin: 10 }} />
              <View style={{ flexDirection: 'row' }}>
                {/* <Text style={styles.distance}>
                  {dist}
                  {' '}
                  Miles Away
                </Text> */}
                {/* <Image source={redDot} style={{ margin: 5 }} /> */}
                {/* <Text style={styles.distance}>{travelDuration}</Text> */}
                <TouchableOpacity style={styles.goButton} onPress={this.go}>
                  <Text style={styles.goText}>Go</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          {/* Everything above details the layout of the front of the card. Everything below details the layout of the back of the card. */}
          {<View style={styles.cardBackSide}>
            <TouchableOpacity onPress={() => this.card.flip()} style={{ marginLeft: 5, marginTop: 5, position: 'absolute' }}>
              <Image source={backwardsArrow} style={{ height: 40, width: 40 }} />
            </TouchableOpacity>
            <Text style={{ textAlign: 'center', fontFamily: 'Helvetica Neue', fontSize: 20 }}>{name}</Text>
            <Image source={attractionRedLine} style={{ alignSelf: 'center', margin: 10 }} />
            <View style={styles.addressBox}>
              <Text style={{ fontFamily: 'Helvetica Neue', fontSize: 13 }}>{this.getAddress()}</Text>
            </View>
          </View>}
        </CardFlip>
      );
    }
}

const styles = StyleSheet.create({
  cardView: {
    height: 234,
    width: '100%',
    backgroundColor: 'transparent',
    color: 'white',
    marginBottom: '10%',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardFrontSide: {
    height: '100%',
    width: '100%',
  },

  cardBackSide: {
    height: '100%',
    width: '100%',
    color: 'white',
    backgroundColor: 'white',
  },

  tripleDotButton: {
    alignSelf: 'flex-end',
    marginTop: 5,
    marginRight: 5,
    position: 'absolute',
  },

  imagePlaceholder: {
    height: '65%',
    width: '100%',
    top: 0,
    backgroundColor: 'blue',
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    overflow: 'hidden',
  },

  infoView: {
    width: '100%',
    height: '35%',
    color: 'white',
    backgroundColor: 'white',
    bottom: 0,
    marginBottom: 0,
  },

  name: {
    fontSize: 18,
    textAlign: 'left',
    paddingLeft: 5,
    fontWeight: '500',
    fontFamily: 'Helvetica Neue',
  },

  cuisine: {
    fontSize: 13,
    color: 'black',
    fontFamily: 'Helvetica Neue',
  },

  distance: {
    fontSize: 12,
    // textAlign: 'left',
    paddingLeft: 5,
    fontFamily: 'Helvetica Neue',
  },

  goButton: {
    color: '#00ff00',
    backgroundColor: '#00ff00',
    height: 45,
    width: 45,
    right: 0, // All the way to the right
    bottom: 0, // At bottom of view but not overlapping
    marginRight: 5,
    marginBottom: -10, // I have no idea why or how, but apparently 1.) you can give it negative values and 2.) this puts the button right where it's supposed to go.
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    position: 'absolute',

  },

  goText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    margin: 'auto',
  },

  addressBox: {
    height: '20%',
    width: '85%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    justifyContent: 'center',
  },

  phoneBox: {
    height: '20%',
    width: '85%',
    alignSelf: 'center',
    margin: 10,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 1,
    justifyContent: 'space-between', // One element all the way on left, other all the way on right
    alignItems: 'center',
    flexDirection: 'row',
  },

});

Attraction.defaultProps = {
  visible: true,
};

// Attraction.propTypes = {
//   //origin: originPropType.isRequired,
//   data: hereLocationPropType.isRequired,
//   visible: PropTypes.bool,
//   navigation: navigationPropType.isRequired, // Used to switch screens
//   // dispatch: PropTypes.func.isRequired,
//   setDestinationString: PropTypes.func.isRequired,
//   setDestinationCoords: PropTypes.func.isRequired,
// };

export default Attraction;
