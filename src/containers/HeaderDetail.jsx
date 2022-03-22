import React from 'react';

const HeaderDetail = ({product, variantSelected}) => {
    return (
        <>
        <div className="header-product-detail">
            <p className="gray-color">by Nike x ALYX</p>
            <h1>{product.title}</h1>
            <span className="price actual-price">$ {(variantSelected.price===0)?String(product.price).slice(0, -2):String(variantSelected.price).slice(0, -2)}.00</span>
            <span className="price compare-price gray-color">$ {(variantSelected.compareAtPrice===0)?String(product.compare_at_price).slice(0, -2):String(variantSelected.compareAtPrice).slice(0, -2)}.00</span>
        </div>
        <hr/>
        </>
        
    );
}

export default HeaderDetail;