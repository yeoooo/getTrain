import React from 'react'
import LoginCard from '../@components/login/loginCard';
import '../style/login.css'

function LoginPage(props){
    return(
        <>  
            <main className='main-bg'>
                <LoginCard />
            </main>

        </>
        
    );
}

export default LoginPage