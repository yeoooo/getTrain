import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../../style/login.css'
import { styled } from 'styled-components';

function LoginCard(props){
    const [type, setType] = useState('');
    const [id, setID] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // 로그인 타입
    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    // ID
    const handleIdChange = (event) => {
        setID(event.target.value);
    }

    // 비밀번호
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogIn = async (event) => {
        event.preventDefault();
        
        try {
            const response = await fetch('/api/v1/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type, id, password }),
            });

            if (response.status === 200) {
                // 추후 추가 코드 작성 예정

                window.alert("로그인이 되었습니다!"); 

                navigate('/search');              
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
                <a href='#'>멤버십번호 로그인</a>
                <a href='#'>이메일 로그인</a>
                <a href='#'>휴대번호 로그인</a>
            </TabMenuWrapper>

            <form onSubmit={handleLogIn} className='login-input'>
                <div>
                    <img src='../../src/assets/Phone-icon.png' alt='Phone icon'/>
                    <input 
                        type='number' 
                        name='phone' 
                        placeholder='번호를 입력해주세요'
                        value={id}
                        required
                        onChange={handleIdChange}/>
                </div>
                
                <div>
                    <img src='../../src/assets/Lock-icon.png' alt='Lock icon'/>
                    <input 
                        type='password' 
                        name='password' 
                        placeholder='비밀번호를 입력해주세요'
                        value={password}
                        required
                        onChange={handlePasswordChange}/>
                </div>
                
                <button 
                    type='submit'
                    disabled={!(id && password)}> 
                LOGIN</button>
            </form>
        </LoginInputWrapper> 
    );
}

const LoginInputWrapper = styled.div``

const LogoWrapper = styled.div``

const TabMenuWrapper = styled.div``

export default LoginCard