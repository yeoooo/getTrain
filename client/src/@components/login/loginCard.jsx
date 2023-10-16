import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../style/login.css'
import { styled } from 'styled-components';

function LoginCard(){
    // 배포 시 서버 도메인으로 변경되어야 함
    const apiURL = 'http://localhost:8080/api/v1/login'

    const [type, setType] = useState('');
    const [id, setId] = useState('');
    const [pw, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [phoneNum1, setPhoneNum1] = useState('');
    const [phoneNum2, setPhoneNum2] = useState('');
    let phoneNum = '';

    // 로그인 타입
    const handleTypeChange = (event) => {
        setType(event);
    }

    // ID
    const handleIdChange = (event) => {
        setId(event.target.value);
    }

    const handlePhoneNumber1Change = (event) =>{
        setPhoneNum1(event.target.value)
    }

    const handlePhoneNumber2Change = (event) =>{
        setPhoneNum2(event.target.value)
    }

    // 비밀번호
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    // 알림 이메일
    const handleNoticeEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handleLogIn = async (event) => {
        event.preventDefault();
        
        try {
            console.log(id, type, pw, email);
            const response = await fetch(apiURL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    data: {
                        user: {
                            type: type,
                            id: id,
                            pw: pw,
                            email: email
                        }
                    }
                }),            
            });

            if (response.status === 200) {
                sessionStorage.setItem("email", email);
                window.alert("로그인이 되었습니다!"); 
                navigate('/search');  

            } else if (response.status === 404) {
                window.alert("등록되어 있지 않은 아이디 및 비밀번호입니다 :(");
            } else {
                window.alert("로그인 실패");
            }

        } catch(error) {
            console.log(error.message);
        }
    }
    return(
        <LoginInputWrapper className='login-box'>
            <LogoWrapper className='logo-img'>
                <img src='../../src/assets/logo.png' alt='logo image' />
            </LogoWrapper>
            

            <TabMenuWrapper className='tab-menu'>
                <a href='#' onClick={() => handleTypeChange('MEMBERSHIP_LOGIN')}>멤버십번호 로그인</a>
                <a href='#' onClick={() => handleTypeChange('EMAIL_LOGIN')}>이메일 로그인</a>
                <a href='#' onClick={() => handleTypeChange('PHONE_NUMBER_LOGIN')}>휴대번호 로그인</a>
            </TabMenuWrapper>

            <form onSubmit={handleLogIn} className='login-input'>
                <LoginInputBox>
                    {type === 'MEMBERSHIP_LOGIN' && (
                        <>
                            <MemberIcon src='../../src/assets/member.png' alt='Membership icon' width={15} height={15}/>
                            <MemberLoginInput 
                                type='text' 
                                name='membership' 
                                placeholder='멤버십 번호를 입력해주세요'
                                value={id}
                                required
                                onChange={handleIdChange} />
                        </>
                    )}
                    {type === 'EMAIL_LOGIN' && (
                        <>
                            <EmailIcon src='../../src/assets/email.png' alt='Email icon' />
                            <EmailLoginInput 
                                type='email' 
                                name='email' 
                                placeholder='이메일을 입력해주세요'
                                value={id}
                                required
                                onChange={handleIdChange} />
                        </>
                    )}
                    {type === 'PHONE_NUMBER_LOGIN' && (
                        <>
                            <PhoneIcon src='../../src/assets/Phone-icon.png' alt='Phone icon'/>
                            <PhoneLoginInput1
                                type='tel'
                                name='phone' 
                                placeholder='앞 3.'
                                value='010'
                                required
                                // onChange={handlePhoneNumberChange}
                                maxlength={3}
                                />
                            <PhoneLoginInput2
                              type='tel'
                              name='phone'
                              placeholder='앞 3자.'
                              value={phoneNum1}
                              required
                              onChange={handlePhoneNumber1Change}
                              maxlength={4}/>
                            <PhoneLoginInput3
                              type='tel'
                              name='phone'
                              placeholder='앞 3자리.'
                              value={phoneNum2}
                              required
                              onChange={handlePhoneNumber2Change}
                              maxlength={4}/>
                        </>
                    )}
                    {type === '' && (
                        <>
                            <PhoneIcon src='../../src/assets/Phone-icon.png' alt='Phone icon' />
                            <LoginInput 
                                type='number' 
                                name='phone' 
                                placeholder='번호를 입력해주세요'
                                value={id}
                                required
                                onChange={handleIdChange} />
                        </>
                    )}
                </LoginInputBox>
                
                <div>
                    <img src='../../src/assets/Lock-icon.png' alt='Lock icon' width={30} height={30}/>
                    <LoginInput 
                        type='password' 
                        name='password' 
                        placeholder='비밀번호를 입력해주세요'
                        value={pw}
                        required
                        onChange={handlePasswordChange}/>
                </div>

                <div>
                    <NoticeEmailIcon src='../../src/assets/notice-email.png' alt='Lock icon'/>
                    <NoticeEmailInput 
                        type='email' 
                        name='email' 
                        placeholder='알림을 받으실 이메일을 입력해주세요'
                        value={email}
                        required
                        onChange={handleNoticeEmailChange}/>
                </div>
                
                <LoginButton 
                    type='submit'
                    disabled={!(id && pw)}> 
                LOGIN</LoginButton>
            </form>
        </LoginInputWrapper> 
    );
}

const LoginInputWrapper = styled.div``

const LogoWrapper = styled.div``

const TabMenuWrapper = styled.div`
    a:hover{
        color: #315A52;
        font-weight: 700;
    }
`

const LoginInputBox = styled.div``

const MemberIcon = styled.img`
    width: 21px;
    height: 22px;
    padding: 0 0 2px 4px;   
`

const EmailIcon = styled.img`
    width: 23px;
    height: 24px;
    padding: 0 0 6px 4px;   
    margin: 5px 0 0 0;
`

const PhoneIcon = styled.img`
    width: 30px;
    height: 30px;
    padding: 0 0 2px 3px;   
`

const NoticeEmailIcon  = styled.img`
    width: 23px;
    height: 21px;
    padding: 0 0 2px 3px;  
    margin: 5px 0 0 3px;
`

const LoginInput = styled.input`
    padding: 0 0 0.5rem 2rem;
`

const PhoneLoginInput1 = styled.input`
    width: 1px;
    padding: 0 0 0.5rem 2rem;
`
const PhoneLoginInput2 = styled.input`
    width: 1px;
    padding: 0 0 0.5rem 2rem;
`
const PhoneLoginInput3 = styled.input`
    width: 1px;
    padding: 0 0 0.5rem 2rem;
`

const MemberLoginInput = styled.input`
    padding: 0 0 0.5rem 2.8rem;
`

const EmailLoginInput = styled.input`
    padding: 0 0 0.5rem 2.5rem;
`

const NoticeEmailInput = styled.input`
    padding: 0 0 0.5rem 2.5rem;
`

const LoginButton = styled.button`
    background-color: #315A52;
    padding: 1rem 2rem;
    margin: 5rem 0 0 0;
    color: #FFFFFF;
    font-size: 1.3rem;

    transition: transform 0.1s;

    &:hover{
        background-color: #3d6f65;
        transform: scale(1.03);
    }
`
export default LoginCard