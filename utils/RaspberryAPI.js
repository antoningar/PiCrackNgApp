function timeout(ms, promise) {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error("timeout"))
        }, ms)
        promise.then(resolve, reject)
    })
}

function format(host, url) {
    return "http://" + host + ":5000/" + url
}

export function ping(host, callback){
    fetch(format(host, "ping/"),{
        method: 'GET'
    })
    .then((response) => {
        return response.text()
    })
    .then(value => {
        callback(value)
    })
    .catch((err) => {
        console.log(err.message)
        callback(err)
    })        
}

export function getNetworks(host){
    return timeout(20000,fetch(format(host, "networks/"),{
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
        console.log(host)
        //console.log(format(host, "networks/"))
        throw error;
    }))
}

export function scanDevices(host, network){
    host = format(host, "devices/")
    return timeout(50000,fetch(host,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(network)
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        return json
    })
    .catch((error) => {
        console.log(error)
        console.log(host)
        console.log(JSON.stringify(network))
        throw error
    }))        
}

export function dumpDevice(host, datas){
    host = format(host, "handshake/")
    console.log("DATAS")
    console.log(datas)
    return timeout(80000,fetch(host,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(datas)
    })
    .then((response) => {
        return response.json()
    })
    .then((json) => {
        return json
    })
    .catch((error) => {
        console.log(error.message)
        throw error
    }))        
}