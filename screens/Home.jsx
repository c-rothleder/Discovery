import React, { Component } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';

import { connect } from 'react-redux';
import * as Location from 'expo-location';
import PropTypes from 'prop-types';
import { originPropType, navigationPropType } from '../commonPropTypes';
 import {
   setOriginCoords, setDestinationCoords, setDestinationString, setCurrentCoords, setOriginString,
 } from '../actions';

// import SearchBar from '../components/SearchBar';

import HereMap from '../components/HereMap';
//import Logo from '../components/Logo';
//import { COLLAPSED, EXPANDED } from '../components/UpwardsExpandingView';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // destination: null,
      origin: this.props.origin,
      exploreExpanded: false,
    };
    //this.getDestData = this.getDestData.bind(this);
    //this.exploreSizeChangeCallback = this.exploreSizeChangeCallback.bind(this);
  }

  async componentDidMount() {
    await this.getCurrentLocation();
  }

  async getCurrentLocation() {
    const { status } = await Location.requestPermissionsAsync();
    if (status === 'granted') {
      const currentPosition = await Location.getCurrentPositionAsync();
      this.props.dispatch(setOriginCoords(currentPosition.coords));
      this.props.dispatch(setCurrentCoords(currentPosition.coords));
      this.setState({ origin: currentPosition.coords });
    } else {
      // console.log('Location permissions not granted. Setting origin to SCU.');
      this.props.dispatch(setOriginCoords({ latitude: 37.354107, longitude: -121.955238 }));
      this.props.dispatch(setCurrentCoords({ latitude: 37.354107, longitude: -121.955238 }));
      this.props.dispatch(setOriginString('Santa Clara University'));
      this.setState({ origin: { latitude: 37.354107, longitude: -121.955238 } });
    }
  }

    // getDestData = (destString, destCoords) => {
    //   this.props.dispatch(setDestinationString(destString)); // put destination string and coords into redux store.
    //   this.props.dispatch(setDestinationCoords(destCoords));
    //   this.props.navigation.navigate('Directions');
    // }

    // exploreSizeChangeCallback(maximized) {
    //   if (maximized === EXPANDED) {
    //     this.setState({ exploreExpanded: true });
    //   } else {
    //     this.setState({ exploreExpanded: false });
    //   }
    // }

    render() {
      if (this.state.origin) {
        return (
          <View style={styles.entireViewContainer}>
            <HereMap />
          </View>
        );
      }

      return null;
    }
}

const styles = StyleSheet.create({
  entireViewContainer: { // All elements of the app are children of this container.
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'pink', // If you see any pink show up in the body of the app, something has gone terribly wrong. You're not supposed to see this part.
    alignItems: 'center', // Centers all children, including BTHub logo.
  },
});

const mapStateToProps = (state) => ({
  origin: state.originCoords,
});

Home.defaultProps = {
  origin: {},
};

Home.propTypes = {
  dispatch: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  navigation: navigationPropType.isRequired,
  origin: originPropType,
};

export default connect(mapStateToProps)(Home);
