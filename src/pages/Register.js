import '../styles/Register.css';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import daejeonRegionData from '../DaejeonRegionData';

function Register(){
  // 회원가입 할 유저의 정보 스테이트
  const [inputRegisterData, setInputRegisterData] = useState({
    userId : '',
    userEmail : 'gmail.com',
    userPassword : '',
    CheckingUserPassword : '',
    userName : '',
    userKeyword : '',
    userAddress : ['동구','중앙동']
  });

  const [errorInputData, setErrorInputData] = useState({
    err : null,
    message : ''
  });

  const changeRegisterData = (event) => {
    const { name } = event.target;
    setErrorInputData({ err : null , message : ''});
    setInputRegisterData({ ...inputRegisterData, [name] : event.target.value.trim() });
  }

  const handleRegister = (event) => {
    event.preventDefault();

    if(!inputRegisterData.userId.trim()
      || !inputRegisterData.userPassword.trim()
      || !inputRegisterData.CheckingUserPassword.trim()
      || !inputRegisterData.userName.trim()){
        setErrorInputData({ err : 'emptyData', message : '필수입력 사항을 입력해 주세요!'});
    } else if (inputRegisterData.userPassword.trim() !== inputRegisterData.CheckingUserPassword.trim() ){
      setErrorInputData({ err : 'passwordMatching', message : '비밀번호가 다릅니다.'});
      return ;
    } else {
        fetch('http://127.0.0.1:5300/user/register', {
          method : 'POST',
          headers : {
            'Content-Type' : 'application/json'
          },
          body : JSON.stringify({
            userId : inputRegisterData.userId.trim() + '@' + inputRegisterData.userEmail,
            password : inputRegisterData.userPassword.trim(),
            name : inputRegisterData.userName.trim(),
            keyword : inputRegisterData.userKeyword.trim(),
            address : '대전광역시' + ' ' + inputRegisterData.userAddress[0] + ' ' + inputRegisterData.userAddress[1]
          })
        })
        .catch(e => console.log(e))
        .then((res) => {
          console.log(res.ok)
          if(res?.ok){
            alert('회원가입이 완료되었습니다!')
            setInputRegisterData({
              userId : '',
              userPassword : '',
              CheckingUserPassword : '',
              userName : '',
              userKeyword : '',
              userAddress : ''
            })
            moveToHomePage();
          }
        })
      }
  }

  const navigate = useNavigate();
  const moveToHomePage = () => {
    navigate('/');
  }
  return (
    <div className="Register-container">
      <div className="Register-header">
        <h5>회원가입</h5>
        <div className='Register-button-container'>
          <button onClick={moveToHomePage}>X</button>
        </div>
      </div>
      <div className='Register-form-container'>
        <form>
          <label><span>*emali : </span><input type='text' name='userId' onChange={changeRegisterData} value={inputRegisterData.userId}/>
          <select onChange={(e) => {setInputRegisterData({...inputRegisterData, userEmail : e.target.value})}}>
            <option value='gmail.com'>gmail.com</option>
            <option value='naver.com'>naver.com</option>
            <option value='daum.net'>daum.net</option>
          </select>
          </label>
          <label><span>*password : </span><input type='password' name='userPassword' onChange={changeRegisterData} value={inputRegisterData.userPassword}/></label>
          <label><span>*password 확인 : </span><input type='password' name='CheckingUserPassword' onChange={changeRegisterData} value={inputRegisterData.CheckingUserPassword}/></label>
          {errorInputData.err === 'passwordMatching' && <span style={{color:'red'}}>{errorInputData.message}</span>}
          <label><span>*name : </span><input type='text' name='userName' onChange={changeRegisterData} value={inputRegisterData.userName}/></label>
          <label><span>관심 키워드 : </span><input type='text' maxLength='15' name='userKeyword' onChange={changeRegisterData} value={inputRegisterData.userKeyword}/></label>
          <label><span>직장 주소 : </span>
            <select onChange={(e) => {setInputRegisterData({...inputRegisterData, userAddress : [e.target.value,'']})}}>
              <option value='동구'>동구</option>
              <option value='서구'>서구</option>
              <option value='중구'>중구</option>
              <option value='유성구'>유성구</option>
              <option value='대덕구'>대덕구</option>
            </select>
            <select onChange={(e) => {setInputRegisterData({...inputRegisterData, userAddress : [inputRegisterData.userAddress[0], e.target.value] })}}>
              {daejeonRegionData[`${inputRegisterData.userAddress[0]}`].map(d => {
                return <option key={d} value={d}>{d}</option>
              })}
            </select>
          </label>
          {errorInputData.err === 'emptyData' && <span style={{color:'red'}}>{errorInputData.message}</span>}
          <button onClick={handleRegister}>가입하기</button>
        </form>
      </div>
    </div>
  )
}

export default Register;