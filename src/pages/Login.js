import { Link } from "react-router-dom";
import '../auth.css'
import UsersService from '../services/UsersService'
import { useAuth } from "../auth";
import { Redirect } from 'react-router-dom';
import { useState } from "react";
const usersService = new UsersService()
export default function Login(){
    const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)
	const { authTokens, setAuthTokens } = useAuth();
	
	function loginUser(){
		setLoading(true)
		usersService.loginUser({"username":username,"password":password})
		.then(result => {
				setAuthTokens(result.data);
				setLoading(false)
		}).catch(e=>{

				setLoading(false)
		})
	
	
	
}
if(authTokens){
	return <Redirect to="/dashboard"/>
}
return <div className="limiter">
<div className="container-login100">
    <div className="wrap-login100">
        <div className="login100-form validate-form p-l-55 p-r-55 p-t-178">

        <span className="login100-form-title">
            Sign In
                </span>

        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
            <input className="input100" type="text" name="username" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Please enter password" value={password} onChange={e=>setPassword(e.target.value)}>
            <input className="input100" type="password" name="pass" placeholder="Password" />
            <span className="focus-input100"></span>
        </div>

        <div className="text-right p-t-13 p-b-23">
            <span>
                Forgot </span>

            <a href="#" className="txt2">
                Username / Password?
                    </a>
        </div>

        <div className="container-login100-form-btn">
            <button className="login100-form-btn"  onClick={loginUser}>
                Sign in
                    </button>
        </div>

        <div className="flex-col-c p-t-170 p-b-40">
            <span className="txt1 p-b-9">
                Don’t have an account?
                    </span>

            <Link to="/signup" className="txt3">
                Sign up now
                    </Link>
        </div>

    </div></div></div></div>
}