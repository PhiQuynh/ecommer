import {useState} from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';
const Login = () => {
    const data = {
        email:"",
        password:"",
    }
    //user.email = ""
    //user.password = ""
    const [user,setUser] = useState(data);
    const onChangeInput = (e) => {
        const {name,value}=e.target;
        setUser({...user,[name]:value})
        //setUser,user chỉ thay đổi
    };
    const loginSubmit=async(e) => {
        e.preventDefault(); //xóa quay tròn
        try {
            await axios.post("/user/login",{...user});
            localStorage.setItem("firstLogin",true);
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    };
    return (
        <div className="user">
            <form onSubmit={loginSubmit} >
                <h2>Login</h2>
                <input 
                    type="email" 
                    name="email" 
                    value={user.email} 
                    onChange={onChangeInput}
                    placeholder="Email" />
                <input 
                    type="password" 
                    name="password" 
                    autoComplete="on" 
                    value={user.password} 
                    onChange={onChangeInput} 
                    placeholder="Password"/>
                <div className="user__btn">
                    <button>Login</button>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    )
};

export default Login;
