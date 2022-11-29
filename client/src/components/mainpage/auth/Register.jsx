import {useState} from 'react';
import {Link } from 'react-router-dom'
import axios from 'axios';
const Register = () => {
    const [user,setUser] = useState({
        name:"",
        email:"",
        password:"",
    });
    const onChangeInput = (e) => {
        const {name,value}=e.target;
        setUser({...user,[name]:value})
    };
    const registerSubmit=async(e) => {
        e.preventDefault(); //xóa quay tròn
        try {
            await axios.post("/user/register",{...user});
            localStorage.setItem("firstLogin",true);
            window.location.href="/"
        } catch (error) {
            alert(error.response.data.msg)
        }
    };

    return (
        <div className="user">
            <form onSubmit={registerSubmit} >
                <h2>Register</h2>
                <input 
                    type="name" 
                    name="name" 
                    value={user.name} 
                    onChange={onChangeInput} 
                    placeholder="Name"/>
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
                    <button>Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        </div>
    )
};

export default Register;

