import {useState,useEffect} from 'react';
import axios from 'axios';

const UserApi = (token) => {
    const [isLogged, setisLogged] = useState (false);

    const [isAdmin, setIsAdmin] = useState (false);
    const [cart,setCart] = useState ([]);
    const [history,setHistory] = useState ([]);
    // isLogged=false
    //setisLogged(true)  =>isLogged=true
    useEffect(() => {
       if(token){
           const getUser=async ()=>{
                try {
                    const res = await axios.get("/user/info",{
                        headers:{Authorization: token},
                    });
                    setisLogged(true);
                    // if(res.data.user.role === 1){
                    //     setIsAdmin(true)
                    // }
                    // else{
                    //     setIsAdmin(false)
                    // }
                    res.data.user.role === 1 ? setIsAdmin(true) : setIsAdmin(false);                  
                    setCart(res.data.user.cart);
                    console.log(res.data.user)
                } catch (err) {
                    alert(err.response.data.msg)
                }
           };
           getUser();
       }
    },[token]);
    useEffect(()=> {
        if(token){
            const getHistory = async() =>{               
            if(isAdmin){
                const res = await axios.get("/api/payment",{
                    headers: { Authorization: token},
                });
                setHistory(res.data.payments); 
                //console.log(res.data)
            }else{
                const res = await axios.get("/user/history",{
                    headers: { Authorization: token},
                });
                setHistory(res.data); 
            }
            };
            getHistory();
        }
    },[token,isAdmin]);
    const addCart = async(product) => {
        if(!isLogged){
            return alert("Please login to continue buying")
        }
        const check = cart.every((item) => {
            return item._id !== product._id;
        });
        if(check){
            setCart([...cart,{...product,quantity:1}])
            await axios.patch("/user/addcart",
            {
                cart : [...cart,{...product,quantity:1}]
            },{
                headers:{Authorization: token},
            })
        }else {
            alert("This product has add to cart")
        }
        
    }
    return{
        isLogged: [isLogged, setisLogged] ,
        isAdmin: [isAdmin, setIsAdmin],
        cart : [cart,setCart],
        addCart: addCart,
        history: [history, setHistory],
    }
};

export default UserApi;
