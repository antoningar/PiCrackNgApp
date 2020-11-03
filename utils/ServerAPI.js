const SERVER_URL = "http://51.210.4.4:8000/api/"

export function getNetworksRegistered(){
    const url = SERVER_URL + "networks/"
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        return json
    })
    .catch((error) => {
        console.log(error)
        throw error;
    })
}

export function bruteforceNetwork(bssid){
    const url = SERVER_URL + "networks/crack/" + bssid
    return fetch(url,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        return json
    })
    .catch((error) => {
        console.log(error)
        console.log(JSON.stringify(network))
        throw error
    })    
}