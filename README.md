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

# Adding a custom domain name
- cloudfare to manage dns for domain name (connectify.icu) which we have purchased from hostinger
-  Change Nameservers to Cloudflare
- created a new record in cloudfare, pointing to our ec2 instance ip
-  Create a DNS record for connectify.icu
-  Create a A record for connectify.icu
-  Create a CNAME record for connectify.icu
- Configure Security & SSL
- Set the SSL mode to "Flexible"
- in SSL/TLS , in edge certificates turn on always use HTTPS , automatic HTTPS rewrites.

# Sending Emails via SES

 - Create a IAM user
 - GIve access to AmazonSESFullAccess 
 - Amazon SES: Create an Identity
 - Verify your domain name
 - Verify an email address
 - Install AWS SDK - v3 ses client (npm install @aws-sdk/client-ses)
 - Code Example https://github.com/awsdocs/aws-doc-sdk-examples/tree/main/javascriptv3/example_code/ses#code-examples
 - Setup SesClient
 - Access Credentials should be created in the IAM under Security Credentials Tab
 - Add the credentials to the env file
 - write the code for ses client
 - write code sending email address
 - make the email dynamic by passing more params to the run function.


 # env variables in backend, dotenv package
 - keeping secrets connection strings , api keys, etc. in a separate file
 - keeping port , etc. in a separate file
 - manage multiple environment variables

# Vercel Deployment
## fixed a hectic bug while deploying on Vercel
 - sameSite:None while adding token to cookie

# scheduling cron job
 - installing node-cron package
 - Learning about cron expressions syntax - crontab.guru
 - schedule a job
 - date-fns - date fns package (for date and time) 
 - find all the unique Id who have got connection Request in previous day
 - Send Email 
 - Explore queue mechanism to send bulk Emails
 - Amazon Ses Bulk emails
 - Make sendEmail function dynamic 
 - bee-queue & bull npm package for queue mechanism

# Razorpay Integration,payment gateway Integration

-  flow of how payment works :- 
      - User clicks on pay now button,order is created.
      - a call of create order goes to backend from frontend .
      - backend will now make a request to razorpay to create a order , it can only make a order beacuse it has secret key.
      - so backend makes a (create order + secret key) req along with secret key
      - razorpay will create the order and give back the order id.
      - now the order id is send back to frontend via backend.
      - frontend will open up a payment dialog box when it receives order id.
      - user will enter the card details or any other method net-banking,upi and will do the payment.
      - then razorpay will automatically tell the backend that the payment is success/failure with help of webhooks.
      - frontend makes a call to backend to check wether the payment is success or not.
      - backend will then return the results.
- ## creating premium features,when users will buy it he will get premium access.
- Sign Up on Razorpay and complete KYC
- Created a Ui for premium page
- Creating an API for create order in backend
- added my key and secret in env file
- initialized Razorpay in utils
- creating order on Razorpay
- created a schema for payment,created schema and model
- saved the order in payment collections
- made the api dynamic,not depdending on frontend to send the amount
- setup razorpay webhook on your live api
- dont test razorpay webhooks with local,how it will make call to local(instead you can use ngrok if you need to test in local).
- if anything happens razorpay will automatically tell you


# Building chat feature for our app, using Socket.io
- web sockets
- three points when explaining web sockets
- low latency,bi directional,event-based
- web sockets are bidirectional (client can send somthing to server,and server can send something to client)
- web sockets are event-based (server can send multiple events to client)

- build the UI a chat window on /chat/:targetId
- npm i socket.io
- two people connect to the backend server in the same room,whenever they send a message ,both of them will be able to see the messages.
- setup frontend socket.io-client
- Initialize the chat
- createSocketConnection
- listen to events
- improve the ui
- fix security bug - can i send message to a person who is not my friend ? - auth in web sockets
   - if im not friend is should not be able to chat with that person
  - non logged in user should not be able to chat

  