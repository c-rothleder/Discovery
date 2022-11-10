/**
 * This is the main Redux actions file.
 */
 export const SET_ORIGIN_COORDS = 'SET_ORIGIN_COORDS';
 export const SET_ORIGIN_STRING = 'SET_ORIGIN_STRING';
 export const SET_DESTINATION_COORDS = 'SET_DESTINATION_COORDS';
 export const SET_DESTINATION_STRING = 'SET_DESTINATION_STRING';
 export const SET_SELECTED_ROUTE = 'SET_SELECTED_ROUTE';
 export const SET_CURRENT_COORDS = 'SET_CURRENT_COORDS';
 export const PUSH_TO_YELP_QUEUE = 'PUSH_TO_YELP_QUEUE';
 export const POP_FROM_YELP_QUEUE = 'POP_FROM_YELP_QUEUE';
 export const CLEAR_QUEUE = 'CLEAR_QUEUE';
 
 export function setOriginCoords(originCoords) {
   return {
     type: SET_ORIGIN_COORDS,
     originCoords,
   };
 }
 
 export function setOriginString(originString) {
   return {
     type: SET_ORIGIN_STRING,
     originString,
   };
 }
 
 export function setDestinationCoords(destinationCoords) {
   return {
     type: SET_DESTINATION_COORDS,
     destinationCoords,
   };
 }
 
 export function setDestinationString(destinationString) {
   return {
     type: SET_DESTINATION_STRING,
     destinationString,
   };
 }
 
 export function setSelectedRoute(selectedRoute) {
   return {
     type: SET_SELECTED_ROUTE,
     selectedRoute,
   };
 }
 
 export function setCurrentCoords(currentCoords) {
   return {
     type: SET_CURRENT_COORDS,
     currentCoords,
   };
 }
 
 export function pushToYelpQueue(url) {
   return {
     type: PUSH_TO_YELP_QUEUE,
     url,
   };
 }
 
 export function popFromYelpQueue() {
   return {
     type: POP_FROM_YELP_QUEUE,
   };
 }
 
 export function clearQueue() {
   return {
     type: CLEAR_QUEUE,
   };
 }
 