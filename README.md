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

- Deployment

- finally deploying our application,on aws ec2 instance
- created a t2 micro instance
- created key pair and stored in secret.pem
- Run this command, if necessary, to ensure your key is not publicly viewable.
   chmod 400 "connectify-secret.pem"
- ssh -i "connectify-secret.pem" ubuntu@ec2-3-95-10-76.compute-1.amazonaws.com ,connect using this command in powershell
- installed node along with npm
- cloned our backend and frontend repo
- install dependencies in your projects
- when deploying for production we need build file
- npm run build - it bundles your project and makes dist folder ,in which it will compile the code
- sudo apt update
- sudo apt install nginx (it gives you an http server)
- sudo systemctl start nginx 
- sudo systemctl enable nginx
- Copy code from dist(build files) to/var/www/html
   sudo scp -r dist/* /var/www/html , 
   - sudo gives root permission,
   - scp means copy, 
   - -r flag means recursilvely for all files and folders there inside it
   - dist/* where our build file is there,* means all the file
   - /var/www/html,where we have to copy it
   - so basically in scp  fromwhere we have to copy ___ to where we have to copy
   - enable port 80 of your instance

- modified the base_url in constants.js to /api