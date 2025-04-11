addEventListener('install', fetchEvent => {
    const request = fetchEvent.request;
    console.log('The service worker is installing');
    console.log(request);
});

addEventListener('activate', fetchEvent => {
    const request = fetchEvent.request;
    console.log('The service worker is activating');
    console.log(request);
});

addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    console.log('The service worker is listening');
    console.log(request);
});