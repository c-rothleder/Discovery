// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';
// import Map from './UI/Map';

// export default function App() {
//   return (
//     <div>
//       <Map />
//     </div>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';

import { Provider } from 'react-redux';
import store from './store';


import AppNavigation from './AppNavigation';

export default function App(props) {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}