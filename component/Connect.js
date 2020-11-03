import React, { useState, useEffect } from 'react';
import { StyleSheet,
         View,
         Text,
         TextInput,
         Button,
         ActivityIndicator
        } from 'react-native';

import { ping } from '../utils/RaspberryAPI'
import { alertError } from '../utils/ErrorHelper'

export default function Connect({navigation}) {
    const [rasberryIp, setRaspberryIp] = useState("192.168.43.177");
    const [isLoading, setIsLoading] = useState(false);

    const onPressButton = () => {
        setIsLoading(true)
        ping(rasberryIp, callback);
    }

    function callback(value){
        setIsLoading(false)
        if (value==1){
            navigation.navigate('Scan', {ip: rasberryIp});
        }
        else alertError("Erreur de connexion","L'adresse " + rasberryIp + " est injoignable")
    }


    return(
        <View>
            <Text>IP du raspberry</Text>
            <TextInput value={rasberryIp} onChangeText={(rasberryIp) => setRaspberryIp(rasberryIp)}/>
            <Button title="Connexion" onPress={onPressButton}/>
            {isLoading && (
                <ActivityIndicator size="large" color="#00ff00"/>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
})