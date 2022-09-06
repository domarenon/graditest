import React from 'react';

/*
    THIS COMPONENT HAS THE BASIC INFO OF THE PRODUCT
*/

const HeaderDetail = ({ product, variantSelected }) => {

    const actualPrice = (variantSelected.price === 0) ? String(product.price).slice(0, -2) : String(variantSelected.price).slice(0, -2)

    const comparePrice = (variantSelected.compareAtPrice === 0) ? String(product.compare_at_price).slice(0, -2) : String(variantSelected.compareAtPrice).slice(0, -2)

    return (
        <div className="header-product-detail">
            <p className="gray-color">by Nike x ALYX</p>
            <h1>{product.title}</h1>
            <span className="price actual-price">$ {actualPrice}.00</span>
            <span className="price compare-price gray-color">$ {comparePrice}.00</span>
        </div>
    );
}

export default HeaderDetail;