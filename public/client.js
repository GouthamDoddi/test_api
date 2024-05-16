
const publicKey = 'BE_5yXbjd63U-09H0DSuChtRcd1uiCt2HwQXqLpHnUrBd7E9SkxE5wMSdv3rRnpO2imszjzHbrcgJUTOZhzP_8c'

//register serice worker, register push, send push notification


const urlBase64ToUnit8Array =  base64String => {

    const padding = '='.repeat((4 - base64String.length % 4) % 4);

    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/\_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}


const send = async () => {
    console.log('registering service worker');

    const register = await navigator.serviceWorker.register('/worker.js', {
       // nspecify which url the worker should register on
        scope: '/'

    })
    console.log('Registered service worker..')

    // register push
    console.log(`Registering push ...`);

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUnit8Array(publicKey)
    });

    console.log('Push registered');

    // Send Push notification

    console.log('sending push')

    await fetch("/subscribe", {
        method: "POST",
        body: JSON.stringify(subscription),
        headers: {
          "content-type": "application/json"
        }
      });
    console.log('Push sent');
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
    
    var urlencoded = new URLSearchParams();
    urlencoded.append("userId", "jannelreid@gmail.com");
    urlencoded.append("fromUserId", "avenkat@gmail.com");
    urlencoded.append("description", "Teach me your profound insights.");
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    fetch("http://34:68:55:94:8080/counsellor/update_event_status", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

// check for service worker in current browser
if ('serviceWorker' in navigator) {
    console.log('sending')
    send().catch(err => console.error(err))
}else {
    console.log('No service worker');
}
