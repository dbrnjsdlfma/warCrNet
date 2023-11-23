import React, {useEffect, useState} from "react";
import homeIcons from "../HomeIconsData";
import { Icon , Footer } from "../components"
import "../styles/Home.css"
import HelpMemo from '../components/HelpMemo'
import ScreenSaver from '../components/ScreenSaver'
import OptionModal from "../components/OptionModal";
import LoginModal from "../components/LoginModal";
import { useCookies } from 'react-cookie';
import axios from "axios";

function Home({setUserInfo, userInfo}){
    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    const loginToken = cookies.accessToken
    const [optionModalState , setOptionModalState] = useState(false) // OptionModal을 위한 state
    const [loginModalState, setLoginModalState] = useState(false); // 로그인 모달창 열림 상태 state

    // 메모 창 오픈 토글
    const [memoToggle, setMemoToggle] = useState(true);
    // 메모 창 토글 반전 함수
    const handleMemoToggle = () => {
        setMemoToggle(!memoToggle);
    }
    // 화면 보호기 스테이트 값
    const [screenSaverState, setScreenSaverState] = useState(false)
    // 화면 보호기 실행 함수
    useEffect( (e) => {
        document.addEventListener('mousemove', (e)=> {
            setScreenSaverState(false)
        })
        document.addEventListener('keydown', (e) => {
            setScreenSaverState(false)
        })
        const timer = setTimeout( () => {
            setScreenSaverState(true)
        } ,300000)
        return () => {
            clearTimeout(timer)
        }
    },[screenSaverState])

    useEffect ( () => {
        if(loginToken) {
            axios.get(`${process.env.REACT_APP_API_SERVAR_ADRESS}/api/upload`,{ withCredentials : true })
            .then(res => {
                // const data = res.data.data.data
                // const type = res.data.imageFileType
                // const blob = new Blob(data, {type : type} )
                // const url = URL.createObjectURL(blob)
                if(res.status === 200) {
                    const ImageData = res.data.ImageData
                    const Type = res.data.imageFileType
                    const home = document.querySelector('.Home')
                    home.style.backgroundImage = `url(data:${Type};base64,${ImageData})`
                    home.style.backgroundSize = 'cover'
                }
            })
            .catch(function(error) {       
            //   if(error.response) {
            //     alert(error.response.data.message)
            //   } else if(error.request) {
            //     alert(error.response.data.message)
            //   }
            })
        }
    },[loginToken])

    const optionModalStateChange = () => {
        setOptionModalState(!optionModalState)
      }
    const loginModalStateChange = () => {
    setLoginModalState(!loginModalState);
    }

    return(
        <>
            <div className="Home">
                <main>
                    {homeIcons.map((icon, id) => {
                        if(loginToken && icon.iconTitle === '로그인'){
                            icon.iconTitle = '로그아웃';
                            icon.iconSrc = 'images/logout.png';
                        }
                    return (
                        <Icon 
                        key={id} 
                        src={icon.iconSrc} 
                        href={icon.url} 
                        setUserInfo={setUserInfo} 
                        userInfo={userInfo} 
                        setOptionModalState={setOptionModalState}
                        setLoginModalState={setLoginModalState}
                        >{icon.iconTitle}</Icon>
                        ) 
                    })} 
                        {optionModalState &&
                        <OptionModal  state={optionModalState} userInfo={userInfo}
                        optionModalStateChange={optionModalStateChange}></OptionModal>
                        }
                        {loginModalState && <LoginModal loginModalStateChange={loginModalStateChange} setUserInfo={setUserInfo}
                        setLoginModalState={setLoginModalState}></LoginModal>}
                </main>
            </div>
            <HelpMemo memoToggle={memoToggle} handleMemoToggle={handleMemoToggle}/>
            <ScreenSaver state={screenSaverState}></ScreenSaver>
            <Footer handleMemoToggle={handleMemoToggle} memoToggle={memoToggle} userInfo={userInfo} setLoginModalState={setLoginModalState} setOptionModalState={setOptionModalState}></Footer>
        </>
    )
}

export default Home