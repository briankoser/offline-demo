# offline-demo
Offline demo for a Lunch and Learn

https://fakebsod.com/windows-8-and-10/, Win + Ctrl + ->

Going Offline by Jeremy Keith

Service Workers
- Like a cookie that can run JS
- No access to DOM
- Runs before request, so not run first visit: enhancement not requirement
- 2 restrictions: Same Origin, HTTPS
    - Also localhost for testing
    - HTTPS easy with sites like Netlify
- Can define multiple, but only one will run per page: the one with the longest path (service worker in a folder will override root for web pages in that folder) - or can explicitly scope to folder