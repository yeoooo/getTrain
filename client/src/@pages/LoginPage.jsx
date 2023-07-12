import React from 'react'
import LoginCardWrapper from '../@components/login/loginCard';
import '../style/login.css'

function LoginPage(props){
    return(
        <>  
            <main className='main-bg'>
                <LoginCardWrapper />
            </main>

        </>
        
    );
}

export default LoginPage