import React from 'react';
import Btn from './Btn'

const ProductItem = ({item, isAdmin,deleteProduct,onChecked}) => {
    return( 
        <div className="product__item">
            {isAdmin && <input type="checkbox" checked={item.checked} onChange={() => onChecked(item._id)} />}
            <img src={item.images.url} alt="" />
            <div className="product__box">
                <h2 title={item.title} >{item.title}</h2>
                <span>$ {item.price}</span>
                <p>{item.description}</p>
            </div>
            <Btn item = {item} deleteProduct={deleteProduct} />
        </div>
        
    );
};

export default ProductItem;
