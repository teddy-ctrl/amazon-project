// import React, { useEffect, useState } from "react";
// import ProductCard from "./ProductCard";
// import axios from 'axios'
// import Loader from "../../Components/Loder/Loder";

// const Product = () => {
//     const [products, setProducts] = useState()
//     const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         isLoading(true)
//         axios.get('https://fakestoreapi.com/products')
//         .then((res) => {
//             // console.log(res)
//             setProducts(res.data)
//             isLoading(false)
//         }).catch((err) => {
//             console.log(err)
//             setIsLoading(false)
//         })
//     }, [])

//   return (
//     <>
//     {
//         isLoading ?  (<Loader />) :  <section>
//             {
//                 products.map((singleProduct) => {
//                     return <ProductCard product={singleProduct} key={singleProduct.id} />
//                 })
//             }
//         </section>
//     }
       
    
//     </>
//   );
// };

// export default Product;




import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";
import Loader from "../../Components/Loder/Loder";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <section>
      {products && products.map((singleProduct) => (
        <ProductCard key={singleProduct.id} product={singleProduct} />
      ))}
    </section>
  );
};

export default Product;






