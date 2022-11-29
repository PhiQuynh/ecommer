import {useContext,useState,useEffect} from 'react';
import { GobalState } from '../../../GobalState';
import {Link} from "react-router-dom";
import axios from "axios";
import PaypalButton from "./PaypalButton"

const Cart = () => {
    const state = useContext(GobalState);
    const [cart,setCart] = state.UserApi.cart;
    const [total,setTotal] = useState(0);
    const [token] = state.token;
    const tranSuccess = async (payment) => {
        console.log(payment);
        const {paymentID, address} = payment;
        await axios.post("/api/payment",{cart, paymentID, address},{
            headers: {Authorization: token},
        })
        setCart([])
        addCart([]);
        alert("You have succeeded palced an order")
    }
    useEffect(() => {
        const getTotal = () =>{
            const total = cart.reduce((prve,item) => {
                return prve + item.price * item.quantity;
            }, 0);
            setTotal(total);
        };
        getTotal();
    }, [cart]);
    const addCart = async(cart) =>{
        await axios.patch("/user/addCart",{cart},
        {
            headers : {Authorization: token},
        })
    }
    const remove = (id)=>{
        cart.forEach((item)=>{
            if(item._id === id){
                item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
            }
            setCart([...cart]);
            addCart(cart)
        })
    };
    const add = (id)=>{
        cart.forEach((item)=>{
            if(item._id === id){
                item.quantity += 1;
            }
            setCart([...cart]);
            addCart(cart)
        })
    };
    const removeProduct = (id)=>{
        if(window.confirm("Do you want to delete this product")){
            cart.forEach((item,index) => {
                if(item._id === id){
                    cart.splice(index,1);
                }
            });
            setCart([...cart]);
            addCart(cart)
        }

    }
    if(cart.length === 0 ) return <h2>No cart</h2>
    return (
        <div>
                 {cart.map((item) => 
                (<div className="detail Cart" key={item._id}>      
                <img src={item.images.url} alt="d" />
                <div className="detail__box">
                    <div className="detail__row">
                        <h2>{item.title}</h2>
                        <h6>{item.product_id}</h6>
                    </div>
                    <span>$ {item.price}</span>
                    <p>{item.description}</p>
                    <p>{item.content}</p>
                    <div className="number">
                        <button onClick={() => remove(item._id)}>-</button>
                        <span> {item.quantity}</span>
                        <button onClick={() => add(item._id)}>+</button>
                    </div>  
                    <Link to="cart" className="cart">Buy now</Link>
                </div>
                <div className="delete" onClick={() => {removeProduct(item._id)}}>x</div>
            </div>)
            )}
            <div className="total">
                <h3>Total {total}</h3>
                <PaypalButton
                    total={total} tranSuccess = {tranSuccess}
                />
            </div>
        </div>
    );
};

export default Cart;