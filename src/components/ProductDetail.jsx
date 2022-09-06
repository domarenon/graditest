import React, { useState } from 'react';
import useGetProduct from '../hooks/useGetProduct';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Slider from '../utils/Slider'
import '../styles/ProductDetail.css'
import HeaderDetail from './HeaderDetail';
import ProductForm from './ProductForm';

/*

	THIS COMPONENT HAS THE MAIN STRUCTURE OF THE PRODUCT COMPONENT
	IT CONTAINS A HEADER DETAIL COMPONENT AND A PRODUCT FORM COMPONENT.
*/

const API = 'https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js'

const ProductDetail = () => {

	const product = useGetProduct(API);

	const [variantSelected, setVariantSelected] = useState({ name: '', price: 0, compareAtPrice: 0 })

	const updateVariantSelected = (varianSelected) => {
		setVariantSelected(varianSelected)
	}

	return (
		<section className="main-container">
			<div className="ProductDetail">
				<Container>
					<Row>
						{/* BREADCRUMBS */}
						<Col xs={12}>
							<div className="header-links gray-color">
								Catalog / Sneakers / <span className="link-active">{product.title}</span>
							</div>
						</Col>
						{/* BREADCRUMBS - END */}
					</Row>
					<Row>
						<Col xs={12} md={6}>
							<Slider media={product.media}></Slider>
						</Col>
						<Col xs={12} md={6}>

							<HeaderDetail product = {product} variantSelected = {variantSelected} ></HeaderDetail>
							<hr />
							<ProductForm product = {product} variantSelected = {variantSelected} updateVariantSelected = {updateVariantSelected}></ProductForm>
							
						</Col>
					</Row>
				</Container>
			</div>
		</section>
	);
}
export default ProductDetail;