import React, { useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Modal, Button } from 'react-bootstrap';

/* 
    THIS COMPONENT HAS THE FUNCTION OF ADDING PRODUCTS TO THE CART
    BY SHOWING THE VARIANT SELECTED IN A POP UP WITH THE INFO RELATED.

*/

const AddingButtons = ({ quantity, totalPrice, variantSelected, changeVariantSelected }) => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const handleShow = () => {
        changeVariantSelected();
        setShow(true);
    }

    return (
        <>
        <div className="product-add-to-cart">
                <Row>
                    <Col xs={12} md={6} >
                        <div className="input-group">
                            <button type="button" className="input-group-text adding-buttons favourite-button">Add to Favourite</button>
                        </div>
                    </Col>
                    <Col xs={12} md={6} >
                        <div className="input-group">
                            <button type="button" onClick={handleShow} className="input-group-text adding-buttons cart-button">Add to Cart</button>
                        </div>
                    </Col>
                </Row>
            </div>

            {/* MODAL DETAIL ADDED TO CART */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {variantSelected.name}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>You selected {quantity} "{variantSelected.name}" for the price of ${String(totalPrice).slice(0, -2) + (totalPrice === 0 ? "0" : ".00")}</Modal.Body>
                <Modal.Footer>

                    <Button variant="input-group-text adding-buttons cart-button" onClick={handleClose}>
                        Confirm Add to Cart
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODAL DETAIL ADDED TO CART - END */}
        </>
    );
}

export default AddingButtons;