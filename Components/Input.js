
import React from 'react';
import routes from "../Test/routes.json"

import { SafeAreaView, StyleSheet, TextInput, Button , View} from "react-native";


const Input = () => {
    const [transitName, onChangeTransit] = React.useState("");

    const findRoute = (transit) => {
        if(transit.transit.toLowerCase() === transitName.toLowerCase())
            return transit;
    }

    // https://publictransithub.com/api/stopsonroute?route_id='53'

    const printRoute = () => {
        const route = routes.filter(findRoute);
        route.forEach(r => {
            alert(`Route is ${JSON.stringify(r.route)}`);
        });

    }

    return (
        <SafeAreaView style = {styles.fixToText}>
            <View >
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeTransit}
                    value={transitName}
                    placeholder="Type in name of transit"
                    keyboardType="default"
                />
            </View>

            <View >
                <Button
                    title="Find Routes"
                    onPress={printRoute}
                />
            </View>
        </SafeAreaView>

    );
};



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