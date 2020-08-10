import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Text,
         View,
         TouchableWithoutFeedback,
         FlatList,
         Alert } from 'react-native';

import { scanDevices } from '../utils/RaspberryAPI'
import { alertError } from '../utils/ErrorHelper';


export default function Network({ route, navigation }) {
    const { networks } = route.params 
    const { ip } = route.params 
    const [isLoading, setIsLoading] = useState(false)

    const onItemPressed = (item) => {
        Alert.alert(
            item['item'].essid,
            "Scaner " + item['item'].essid + " ?",
            [{
                text: "Retour",
                style: "Cancel"
            },{
                text: "Oui",
                onPress: () => scan(item['item'])
            }]
        )
    }

    function scan(network){
        setIsLoading(true)
        console.log(network)
        scanDevices(ip,network.bssid)
            .then((data) => {
                setIsLoading(false)
                navigation.navigate("Devices",{
                    devices: data,
                    ip: ip
                })
            })
            .catch((error) => {
                alertError("Erreur", error.message)
                setIsLoading(false);
            })
    }



    return(
        <View style={styles.container}>
            <FlatList
                data={networks}
                renderItem={({item}) =>
                    <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                        <Text style={styles.network}>{item.essid}</Text>
                    </TouchableWithoutFeedback>
                }
                keyExtractor={(item, index) => item.bssid.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
      },
      network: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      
})