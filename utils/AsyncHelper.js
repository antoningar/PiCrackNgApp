import AsyncStorage from '@react-native-community/async-storage';
import { alertError } from '../utils/ErrorHelper'

export const storeHost = async (value) => {
    console.log(value)
    try {
        AsyncStorage.setItem('host', value)
    } catch (e) {
        console.log(e)
        alert("Erreur d'écriture Asyncstorage", e.message)
    }
}

export const getHost = async () => {
    console.log("get")
    try {
        AsyncStorage.getItem('host').then((value) => {return value})
    } catch(e) {
        console.log(e)
        alertError("Erreur de lecture Asyncstorage",e.message)
    }
  }