import React from 'react';
import { useState } from 'react';
import stylestore from './storeedit.module.css';
import NavbarSeller from './navbarseller';

function StoreEdit() {

    const [openAddProduct, setAddProduct] = useState(false);
    const [products, setProducts] = useState([]);
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productImage, setProductImage] = useState(null);

        const handleAddProduct = () => {
        const newProduct = {
            name: productName,
            price: productPrice,
            description: productDescription,
            image: productImage ? URL.createObjectURL(productImage) : null
        };

        setProducts([...products, newProduct]);
        setAddProduct(false);
        setProductName('');
        setProductPrice('');
        setProductDescription('');
        setProductImage(null);
    };


    return(
        <div className={stylestore.storePage}>
            <NavbarSeller/>
        <div className={stylestore.storeContainer}>
            <p className={stylestore.storeTitle} style={{fontFamily: 'Bayer TypeArchiType Regular' }}>your store</p>
            <button type="submit" className={stylestore.addProduct} onClick={() => setAddProduct(true)}>add product</button>
            {
            openAddProduct &&
             <div className={stylestore.backdrop}>
            <div className={stylestore.addPopup}>
                <button className={stylestore.closeAddProduct} onClick={() => setAddProduct(false)} style={{fontWeight: 'bold'}}>X</button>
                <h3 className={stylestore.addtitle} style={{fontFamily: 'Bayer TypeArchiType Regular', color: '#602f32' }}>add a product to your store</h3>
                <div className={stylestore.productInput}>
                <input className={stylestore.productName}
                    placeholder='Name of Product'
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    />
                <input className={stylestore.productPrice}
                    placeholder='Price of Product'
                    type="number"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    />
                <input className={stylestore.productDescription}
                    placeholder='Description of Product'
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    />
                <h5 className={stylestore.addImage}>Image of Product</h5>
                <input className={stylestore.productImage}
                    type="file"
                    accept="image/*"
                    onChange={(e) => setProductImage(e.target.files[0])}
                    />
                    <button className={stylestore.submitProduct} onClick={handleAddProduct}>add product</button>
                </div>
            </div>
            </div>
            }
        <div className={stylestore.storeList}>
            {products.map((product, index) => (
        <div key={index} className={stylestore.productCard}>
        <h4>{product.name}</h4>
        <p>₱{product.price}</p>
        <p>{product.description}</p>
        {product.image && <img src={product.image} alt="Product" className={stylestore.productImagePreview} />}
        </div>
            ))}
        </div>
        </div>
        </div>
    )
}

export default StoreEdit;