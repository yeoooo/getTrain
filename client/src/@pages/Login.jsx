import React from 'react'
import { styled } from 'styled-components'
import { useEffect } from 'react';
import { GlobalStyle } from '../style/globalStyle';
import {theme} from "../style/theme";
import '../style/login.css'

function Login(props){
    return(
        <div className='main-bg'>
            <div className='loginBox'>
                <h1>GetTrain</h1>

                <div className='tab-menu'>
                    <a href='#'>멤버십번호 로그인</a>
                    <a href='#'>이메일 로그인</a>
                    <a href='#'>휴대번호 로그인</a>
                </div>

                <form action='#' method='get' className='login-input'>
                    <div>
                        <img src='../assets/Phone-icon.png' alt='Phone icon'/>
                        <input type='number' name='phone' placeholder='번호를 입력해주세요'/>
                    </div>
                    
                    <div>
                        <img src='../assets/Lock-icon.png' alt='Lock icon'/>
                        <input type='password' name='password' placeholder='비밀번호를 입력해주세요'/>
                    </div>
                    
                    <button type='sumbit'>LOGIN</button>
                </form>
                
            </div> 
        </div>

        

    );
}

export default Login