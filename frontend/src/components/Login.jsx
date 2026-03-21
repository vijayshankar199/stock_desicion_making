import React from "react";
import "../style/Login.css"
import { useNavigate } from "react-router-dom";

export function Login() {
    let nav=useNavigate()

    const login = () => {
        nav("/home")
        
    };

    return (
        <div className="login-container">
            <div className="login-card">

                <h2>Login</h2>

                <label>
                    Enter Mobile Number
                    <input
                        type="text"
                        placeholder="Enter the mobile number"
                    />
                </label>

                <label>
                    Enter Password
                    <input
                        type="password"
                        placeholder="Enter the password"
                    />
                </label>

                <button onClick={login}>Login</button>

            </div>
        </div>
    );
}