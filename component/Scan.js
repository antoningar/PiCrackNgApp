import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Button,
         View,
         ActivityIndicator } from 'react-native';
import { getNetworks } from '../utils/RaspberryAPI'
import { getNetworksRegistered } from '../utils/ServerAPI'
import { alertError } from '../utils/ErrorHelper' 


export default function Scan({ route, navigation }) {
    const { ip } = route.params 
    const [isLoading, setIsLoading] = useState(false)
    
    const onPressButton = () => {
        setIsLoading(true);
        getNetworks(ip)
            .then((data) => callback(data))
            .catch((error) => {
                alertError("Erreur", error.message)
                setIsLoading(false)
            })
    }

    const onRegistered = () => {
        setIsLoading(true);
        getNetworksRegistered()
            .then((data) => callbackRegistered(data))
            .catch((error) => {
                alertError("Erreur", error.message)
                setIsLoading(false)
            })
    }

    function callbackRegistered(data){
        setIsLoading(false)
        navigation.navigate('NetworksRegistered',{
            networks: data,
        })
    }

    function callback(data){
        setIsLoading(false)
        navigation.navigate('Networks',{
            networks: data,
            ip: ip
        })
    }

    return(
        <View>
            <View style={styles.button}>
                <Button title="Scan" onPress={onPressButton}/>
            </View>
            <Button title="See networks registered" onPress={onRegistered}/>
            {isLoading &&(
                <ActivityIndicator size="large" color="#00ff00"/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        marginBottom: 20,
    },
})