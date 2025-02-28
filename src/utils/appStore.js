import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./feedSlice";
import connectionReducer from "./connectionSlice"
import requestReducer from "./requestSlice";
import onlineStatusReducer from "./onlineStatusSlice";

const appStore = configureStore({
  reducer:{
    user:userReducer,
    feed:feedReducer,
    connections:connectionReducer,
    requests:requestReducer,
    onlineStatus:onlineStatusReducer,
  }
})

export default appStore;