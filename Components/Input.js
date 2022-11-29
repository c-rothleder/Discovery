
import React from 'react';
import routes from "../Test/routes.json"

import { SafeAreaView, StyleSheet, TextInput, Button , View} from "react-native";

class Input extends React.Component {
    constructor(props){
        super(props);
        this.state = {
           transitName: ""
        };
    }
    updateTransitName = (text) => {
        this.setState({transitName : text})
    }
    findRoute = (transit) => {
        if(transit.transit.toLowerCase() === this.state.transitName.toLowerCase())
            return transit;
    }
    printRoute = () => {
        const route = routes.filter(this.findRoute);
        route.forEach(async r => {
            let api = "%27%27"
            let copy = api.split("%");
            copy[1] = copy[1] + r.route;
            let res = copy.join("%");
            let URL = "https://publictransithub.com/api/stopsonroute/?route_id=" + res;
            let StopResp = await fetch(URL);
            let respJSONRouteStops = await StopResp.json();
            this.props.handleFindRoute(respJSONRouteStops);
        });
    }
    render(){
        return (
            <SafeAreaView style = {styles.fixToText}>
                <View >
                    <TextInput
                        style={styles.input}
                        onChangeText={transitName = this.updateTransitName}
                        value={this.state.transitName}
                        placeholder="Type in name of transit"
                        keyboardType="default"
                    />
                </View>
    
                <View >
                    <Button
                        title="Find Routes"
                        onPress={this.printRoute}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

// const Input = () => {
//     const [transitName, onChangeTransit] = React.useState("");
    
//     // https://publictransithub.com/api/stopsonroute?route_id='53'


    
// };



const styles = StyleSheet.create({
    fixToText: {
        flexDirection: 'row'
    },
    inputContainer: {
        // paddingTop: 50,
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        elevation: 1,
        width: '90%',
        height: '8%',
        // top: 30, // places the search bar right at the top of the application (if <SearchBar/> is the first element called by render() in App.js)
        marginTop: '7%', // places search bar under the logo.
        borderRadius: 3,
        shadowOpacity: 0.75,
        shadowRadius: 1,
        shadowColor: 'gray',
        shadowOffset: { height: 0, width: 0 },
        alignItems: 'center',
    },

    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 230
    }




});

export default Input;