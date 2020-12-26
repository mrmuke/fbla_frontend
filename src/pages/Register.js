import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useAuth } from "../auth";
import '../auth.css'
import UsersService from '../services/UsersService'

const  usersService  =  new  UsersService();
export default function Register(){
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
     const [password, setPassword] = useState("")
     const [loading, setLoading] = useState(false)
     const { authTokens, setAuthTokens } = useAuth();

     function registerUser(){
		setLoading(true)
		usersService.registerUser({"username":username,"email":email,"password":password})
		.then(result => {
				setAuthTokens(result.data);
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
            Register
                </span>

        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter username">
            <input className="input100" type="text" name="username" placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} />
            <span className="focus-input100"></span>
        </div>
        <div className="wrap-input100 validate-input m-b-16" data-validate="Please enter email">
            <input className="input100" type="email" name="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
            <span className="focus-input100"></span>
        </div>

        <div className="wrap-input100 validate-input m-b-23" data-validate="Please enter password">
            <input className="input100" type="password" name="pass" placeholder="Password"value={password} onChange={e=>setPassword(e.target.value)} />
            <span className="focus-input100"></span>
        </div>



        <div className="container-login100-form-btn">
            <button className="login100-form-btn" onClick={registerUser}>
                Sign up
                    </button>
        </div>

        <div className="flex-col-c p-t-170 p-b-40">
            <span className="txt1 p-b-9">
                Already have an account?
                    </span>

            <Link to="/login" className="txt3">
                Login in now
                    </Link>
        </div>

    </div></div></div></div>
}