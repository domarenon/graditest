import React from 'react';

const HeaderDetail = ({product, variantPrice}) => {
    return (
        <>
        <div className="header-product-detail">
            <p className="gray-color">by Nike x ALYX</p>
            <h1>{product.title}</h1>
            <span className="price actual-price">$ {(variantPrice.price===0)?String(product.price).slice(0, -2):String(variantPrice.price).slice(0, -2)}.00</span>
            <span className="price compare-price gray-color">$ {(variantPrice.compareAtPrice===0)?String(product.compare_at_price).slice(0, -2):String(variantPrice.compareAtPrice).slice(0, -2)}.00</span>
        </div>
        <hr/>
        </>
        
    );
}

export default HeaderDetail;