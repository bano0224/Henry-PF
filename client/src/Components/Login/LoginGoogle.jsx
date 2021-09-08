import React from 'react';
import GoogleLogin from 'react-google-login';

function LoginGoogle() {

    const responseGoogle = (response) => {
        console.log(response);
      }
      
    return (
    <div>
        <GoogleLogin
    clientId=""
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  />,

 
    </div>
  )
}

export default LoginGoogle;