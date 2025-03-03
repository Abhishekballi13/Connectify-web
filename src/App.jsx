import { BrowserRouter, Route,Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Premium from "./components/Premium";
import Chat from "./components/Chat";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <>
    <Provider store={appStore}>
    {/* all routing will work realtive to it (baasename="/") */}
    <BrowserRouter basename="/">
       <Routes>
          <Route path="/" element={<Body/>}>
              <Route path="/" element={<Feed/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/admin/login" element={<AdminLogin/>}/>
              <Route path="/admin/dashboard" element={<AdminDashboard/>}/>
              <Route path="/profile" element={<Profile/>}/>
              <Route path="/connections" element={<Connections/>}/>
              <Route path="/requests" element={<Requests/>}/>
              <Route path="/premium" element={<Premium/>}/>
              <Route path="/chat/:targetUserId" element={<Chat/>}/>
          </Route>
       </Routes>
    </BrowserRouter>
    </Provider>
    </>
  )
}

export default App;