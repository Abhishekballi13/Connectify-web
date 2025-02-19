# Connectify

- Create a Vite + React application.
- Installed tailwind css.- old version
- daisy ui
- added navbar,seperate file for it.
- take care of routing,as it can alter seo also.

- created the routes
- created child routes for body
- added outlet in body component
- added navbar and footer inside body component
- fixed the footer to bottom

- Body
    Navbar
    Route=/ => feed
    Route=/login => login
    Route=/connections => Connections
    Route=/profile => Profile


- creating login page
- install axios
- cors error making api call form x domain to y domain,cross origin,they are on different domain
- cors - install cors in backend => add middleware with configurations:origin,credentials:true
- setting withCredentials true in both frontend and backend
- whenever you are making api call so pass axios => withCredentials : true,if you dont do it you will not get the token back
- installing @reduxjs/toolkit and react-redux
- created/configured appStore,then provided in App.jsx by <Provider>
- created slice,exported reducer and actions and then added reducer to store.
- login to see if data coming properly to store
- refactor our code,to add constants file + create a componets folder.
- you should not be able to use other routes,if token is not present redirect user to login page.
- created a logout feature,deleted user from store when doing logout.
- created our profile and update section.
- created a toast feature ,when doing update in our profile
- creating connections page
- creating requests page
- accepting and rejecting connections
- add meta keywords and description for seo.

- added feed link in navbar
- created some awesome features of swipeableCards component and also created buttons if user wish to click and send request or accept/reject
- used framer motion for swiping cards.
- added background gradient from top to bottom on feed page to give a cool look.