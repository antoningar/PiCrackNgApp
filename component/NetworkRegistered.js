import React, { useState, useEffect } from 'react';
import { StyleSheet, 
    Text,
    View,
    TouchableWithoutFeedback,
    FlatList,
    Alert } from 'react-native';

import { bruteforceNetwork } from '../utils/ServerAPI'

export default function NetworksRegistered({route, navigation}){
    const networks = route.params.networks

    const onItemPressed = (item) => {
        Alert.alert(
            item['item'].essid,
            "Bruteforce " + item['item'].essid + " ?",
            [{
                text: "Retour",
                style: "Cancel"
            },{
                text: "Oui",
                onPress: () =>{
                    bruteforceNetwork(item['item'].bssid).then( (data) => {
                        if (data == "Our server is already busy"){
                            Alert.alert("Sorry", "server busy",
                            [{ 
                                text: "Retour",
                                style: "Cancel"
                            }])
                        }
                    })
                }
            }]
        )
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={networks}
                renderItem={({item}) =>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                            <Text style={styles.network}>{item.essid}</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                            <Text style={styles.network}>{item.status}</Text>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => onItemPressed({item})}>
                            <Text style={styles.network}>{item.password}</Text>
                        </TouchableWithoutFeedback>
                    </View>
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