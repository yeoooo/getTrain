import React from 'react'
import '../../style/login.css'

function LoginCard(props){
    return(
        <article className='login-box'>
            <header className='logo-img'>
                <img src='../../src/assets/logo.png' alt='logo image' />
            </header>
            

            <div className='tab-menu'>
                <a href='#'>멤버십번호 로그인</a>
                <a href='#'>이메일 로그인</a>
                <a href='#'>휴대번호 로그인</a>
            </div>

            <form action='#' method='get' className='login-input'>
                <div>
                    <img src='../../src/assets/Phone-icon.png' alt='Phone icon'/>
                    <input type='number' name='phone' placeholder='번호를 입력해주세요'/>
                </div>
                
                <div>
                    <img src='../../src/assets/Lock-icon.png' alt='Lock icon'/>
                    <input type='password' name='password' placeholder='비밀번호를 입력해주세요'/>
                </div>
                
                <button type='submit'>LOGIN</button>
            </form>
        </article> 
    );
}

export default LoginCard