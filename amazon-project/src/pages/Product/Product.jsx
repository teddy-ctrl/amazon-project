// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from 'axios'

// const Product = () => {
//     const [products, setProducts] = useState()

//     useEffect(() => {
//         axios.get('https://fakestoreapi.com/products')
//         .then((res) => {
//             // console.log(res)
//             setProducts(res.data)
//         }).catch((err) => {
//             console.log(err)
//         })
//     }, [])

//   return (
//     <>
//         <section>
//             {
//                 products.map((singleProduct) => {
//                     return <ProductCard product={singleProduct} key={singleProduct.id} />
//                 })
//             }
//         </section>
    
//     </>
//   );
// };

// export default Product;





import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from 'axios';
import styles from "./product.module.css"; // Note: Corrected to match case-sensitive filename

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch products');
                setLoading(false);
                console.error(err);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <section className={styles.productContainer}>
            {products.length > 0 ? (
                products.map((singleProduct) => (
                    <ProductCard 
                        product={singleProduct} 
                        key={singleProduct.id} 
                    />
                ))
            ) : (
                <div>No products available</div>
            )}
        </section>
    );
};

export default Product;