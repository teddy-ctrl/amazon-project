// import React, { useEffect, useState } from 'react'
// import LayOut from '../../Components/LayOut/LayOut'
// import { useParams } from 'react-router-dom'
// import axios from 'axios'
// import { productUrl } from '../../Api/endPoints'
// import ProductCard from '../Product/ProductCard'
// import Loader from '../../Components/Loder/Loder'



// const ProductDetail = () => {
//     const {productId} = useParams()
//     const [product, setproduct] =useState
//     const [isLoading, setIsLoading] = useState(false)

//     useEffect(() => {
//         isLoading(true)
//         axios.get(`${productUrl}/products/${productId}`)
//         .then((res) => {
//             setproduct(res.data)
//             setIsLoading(false)
//         }).catch((err) => {
//             console.log(err)
//             setIsLoading(false)
//         })
//     }, [])
//   return (
//     <>
//       <LayOut>
        
//            {isLoading ? (<Loader />) : <ProductCard product={product} />
// }
//       </LayOut>
//     </>
//   )
// }

// export default ProductDetail

import React, { useEffect, useState } from 'react';
import LayOut from '../../Components/LayOut/LayOut';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../Product/ProductCard';
import Loader from '../../Components/Loder/Loder';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`${productUrl}/products/${productId}`)
            .then((res) => {
                setProduct(res.data);
                setIsLoading(false);
            }).catch((err) => {
                console.log(err);
                setIsLoading(false);
            });
    }, []);

    return (
        <LayOut>
            {isLoading ? <Loader /> : product && <ProductCard product={product} flex={true} renderDesc={true}/>}
        </LayOut>
    );
};

export default ProductDetail;