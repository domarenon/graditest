import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import AddingButtons from './AddingButtons';
import Quantity from './Quantity'

/*
    THIS COMPONENT HAS ALL THE STRUCTURE AND FUNCTIONALITY ABOUT
    THE FORM THAT ALLOWS TO SELECT VARIANTS OF THE PRODUCT.

    THIS COMPONENT ALSO CONTAINS OTHER COMPONENTS AS THE QUANTITY COMPONENT
    AND THE ADDING BUTTONS COMPONENT.


*/

const ProductForm = (props) => {

    const { product, variantSelected, updateVariantSelected } = props;

    const [quantity, setQuantity] = useState(0)

    const [colorIndex, setColorIndex] = useState({ index: 0, value: '' })

    const [sizeIndex, setSizeIndex] = useState({ index: 0, value: '' })

    const [totalPrice, setTotalPrice] = useState(0)


    /* CHANGING PRODUCT SELECTED INFO */
    const moveDotColor = (index, color) => {
        setColorIndex({ index: index, value: color });
        setSizeIndex({ index: 0, value: '' });
        updateQuantity(0);
        setTotalPrice(0);
    }

    const moveDotSize = (index, size) => {
        const available = validateSizeAvailable(size);
        if (colorIndex != 0 && available) {
            setSizeIndex({ index: index, value: size });
            changeVariantSelected();
        }
    }
    
    const updateQuantity = (newQuantity) => {
        changingTotalPrice(newQuantity)
        setQuantity(newQuantity)
    }

    const changingTotalPrice = (quantity) => {
        if (!product.variants) { return }

        for (const variant of product.variants) {
            if (variant.option1 === colorIndex.value && variant.option2 === sizeIndex.value) {
                setTotalPrice(variant.price * quantity)
            }
        }
    }
    /* CHANGING PRODUCT SELECTED INFO - END*/

    /* VALIDATING IF VARIANT IS AVAILABLE */
    const validateSizeAvailable = (size) => product.variants.some((variant) => variant.option1 === colorIndex.value && variant.option2 === size && variant.available)
    /* VALIDATING IF VARIANT IS AVAILABLE - END */

    /* CHANGING VARIANT INFO BASED IN THE PRODUCT SELECTED */
    const changeVariantSelected = () => {
        if (product.variants) {
            for (const variant of product.variants) {
                if (variant.option1 === colorIndex.value && variant.option2 === sizeIndex.value) {
                    updateVariantSelected({ name: variant.name, price: variant.price, compareAtPrice: variant.compare_at_price })
                }
            }
        }
    }
    /* CHANGING VARIANT INFO BASED IN THE PRODUCT SELECTED - END */

    return (
        <>
            {/* CHANGING VARIANTS OPTIONS  */}
            {product.options?.map((option) => (
                <>
                    <div className="option-container">
                        <Row>
                            <Col className="centered" xs={2}>
                                <span>{option.name + ": "}</span>
                            </Col>
                            <Col xs={10}>
                                {
                                    option.name === "Color" ?
                                        <div className={"container-buttons"}>
                                            {
                                                option.values?.map((value, index) => (
                                                    <div key={"button-" + option.name + index}
                                                        onClick={() => moveDotColor(index + 1, value)}
                                                        className={colorIndex.index === index + 1 ? "dot-color active " : "dot-color"}
                                                    >
                                                        <div className="inside-dot-color" style={{ backgroundColor: value }}></div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        :
                                        <div className={"container-buttons"}>
                                            {
                                                option.values?.map((value, index) => {

                                                    const disabled = validateSizeAvailable(value);

                                                    return (
                                                    <div key={"button-" + option.name + index}
                                                        onClick={() => moveDotSize(index + 1, value)}
                                                        className={sizeIndex.index === index + 1 ? "dot-size active centered middle " : "dot-size centered middle "
                                                                    + (disabled ? "" : "disabled")}>
                                                            {value}
                                                    </div>
                                                    )
                                                }
                                                )
                                            }
                                        </div>
                                }
                            </Col>
                        </Row>
                    </div>
                    <hr />
                </>
            ))
            }
            {/* CHANGING VARIANTS OPTIONS - END */}

            <Quantity quantity = {quantity} totalPrice = {totalPrice} updateQuantity= {updateQuantity}></Quantity>

            
            <AddingButtons quantity = {quantity} totalPrice= {totalPrice} 
                            variantSelected = {variantSelected} changeVariantSelected = {changeVariantSelected} >                
            </AddingButtons>

            <div className="product-description gray-color" dangerouslySetInnerHTML={{ __html: product.description }} />
            
        </>
    );
}

export default ProductForm;