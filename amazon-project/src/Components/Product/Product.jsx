// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from 'axios'
// // import Loader from "../../Components/Loder/Loder";

// const Product = () => {
//     const [products, setProducts] = useState()
//     // const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         // isLoading(true)
//         axios.get('https://fakestoreapi.com/products')
//         .then((res) => {
//             // console.log(res)
//             setProducts(res.data)
//             // isLoading(false)
//         }).catch((err) => {
//             console.log(err)
//             // setIsLoading(false)
//         })
//     }, [])

//   return (
//     //  <section>
//     //    {products && products.map((singleProduct) => (
//     //     <ProductCard key={singleProduct.id} product={singleProduct} />
//     //   ))}
//     // </section>
//     <section>
//             {
//                 products.map((singleProduct) => {
//                     return <ProductCard product={singleProduct} key={singleProduct.id} />
//                 })
//             }
//         </section>
//     // <>
//     // {
//     //     isLoading ?  (<Loader />) :  <section>
//     //         {
//     //             products.map((singleProduct) => {
//     //                 return <ProductCard product={singleProduct} key={singleProduct.id} />
//     //             })
//     //         }
//     //     </section>
//     // }
       
    
//     // </>
//   );
// };

// export default Product;


// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from 'axios';
// import styles from './Product.module.css';

// const Product = () => {
//     const [products, setProducts] = useState([]);
//     // const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         axios.get('https://fakestoreapi.com/products')
//             .then((res) => {
//                 setProducts(res.data);
//                 // setLoading(false);
//             })
//             .catch((err) => {
//                 console.error("Error fetching products:", err);
//                 setError("Failed to load products. Please try again later.");
//                 // setLoading(false);
//             });
//     }, []);

//     // if (loading) {
//     //     return <p className={styles.loading}>Loading products...</p>;
//     // }

//     if (error) {
//         return <p className={styles.error}>{error}</p>;
//     }

//     return (
//         <section className={styles.productSection}>
//             {products.map((singleProduct) => (
//                 <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
//             ))}
//         </section>
//     );
// };

// export default Product;





import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from 'axios';
import styles from './Product.module.css';

const Product = () => {
    const [products, setProducts] = useState([]);
    // const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('https://fakestoreapi.com/products')
            .then((res) => {
                setProducts(res.data);
                // setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
                setError("Failed to load products. Please try again later.");
                // setLoading(false);
            });
    }, []);

    // if (loading) {
    //     return <p className={styles.loading}>Loading products...</p>;
    // }

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }

    return (
        <section className={styles.productSection}>
            {products.map((singleProduct) => (
                <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
            ))}
        </section>
    );
};

export default Product;











// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from "axios";
// // import Loader from "../../Components/Loder/Loder";

// const Product = () => {
//   const [products, setProducts] = useState([]);
// //   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     // setIsLoading(true);
//     axios
//       .get("https://fakestoreapi.com/products")
//       .then((res) => {
//         setProducts(res.data);
//         // setIsLoading(false);
//       })
//       .catch((err) => {
//         console.log(err);
//         // setIsLoading(false);
//       });
//   }, []);

//   return isLoading ? (
//     <Loader />
//   ) : (
//     <section>
//       {products && products.map((singleProduct) => (
//         <ProductCard key={singleProduct.id} product={singleProduct} />
//       ))}
//     </section>
//   );
// };

// export default Product;






