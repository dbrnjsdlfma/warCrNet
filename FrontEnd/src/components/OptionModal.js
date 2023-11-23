import React, { useEffect, useState} from "react";
import "../styles/OptionModal.css"
import axios from "axios";

function OptionModal({state, optionModalStateChange, userInfo}) {
    const [fileName, setFileName] = useState('')
    const [fileURL, setFileURL] = useState('')
    const [uploadFile , setUploadFile] = useState()
    console.log(userInfo)
    const fileUpload = (e) => { // 배경화면 바꿀 파일 업로드 함수
          const file = e.target.files[0]
          console.log(file)
          if(file) {
            setUploadFile(file)
            const fileSrc = URL.createObjectURL(file)
            setFileURL(fileSrc)
          }
    }
    const backgroundApply = () => { // 업로드된 파일로 배경화면 바꾸기 함수
        const home = document.querySelector('.Home')
        console.log(fileURL)
        home.style.background = `url(${fileURL})`
        home.style.backgroundSize = 'cover'
    }
    const successBackgroundApply = (e) => {
        backgroundApply()
        optionModalStateChange()
    }
    const upload = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('img' , e.target[0].files[0])
        await axios.put('http://127.0.0.1:5300/api/upload' , formData ,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            } ,
            withCredentials : true ,
        }) .then(res => {
            console.log(res)
            backgroundApply()
        }) .catch(function(err) {
            console.log(err)
        })
    }
    return (
        <>
            <div className={`modal ${state ? 'open' : 'close'}`}>
                <div className="modal-container">
                    <div className="modal-title">
                        <span>바탕 화면 설정</span>
                        <button className='modalClose-btn' onClick={optionModalStateChange}>X</button>
                    </div>
                    <form encType='multipart/form-data' onSubmit={upload}>
                        <div className="modal-body">
                            {fileURL !== '' &&
                            <img src={fileURL} alt="Blob URL Image"/>}
                                <input type='file' name="img" id="upload"
                                accept="image/*" onChange={fileUpload}></input>
                            {/* <form action="upload" method="post">
                            </form> */}
                        </div>
                        <div className="modal-footer">
                            <button type='button' className="modalSuccess-btn" onClick={successBackgroundApply}>확인</button>
                            <button type='button' className="modalfail-btn" onClick={optionModalStateChange}>취소</button>
                            {userInfo.name === 'guest' ? null : <button type='submit' className="modalApply-btn">적용</button>}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default OptionModal