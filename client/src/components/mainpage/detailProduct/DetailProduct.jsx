import {useContext,useState,useEffect} from 'react';
import { useParams,Link } from 'react-router-dom';
import { GobalState } from '../../../GobalState';
import ProductItem from '../products/ProductItem'
const DetailProduct = () => {
    const params = useParams();
    const state = useContext(GobalState);
    const [products] = state.ProductsApi.products;
    const [detailProduct,setDetailProduct] = useState([]);
    useEffect(() => {
        if(params.id) {
            products.forEach((item) => {
                if(params.id === item._id){
                    setDetailProduct(item);
                }
            })
        }
    }, [params.id,products])
    if (detailProduct.length === 0) return null; 
    console.log(detailProduct);
    const addCart = state.UserApi.addCart;
    return (
    <>
        <div className="detail">      
            <img src={detailProduct.images.url} alt="" />
            <div className="detail__box">
                <div className="detail__row">
                    <h2>{detailProduct.title}</h2>
                    <h6>{detailProduct.product_id}</h6>
                </div>
                <span>$ {detailProduct.price}</span>
                <p>{detailProduct.description}</p>
                <p>{detailProduct.contact}</p>
                <p>Số lượng : {detailProduct.sold}</p>
                <Link to="cart" className="cart" onClick={()=>addCart(detailProduct)}>Buy now</Link>
            </div>
        </div>
        <h2>Sản phẩm cùng danh mục</h2>
        <div className="products">
            {products.map((item) => (
                item.category === detailProduct.category?
                (<ProductItem item={item} key={item._id} />):null
            ))}
        </div>
    </>
    );
};

export default DetailProduct;
