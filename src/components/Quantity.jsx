import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

/*
    THIS COMPONENT HAS THE FUNCTION OF SETTING THE COUNTER OF THE PRODUCT
    AND TO SET THE TOTAL PRICE DEPENDING ON THE VARIANT SELECTED.

*/

const Quantity = ({ quantity, updateQuantity, totalPrice }) => {

    const handleDecrement = () => {
        if (quantity > 0) {
            updateQuantity(quantity - 1);
        }
    }

    const handleIncrement = () => {
        updateQuantity(quantity + 1);
    }

    return (
        <>
        {/* ADDING PRODUCTS BUTTONS */}
        <div className="product-quantity">
                <Row>
                    <Col xs={6}>
                        <div className="input-group">
                            <button type="button" onClick={handleDecrement} className="input-group-text decrease">-</button>
                            <div className="form-control text-center quantity">{quantity}</div>
                            <button type="button" onClick={handleIncrement} className="input-group-text increase">+</button>
                        </div>
                    </Col>
                    <Col xs={6} className="align-left centered">
                        <span className="gray-color">Total Price: </span>${String(totalPrice).slice(0, -2) + (totalPrice === 0 ? "0" : ".00")}
                    </Col>
                </Row>
            </div>
            {/* ADDING PRODUCTS BUTTONS - END */}
        </>
    );
}

export default Quantity;