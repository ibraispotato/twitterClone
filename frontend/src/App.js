import React,{useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import HomePage from "./page/homePage/homePage.jsx"
import SSignup from "./register/signup"
import Login from "./register/login"
import Profile from './thePorfilePages/profilePage/posts/profilePost/profile.jsx';
import RegisterPage from "./register/registerpage"
import { Hooksregisters } from "./hooks/hooksRegister/hooksregister"
import EditPRofile from "./thePorfilePages/profilePage/editProfile/editProfile.jsx"
import Settings from "./thePorfilePages/settings/settings.jsx"
import DeleteAcc from "./thePorfilePages/settings/deleteAccount.jsx"
import AccountIndo from "./thePorfilePages/settings/accountinfo/accountinfo.jsx"
import YourAccountInfo from "./thePorfilePages/settings/accountinfo/yorAccountInfo.jsx"
import UserNameInfo from "./thePorfilePages/settings/accountinfo/userName.jsx"
import EmailUserInfo from "./thePorfilePages/settings/accountinfo/email.jsx"
import Resetpassword from "./thePorfilePages/settings/accountinfo/resetpasswordmanually.jsx"
import Post from "./page/replies/replyQoute.jsx"
import Replying from "./page/replies/replying.jsx"
import Follwoing from "./thePorfilePages/profilePage/follow/followingPage.jsx"
import Followers from "./thePorfilePages/profilePage/follow/followersPage.jsx"
import InsideThePage from "./page/insideThePostPage/insideThePost.jsx"
import PostaCommentInAComment from "./page/insideThePostPage/postaCommentInAComment.jsx"
import ReplyAtComment from "./page/insideThePostPage/replyAtTheComment.jsx"
import Replies from "./thePorfilePages/profilePage/posts/repliesPost/replies.jsx"
import Likes from "./thePorfilePages/profilePage/posts/likesPosts/likes.jsx"
import Explore from "./page/homePage/explorePage.jsx"
import SearchPage from './page/homePage/searchPage.jsx';
import "./page/homePage/mobileRes.css"
import "./register/mobileResRegister.css"
import "./page/insideThePostPage/mobileResInsideThePost.css"
import "./thePorfilePages/mobileResProfile.css"
import "./thePorfilePages/settings/mobileResSettings.css"
import { SpeedInsights } from "@vercel/speed-insights/react"
function App() {
  const { user } = Hooksregisters()
  // const API = process.env.REACT_APP_APi
  // console.log(process.env.REACT_APP_APi_LINK)
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/explore' element={!user ? <RegisterPage /> : <Explore />} />
          <Route path='/' element={!user?<RegisterPage />:<HomePage ids={user?._id} />} />
          <Route path='/search/:searchName' element={!user?<RegisterPage />:<SearchPage />} />



          <Route path='/register' element={!user?<RegisterPage />: <Navigate to={"/"}/>} />
          <Route path='/login' element={!user?<Login />: <Navigate to={"/"}/>} />
          <Route path='/signup' element={!user?<SSignup />: <Navigate to={"/"}/>} />



          <Route path='/postRetweetCommet/:id/:idTextProfile' element={!user ? <RegisterPage /> : <PostaCommentInAComment />} />
          <Route path='/tweet/:id' element={!user ? <RegisterPage /> : <InsideThePage/>} />
          <Route path='/replying/:id/:idTextProfile' element={!user?<RegisterPage />:<Replying />} />
          <Route path='/replyingAtComment/:id/:idTextProfile' element={!user?<RegisterPage />:<ReplyAtComment />} />
          <Route path='/post/:id/:idTextProfile' element={!user? <RegisterPage /> : <Post />} />




          <Route path='/profile/:id' element={!user?<RegisterPage />:<Profile />} />
          <Route path='/replies/:id' element={!user?<RegisterPage />:<Replies />} />
          <Route path='/likes/:id' element={!user?<RegisterPage />:<Likes />} />
          <Route path='/following/:id' element={!user?<RegisterPage />:<Follwoing />} />
          <Route path='/followers/:id' element={!user?<RegisterPage />:<Followers />} />
          <Route path='/editProfile/:id' element={!user?<RegisterPage />:<EditPRofile />} />
          <Route path='/settings/account' element={!user?<RegisterPage />:<Settings />} />
          <Route path='/settings/delete-account' element={!user?<RegisterPage />:<DeleteAcc />} />
          <Route path='/settings/account-information' element={!user?<RegisterPage />:<AccountIndo />} />
          <Route path='/your-account-information/account' element={!user?<RegisterPage />:<YourAccountInfo />} />
          <Route path='/settings/user_name' element={!user?<RegisterPage />:<UserNameInfo />} />
          <Route path='/settings/email_user' element={!user?<RegisterPage />:<EmailUserInfo />} />
          <Route path='/settings/Change-password' element={!user?<RegisterPage />:<Resetpassword />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
