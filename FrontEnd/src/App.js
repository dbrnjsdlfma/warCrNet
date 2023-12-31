import React, {useState, useEffect} from 'react';
import './App.css';
import { useCookies } from 'react-cookie';
import {Routes, Route} from "react-router-dom"
import { Home, Play, Work, Food, News, BackHome, Lounge, Register, Modify, SuikaGame} from './pages'

function App() {
    const [userInfo, setUserInfo] = useState({ name: 'guest', keyword : '', address : '대전광역시 서구 둔산동'})
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const isLoginCheck = async() => {
      await fetch(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/user/isLogin`, {
        method: 'GET',
        headers: { 
        'Content-Type': 'application/json',
        },
        credentials : 'include'
      })
      .then(res => res.json())
      .then((res) => {
        if(res.code === 200){
          setUserInfo({ name: res.name , keyword : res.keyword, address : res.address})
        }
      })
    }
    useEffect( () => {
      if(cookies.accessToken !== undefined) {
        isLoginCheck()
      }
     }, [])
     

  return (
    <div className="App">
      <Routes>
         <Route exact path='/' element={<Home  setUserInfo={setUserInfo} userInfo={userInfo}/>} />
         <Route exact path='/play' element={<Play userInfo={userInfo}/>} />
         <Route exact path='/work' element={<Work userInfo={userInfo}/>} />
         <Route exact path='/food' element={<Food userInfo={userInfo}/>} />
         <Route exact path='/news' element={<News userInfo={userInfo}/>} />
         <Route exact path='/BackHome' element={<BackHome userInfo={userInfo}/>} />
         <Route exact path='/lounge' element={<Lounge userInfo={userInfo}/>} />
         <Route exact path='/suikaGame' element={<SuikaGame userInfo={userInfo}/>} />
         <Route exact path='/register' element={<Register />} />
         <Route exact path='/modify' element={<Modify setUserInfo={setUserInfo} userInfo={userInfo}/>} />
         <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;
