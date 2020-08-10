import React, { useState, useEffect } from 'react';
import { StyleSheet, 
         Text,
         View,
         TouchableWithoutFeedback,
         FlatList,
         Alert } from 'react-native';

import { dumpDevice } from '../utils/RaspberryAPI'
import { alertError } from '../utils/ErrorHelper';


export default function Devices({ route, navigation }) {
    const {devices} = route.params;
    const {ip} = route.params; 
    const [isLoading, setIsLoading] = useState(false);

    const onItemPressed = (item) => {
        Alert.alert(
            item['item'].mac,
            "Dump " + item['item'].mac + " ?",
            [{
                text: "Retour",
                style: "Cancel"
            },{
                text: "Oui",
                onPress: () => dump(item['item'])
            }]
        )
    }

    function dump(device){
        setIsLoading(true)
        console.log(device)
        dumpDevice(ip,device.mac)
            .then((data) => {
                setIsLoading(false)
                console.log(data)
                if (data == "1"){
                    Alert.alert("gg", "bg",
                    [{ 
                        text: "Retour",
                        style: "Cancel"
                    }])
                }
            })
            .catch((error) => {
                alertError("Erreur", error.message)
                setIsLoading(false);
            })
    }



    return(
        <View style={styles.container}>
            <FlatList
                data={devices}
                renderItem={({item}) =>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                            <Text style={styles.device}>{item.manuf}</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                            <Text style={styles.device}>{item.mac}</Text>
                        </TouchableWithoutFeedback>
                    </View>
                }
                keyExtractor={(item, index) => item.mac.toString()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
      },
      device: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
      
})