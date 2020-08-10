import {Alert} from 'react-native';

export function alertError(title, msg){
    return Alert.alert(
        title,
        msg,
        [{
            text: "Retour",
            style: "Cancel"
        }],{
            cancelable: true
        }
    )
}