import {useContext,useState} from 'react';
import { GobalState } from '../../../GobalState';
import ProductItem from './ProductItem'
import Loading from '../loading/Loading'
import axios from 'axios';
import Filter from "./Filter"
import LoadMore from "./LoadMore";

const Products = () => {
    const state = useContext(GobalState);
    const [isAdmin] = state.UserApi.isAdmin;
    const [products,setProducts] =state.ProductsApi.products;
    const [token] = state.token;
    const [callback, setCallback] = state.ProductsApi.callback;
    const [loading,setLoading] = useState(false);
    const [isChecked,setIsChecked] = useState(false);
    const deleteProduct = async (id,public_id) =>{
        try {
            setLoading(true)
            const deleteImg = axios.post("/api/destroy",{public_id},{
                headers:{Authorization: token}
            })
            await deleteImg
            //console.log(public_id);
            const deletePro = axios.delete(`/api/product/${id}`,{
                headers:{Authorization: token}
            })
            await deletePro
            setCallback(!callback);
            setLoading(false);
        } catch (error) {
            alert(error.response.data.msg)
        }
    };
    //const [cart] =state.UserApi.cart;
    const onChecked = (id) => {
        //console.log(id);
        products.forEach((product) =>{
            if(product._id === id){
                product.checked = !product.checked;
            }
            setProducts([...products])
        });
    }
    const checkAll=() =>{
        products.forEach((product) =>{
            product.checked = !isChecked;
           // console.log("🚀 ~ file: Products.jsx ~ line 46 ~ products.forEach ~ product.checked", product.checked)
            setProducts([...products]);
            setIsChecked(!isChecked);
        });
    }
      const deleteAll=() =>{
        products.forEach((product) =>{
            if(product.checked)  {
                deleteProduct(product._id,product.images.public_id)
            }
        })
    }
    if(loading) return (<div><Loading /></div>);
    return (
        <>
            {isAdmin && (<div className="delete__all">
                <span>Select all</span>
                <input type="checkbox" checked={isChecked} onChange={checkAll} />
                <button onClick={deleteAll} >Delete all</button>
            </div>)}
            <Filter />
            <div className="products">
                {products.map((item) => (
                    <ProductItem 
                    item={item}
                    key={item._id} 
                    isAdmin={isAdmin} 
                    deleteProduct={deleteProduct}
                    onChecked={onChecked}
                    />
                ))}
                {products.length === 0 ? <Loading/> : null}
            </div>
            <LoadMore/>
        </>
    )
};

export default Products