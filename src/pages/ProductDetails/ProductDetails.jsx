import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import productsData from '../../Components/Product/products.json';
import Rating from "@mui/material/Rating";
import { DataContext } from '../../Components/DataProvider/DataProvider';
import { Type } from '../../Utility/action.type';
import styles from './productDetails.module.css'; 
import LayOut from '../../Components/LayOut/LayOut';
import { ClipLoader } from 'react-spinners';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // State for selected variants and the main image
    const [selectedVariants, setSelectedVariants] = useState({});
    const [selectedImage, setSelectedImage] = useState('');

    // --- Context for dispatching actions ---
    const [, dispatch] = useContext(DataContext);

    // --- State for the image zoom effect ---
    const [showZoom, setShowZoom] = useState(false);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        try {
            const foundProduct = productsData.find(p => p.id.toString() === productId);
            if (foundProduct) {
                setProduct(foundProduct);
                // Set the main image and initialize variants
                setSelectedImage(foundProduct.image);

                const initialVariants = {};
                foundProduct.variants?.forEach(variant => {
                    if (variant.options.length > 0) {
                        initialVariants[variant.type] = variant.options[0].name;
                    }
                });
                setSelectedVariants(initialVariants);
            } else {
                setError(`Product with ID ${productId} not found`);
            }
        } catch (err) {
            setError('Error loading product: ' + err.message);
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    // --- Loading and Error Guards: Run these checks before any other logic ---
    if (isLoading) {
        return <LayOut><div style={{ textAlign: 'center', padding: '5rem' }}><ClipLoader size={50} color="#007185" /></div></LayOut>;
    }

    if (error || !product) {
        return <LayOut><div className="error" style={{textAlign: 'center', padding: '5rem', color: 'red'}}>{error || 'Product not found.'}</div></LayOut>;
    }

    // --- All logic below this line is now safe to run because `product` is guaranteed to exist ---

    const getCurrentPriceInfo = () => {
        if (!product.variants || product.variants.length === 0) {
            return product.buyBox; // Fallback to default buyBox price if no variants
        }
        
        // Find price based on the primary variant (e.g., Capacity, Gauge)
        const primaryVariantType = product.variants[0].type;
        const selectedOptionName = selectedVariants[primaryVariantType];
        
        const primaryVariant = product.variants.find(v => v.type === primaryVariantType);
        const option = primaryVariant?.options.find(opt => opt.name === selectedOptionName);

        if (option && typeof option.price !== 'undefined') {
            return { price: option.price, oldPrice: option.oldPrice };
        }

        return product.buyBox; // Fallback if a matching option isn't found
    };
    
    // --- State setters and event handlers ---
    const handleVariantSelect = (type, name) => {
        setSelectedVariants(prev => ({ ...prev, [type]: name }));
    };

    const addToCart = () => {
        const itemToAdd = {
            ...product,
            price: currentPriceInfo.price, // Add the currently selected price
            selectedVariants: selectedVariants, // Add the selected options
        };
        dispatch({ type: Type.ADD_TO_BASKET, item: itemToAdd });
    };

    const handleMouseMove = (e) => {
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setCursorPosition({ x, y });
    };
    
    const handleMouseEnter = () => setShowZoom(true);
    const handleMouseLeave = () => setShowZoom(false);

    // --- Prepare dynamic data for rendering ---
    const currentPriceInfo = getCurrentPriceInfo();
    const priceParts = (currentPriceInfo?.price || 0).toFixed(2).split('.');
    const discount = (currentPriceInfo.oldPrice && currentPriceInfo.price) ? Math.round(((currentPriceInfo.oldPrice - currentPriceInfo.price) / currentPriceInfo.oldPrice) * 100) : 0;
    
    const zoomLensStyle = {
        backgroundImage: `url(${selectedImage})`,
        backgroundSize: `${100 * 2.5}%`,
        backgroundPosition: `${cursorPosition.x}% ${cursorPosition.y}%`,
    };

    return (
        <LayOut>
            <div className={styles.productDetailContainer}>
                {/* --- Left Column: Image Gallery --- */}
                <div className={styles.leftColumn}>
                    <div className={styles.thumbnailList}>
                        {[product.image, ...product.subImages].map((img, index) => (
                            <div 
                                key={index} 
                                className={`${styles.thumbnail} ${selectedImage === img ? styles.activeThumbnail : ''}`}
                                onMouseEnter={() => setSelectedImage(img)}
                            >
                                <img src={img} alt={`${product.title} thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>
                    <div
                        className={styles.mainImageContainer}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onMouseMove={handleMouseMove}
                    >
                        <img src={selectedImage} alt={product.title} className={styles.productDetailImage} />
                        <div
                            className={`${styles.zoomLens} ${showZoom ? styles.visible : ''}`}
                            style={zoomLensStyle}
                        ></div>
                    </div>
                </div>

                {/* --- Middle Column: Product Info --- */}
                <div className={styles.middleColumn}>
                    <h1 className={styles.productTitle}>{product.title}</h1>
                    {product.brandStore && <a href={product.brandStore.url} className={styles.brandLink}>{product.brandStore.name}</a>}
                    
                    <div className={styles.ratingRow}>
                        <span>{product.rating}</span>
                        <Rating value={product.rating || 0} precision={0.1} readOnly size="small" />
                        <a href="#reviews" className={styles.reviewCount}>{(product.reviews || 0).toLocaleString()} ratings</a>
                    </div>

                    {product.badges?.isAmazonChoice && <div className={styles.amazonChoice}>Amazon's Choice</div>}
                    {product.salesVolume && <div className={styles.salesVolume}>{product.salesVolume}</div>}
                    <hr />

                    {product.badges?.isLimitedTimeDeal && <div className={styles.limitedTimeDeal}>Limited time deal</div>}
                    
                    <div className={styles.priceBlock}>
                        {discount > 0 && <span className={styles.discountPercentage}>-{discount}%</span>}
                        <span className={styles.priceCurrency}>$</span>
                        <span className={styles.priceWhole}>{priceParts[0]}</span>
                        <span className={styles.priceFraction}>{priceParts[1]}</span>
                    </div>

                    {currentPriceInfo.oldPrice && <div className={styles.listPrice}>List Price: <span className={styles.listPriceValue}>${currentPriceInfo.oldPrice.toFixed(2)}</span></div>}
                    
                    {product.offers?.map((offer, i) => <p key={i} className={styles.offerText}>{offer}</p>)}
                    <hr />

                    {/* --- Variants Section --- */}
                    <div className={styles.variantsSection}>
                        {product.variants?.map(variant => (
                            <div key={variant.type} className={styles.variantGroup}>
                                <p><strong>{variant.type}:</strong> {selectedVariants[variant.type]}</p>
                                <div className={styles.variantOptions}>
                                    {variant.options.map(option => (
                                        <button 
                                            key={option.name}
                                            className={`${styles.variantButton} ${selectedVariants[variant.type] === option.name ? styles.selectedVariant : ''}`}
                                            onClick={() => handleVariantSelect(variant.type, option.name)}
                                        >
                                            {option.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                    <hr />
                    
                    {/* --- About This Item --- */}
                    <div className={styles.descriptionSection}>
                        <h3>About this item</h3>
                        <ul>
                            {product.description?.map((line, index) => <li key={index}>{line}</li>)}
                        </ul>
                    </div>
                </div>

                {/* --- Right Column: Buy Box --- */}
                <div className={styles.rightColumn}>
                    <div className={styles.buyBox}>
                        <div className={styles.buyBoxPrice}>
                            <span className={styles.priceCurrency}>$</span>
                            <span className={styles.priceWhole}>{priceParts[0]}</span>
                            <span className={styles.priceFraction}>{priceParts[1]}</span>
                        </div>
                        
                        <p>{product.buyBox.delivery}</p>
                        {product.buyBox.primeDelivery && <p>{product.buyBox.primeDelivery}</p>}
                        <p className={styles.stockStatus}>{product.buyBox.stockStatus}</p>
                        
                        <select id="quantity" className={styles.quantitySelector}>
                            <option value="1">Qty: 1</option>
                            <option value="2">Qty: 2</option>
                            <option value="3">Qty: 3</option>
                        </select>
                        
                        <button className={`${styles.actionButton} ${styles.cartButton}`} onClick={addToCart}>Add to Cart</button>
                        <button className={`${styles.actionButton} ${styles.buyNowButton}`}>Buy Now</button>
                        
                        <div className={styles.sellerInfo}>
                            <span>Ships from <a href="#">{product.buyBox.shipsFrom}</a></span>
                            <span>Sold by <a href="#">{product.buyBox.soldBy}</a></span>
                            <span>Returns <span className={styles.returnsPolicy}>{product.buyBox.returnsPolicy}</span></span>
                        </div>
                        
                        {product.buyBox.support && <div className={styles.supportInfo}>{product.buyBox.support}</div>}

                        {product.protectionPlans?.map((plan, i) => (
                             <div key={i} className={styles.protectionPlan}>
                                <input type="checkbox" id={`plan-${i}`} />
                                <label htmlFor={`plan-${i}`}>
                                    <strong>{plan.name}</strong> for ${plan.price.toFixed(2)}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </LayOut>
    );
};

export default ProductDetail;