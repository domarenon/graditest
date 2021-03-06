import React, {useState, useEffect} from 'react';
import useGetProduct from '../hooks/useGetProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from '../functions/Slider'
import { Modal, Button } from 'react-bootstrap';
import '../styles/ProductDetail.css'

const API = 'https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js'

const ProductDetail = () => {

	const product = useGetProduct(API);

	const [quantity, setQuantity] = useState(0)

	const [colorIndex, setColorIndex] = useState({index: 0, value: ''})

	const [sizeIndex, setSizeIndex] = useState({index: 0, value: ''})

	const [variantSelected, setVariantSelected] = useState({name: '',price: 0, compareAtPrice: 0})

	const [totalPrice, setTotalPrice] = useState(0)

	useEffect(() => {
		changingTotalPrice()
	},[quantity])


	/* VALIDATING IF VARIANT IS AVAILABLE */
	const validateSizeAvailable = (size) => {
		for (const variant of product.variants) {
			if(variant.option1 === colorIndex.value && variant.option2 === size && variant.available === true)
			{
				return true
			}
		}
		return false
	}
	/* VALIDATING IF VARIANT IS AVAILABLE - END */

	/* CHANGING VARIANT INFO BASED IN THE PRODUCT SELECTED */
	const changeVariantSelected = () => {
		if (product.variants){
			for (const variant of product.variants) {
				if(variant.option1 === colorIndex.value && variant.option2 === sizeIndex.value)
				{
					setVariantSelected({name: variant.name, price: variant.price, compareAtPrice: variant.compare_at_price})
				}
			}
		}
	}
	/* CHANGING VARIANT INFO BASED IN THE PRODUCT SELECTED - END */

	/* CHANGING PRODUCT SELECTED INFO */
	const moveDotColor = (index, color) => {
        setColorIndex({index: index, value: color});
		setSizeIndex({index: 0, value: ''});
		setQuantity(0);
		setTotalPrice(0);
    }

	const moveDotSize = (index, size) => {
		let available = validateSizeAvailable(size);
        if(colorIndex != 0 && available){
			setSizeIndex({index: index, value: size});
			changeVariantSelected();
		}
    }

	const handleDecrement = () => {
		if(quantity > 0)
		{
			setQuantity((prevCount) => prevCount - 1);
		}
	}

	const handleIncrement = () => {
		setQuantity((prevCount) => prevCount + 1);
	}

	const changingTotalPrice = () => {
		if (product.variants){
			for (const variant of product.variants) {
				if(variant.option1 === colorIndex.value && variant.option2 === sizeIndex.value)
				{
					setTotalPrice(variant.price * quantity)
				}
			}
		}
	}
	/* CHANGING PRODUCT SELECTED INFO - END*/

	/* SHOW MODAL PROPERTIES */
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);

	const handleShow = () => {
		changeVariantSelected();
		setShow(true);
	}
	/* SHOW MODAL PROPERTIES - END */


	return (
		<section className="main-container">
			<div className="ProductDetail">
			<Container>
				<Row>
					{/* LINKS MENU */}
					<Col xs={12}>
						<div className="header-links gray-color">
							Catalog / Sneakers / <span className="link-active">{product.title}</span>
						</div>
					</Col>
					{/* LINKS MENU - END */}
				</Row>
				<Row>
					<Col xs={6}>
						<Slider media={product.media}></Slider>
					</Col>
					<Col xs={6}>

						{/* HEADER DETAIL  */}
						<div className="header-product-detail">
							<p className="gray-color">by Nike x ALYX</p>
							<h1>{product.title}</h1>
							<span className="price actual-price">$ {(variantSelected.price===0)?String(product.price).slice(0, -2):String(variantSelected.price).slice(0, -2)}.00</span>
							<span className="price compare-price gray-color">$ {(variantSelected.compareAtPrice===0)?String(product.compare_at_price).slice(0, -2):String(variantSelected.compareAtPrice).slice(0, -2)}.00</span>
						</div>
						{/* HEADER DETAIL - END */}

						<hr/>

						{/* CHANGING VARIANTS OPTIONS  */}
						{product.options?.map((option) => (
							<>
							<div className="option-container">
								<Row>
									<Col className="centered" xs={2}>
									<span>{option.name +": "}</span>
									</Col>
									<Col xs={10}>
										{
											option.name==="Color"?
											<div className={"container-buttons"}>
												{
													option.values?.map((value,index) => (
														<div key={"button-" + option.name + index} 
															onClick={() => moveDotColor(index+1,value)} 
															className={colorIndex.index === index + 1 ?"dot-color active " : "dot-color" }
															>
															<div className = "inside-dot-color" style={{backgroundColor: value}}></div>
														</div>
													))
												}
											</div>
											:
											<div className={"container-buttons"}>
												{
													option.values?.map((value,index) => (
														<div key={"button-" + option.name + index} 
														onClick={() => moveDotSize(index+1,value)} 
														className={sizeIndex.index === index + 1 ?"dot-size active centered middle"  : "dot-size centered middle" }>{value}
														</div>
													))
												}
											</div>
										}
									</Col>
								</Row>
							</div>
							<hr/>
							</>
							))
						}
						{/* CHANGING VARIANTS OPTIONS - END */}

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
									<span className="gray-color">Total Price: </span>${String(totalPrice).slice(0, -2)+(totalPrice===0?"0":".00")}
								</Col>
							</Row>
						</div>
						<div className="product-add-to-cart">
							<Row>
								<Col xs={12} md={6} >
									<div className="input-group">
										<button type="button"  className="input-group-text adding-buttons favourite-button">Add to Favourite</button>
									</div>
								</Col>
								<Col xs={12} md={6} >
									<div className="input-group">
										<button type="button" onClick={handleShow} className="input-group-text adding-buttons cart-button">Add to Cart</button>
									</div>
								</Col>
							</Row>
						</div>
						<div className="product-description gray-color" dangerouslySetInnerHTML={ {__html: product.description} } />
						{/* ADDING PRODUCTS BUTTONS - END */}
						

						{/* MODAL DETAIL ADDED TO CART */}
						<Modal show={show} onHide={handleClose}>
							<Modal.Header closeButton>
							<Modal.Title>
								{variantSelected.name}
							</Modal.Title>
							</Modal.Header>
							<Modal.Body>You selected {quantity} "{variantSelected.name}" for the price of ${String(totalPrice).slice(0, -2)+(totalPrice===0?"0":".00")}</Modal.Body>
							<Modal.Footer>
							
							<Button variant="input-group-text adding-buttons cart-button" onClick={handleClose}>
								Confirm Add to Cart
							</Button>
							</Modal.Footer>
						</Modal>

						{/* MODAL DETAIL ADDED TO CART - END */}

					</Col>
				</Row>
			</Container>
			</div>
		</section>
	);
}
export default ProductDetail;