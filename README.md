# offline-demo
Offline demo for a Lunch and Learn

## Going Offline by Jeremy Keith

Service Workers
- Like a cookie that can run JS
- No access to DOM
- Runs before request, so not run first visit: enhancement not requirement
- 2 restrictions: Same Origin, HTTPS
    - Also localhost for testing
    - HTTPS easy with sites like Netlify
- Can define multiple, but only one will run per page: the one with the longest path (service worker in a folder will override root for web pages in that folder) - or can explicitly scope to folder
- Life cycle is: Download, Install, Wait (for browser restart if other service worker already running), Activate
- Hard refresh bypasses the service worker
- Chrome Dev Tools
    - Offline - turn off network connection
    - Update on reload - instead of restart
    - Bypass for network - load from network without running sw
    - Update - updates
    - Unregister - deletes
    - Stop - stops
- Fetch API
- Cache API

## Presentation
- Introduction
- Live coding
    - https://fakebsod.com/windows-8-and-10/, Win + Ctrl + ->
    - python -m http.server 8000
    - Chrome Dev Tools
    - Life cycle loggers

## Puns
Cache as cache can
Cache me ouside how bou dat
Cache me if you can
Cache money
Cache or check
Cache reward
Cache a falling star and put it in your pocket
Cache fire
Johnny Cache
Cache cow