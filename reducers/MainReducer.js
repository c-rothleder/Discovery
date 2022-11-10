/**
 * This is the main redux reducer.
 */

 import {
    SET_ORIGIN_COORDS, SET_ORIGIN_STRING, SET_DESTINATION_COORDS, SET_DESTINATION_STRING, SET_SELECTED_ROUTE, SET_CURRENT_COORDS, PUSH_TO_YELP_QUEUE, POP_FROM_YELP_QUEUE, CLEAR_QUEUE,
  } from '../actions';
  
  function mainReducer(state = {
    originCoords: null, originString: null, destinationCoords: null, destinationString: null, selectedRoute: null, currentCoords: null, yelpQueue: [],
  }, action) {
    switch (action.type) {
      case SET_ORIGIN_COORDS:
        return { ...state, originCoords: action.originCoords };
      case SET_ORIGIN_STRING:
        return { ...state, originString: action.originString };
      case SET_DESTINATION_COORDS:
        return { ...state, destinationCoords: action.destinationCoords };
      case SET_DESTINATION_STRING:
        return { ...state, destinationString: action.destinationString };
      case SET_SELECTED_ROUTE:
        return { ...state, selectedRoute: action.selectedRoute };
      case SET_CURRENT_COORDS:
        return { ...state, currentCoords: action.currentCoords };
      case PUSH_TO_YELP_QUEUE:
        state.yelpQueue.push(action.url);
        return state;
      case POP_FROM_YELP_QUEUE:
        if (state.yelpQueue === []) { // if already empty, just return.
          return state;
        }
        state.yelpQueue.shift();
        return {
          ...state,
          yelpQueue: JSON.parse(JSON.stringify(state.yelpQueue)), // shift() is an in-place function. However, we want to return a new array (so that the attraction images can pick up on the queue changing).
        };
      case CLEAR_QUEUE:
        return { ...state, yelpQueue: [] };
      default:
        return state;
    }
  }
  
  export default mainReducer;
  