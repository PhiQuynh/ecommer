import {useContext,useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { GobalState } from '../../../GobalState';

const OrderDetails = () => {
    const params = useParams();
    const state = useContext(GobalState);
    const [history] = state.UserApi.history;
    const [orderDetails,setOrderDetails] = useState([]);
    useEffect(() => {
        if(params) {
            history.forEach((item) => {
                if(item._id === params.id){     
                    setOrderDetails(item);
                }
            });
        }
    }, [params,history])
 if (orderDetails.length === 0) return null;
    console.log(orderDetails.cart)
  return (
    <div className="history">
    <h2>History</h2>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>Address</th>
                <th>Postal Code</th>
                <th>Country Code</th>
            </tr>
        </thead>        
         <tbody>
            <tr>
                <td>{orderDetails.address.recipient_name}</td>
                <td>{`${orderDetails.address.line1} - ${orderDetails.address.city}`}</td>
                <td>{orderDetails.address.postal_code}</td>
                <td>{orderDetails.address.country_code}</td> 
                </tr>
        </tbody>  
    </table>
    <table style={{margin:"30px 0px"}} >
        <thead>
        <tr>
                <th></th>
                <th>Products</th>
                <th>Quantity</th>
                <th>Price</th>
            </tr>
        </thead>
         <tbody>
            {orderDetails.cart.map((item) => (

                <tr key={item._id}>
                    <td>
                        <img src={item.images.url} alt="" />
                    </td>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{item.quantity+item.price}</td>
                </tr>
            ))}
        </tbody> 
    </table>
</div>
  )
}

export default OrderDetails