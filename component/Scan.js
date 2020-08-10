import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Button,
         View,
         ActivityIndicator } from 'react-native';
import { getNetworks } from '../utils/RaspberryAPI'
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

    function callback(data){
        setIsLoading(false)
        navigation.navigate('Networks',{
            networks: data,
            ip: ip
        })
    }

    return(
        <View>
            <Button title="Scan" onPress={onPressButton}/>
            {isLoading &&(
                <ActivityIndicator size="large" color="#00ff00"/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
})