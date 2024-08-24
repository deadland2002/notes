import React from 'react'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { GoogleLogin } from '@react-oauth/google'
import {useNavigate} from "react-router-dom";

const SignIn = () => {
  const CLIENT_ID = process.env.REACT_APP_OAUTH_CLIENT_TOKEN
  const navigate = useNavigate()

  return (
    <div className={`w-full h-screen flex flex-col`}>
      <div className={`flex h-full justify-between`}>
        <div className={`min-w-[250px] w-full flex justify-center items-center h-full`}>
          <div className={`flex flex-col gap-4 text-center`}>
            <div className={`text-4xl font-semibold text-gray-700`}>Sign In</div>
            <div className={`max-w-[200px] text-xs text-gray-500`}>
              Sign in with Google to begin or continue your journey
            </div>
            <div>
              <GoogleOAuthProvider clientId={CLIENT_ID ?? ''}>
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      document.cookie = `token=${credentialResponse.credential}`
                      navigate("/")
                    }}
                    onError={() => {
                      console.log('Login Failed')
                    }}
                />
              </GoogleOAuthProvider>
            </div>
          </div>
        </div>

        <div className={`h-full min-w-[60vw] hidden md:flex`}>
          <img src={"/signin-bg.jpeg"} className={`object-cover`} alt="SignIn"/>
        </div>
      </div>
    </div>
  )
}

export default SignIn
