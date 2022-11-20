import React, { useState } from "react"
import "./login.css"
import axios from "axios"
import { useHistory } from "react-router-dom"

const Login = ({ setLoginUser }) => {

    const history = useHistory()
    //asd
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }
    const login = () => {
        axios.post("http://localhost:9002/login", user)
            .then(res => {
                //alert(res.data.message)
                setLoginUser(res.data.user)
                if(res.data.message === "Teacher")
                {
                    history.push("/teacherPortal")
                }
                else if (res.data.message === "Mentor")
                {
                    history.push("/mentorPortal")
                }
                else if (res.data.message === "Photography Head")
                {
                    history.push("/photographyPortal")
                }
                else if(res.data.message === "GeneralBody")
                {
                    history.push("/GeneralPortal")
                }
                else{
                    history.push("/studentPortal")
                }
            })
    }

    return (
        <div className="login">
            {/* //{console.log(user)} */}
            <h1>Login</h1>
            <input type="text" name="email" value={user.email} onChange={handleChange} placeholder="en your Email"></input>
            <input type="password" name="password" value={user.password} onChange={handleChange} placeholder="Enter your Password" ></input>
            <div className="button" onClick={login} >Login</div>
            <div>or</div>
            <div className="button" onClick={() => history.push("/register")}>Register</div>
        </div>
    )
}

export default Login