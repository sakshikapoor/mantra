import './ProductShowcase.css';

export function ProductShowcase(props) {

    const getProduct = props.products.map(product => (
        <div key={product.productId} className="product-container">
            <img src={product.searchImage} className="product-image" />
            <h5 className="product-name">{product.productName}</h5>
            <div className="price-container">
                <div className="product-price">&#8377; {product.price}</div>
                <div className="product-price-mrp">&#8377; {product.mrp}</div>
                <div className="product-price-discount">{product.discountDisplayLabel}</div>
            </div>
        </div>
    ))

    return (
        <div className="products-wrapper">
            {getProduct}
        </div>
    )
}