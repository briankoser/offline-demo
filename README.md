# offline-demo
Offline demo for a Lunch and Learn

## Credits
- Service worker based on Jeremy Keith's in Going Offline
- HTML and CSS based on https://github.com/alessandraburckhalter/90s-Website
- Images from Keith Coleman http://www.johnnycash1.com/index.htm
- With apologies to Willie Nelson

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
- Browser will cache service worker js file max of one day; if you have access to server, can tell it to never cache
- Chrome Dev Tools
    - Offline - turn off network connection
    - Update on reload - instead of restart
    - Bypass for network - load from network without running sw
    - Update - updates
    - Unregister - deletes
    - Stop - stops
- Events
    - Fetch - when browser requests a resource
    - Install - when service worker is first downloaded
- Fetch API
- Cache API
- Cache retained longer than HTTP cache
- Progressive web app: https, offline service worker, manifest file
    - "Install" on home page

## Presentation
- Introduction
- Live coding
    - https://fakebsod.com/windows-8-and-10/, Win + Ctrl + ->
    - python -m http.server 8000
    - Chrome Dev Tools
    - Life cycle loggers
- Full example
- Real-world use
    - PWAs

## Albums
Johnny Cache
Johnny Cache 2: Caching Fire (image: ring of fire)
Cache Me If You Can
Cache Me Outside How Bou Dat
The Man in Beige
Cache Money
Information Superhighway Man
Cache Reward
I Walk the Line Mode Browser
Cache or Check
Cache Cow
Cache A Falling Star And Put It In Your Pocket
Like the HTTP 308

