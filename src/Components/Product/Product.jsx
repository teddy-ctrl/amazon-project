import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import productsData from '../Product/products.json';
import styles from './Product.module.css';

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    try {
      if (productsData && productsData.length > 0) {
        setProducts(productsData);
      } else {
        setError("No products found in local data.");
      }
    } catch (err) {
      console.error("Error loading products:", err);
      setError("Failed to load products. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <p className={styles.loading}>Loading products...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <section className={styles.productSection}>
      {products.map((singleProduct) => (
        <ProductCard
          renderAdd={true}
          product={singleProduct}
          key={singleProduct.id}
          flex={false}
          renderDesc={false}
        />
      ))}
    </section>
  );
};

export default Product;