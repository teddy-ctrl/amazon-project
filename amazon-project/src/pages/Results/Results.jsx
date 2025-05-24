import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { useParams } from "react-router-dom";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../Components/Product/ProductCard";
import styles from './Results.module.css'
// import Loader from "../../Components/Loder/Loder";

const Results = () => {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
//   const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // setIsLoading(true);
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        // setIsLoading(false);
        setResults(res.data);
      })
      .catch((err) => {
        console.log(err);
        // setIsLoading(false);
      });
  }, []);

  return (
    <LayOut>
      <div>
        <h1>Results</h1>
        <p>Category / {categoryName}</p>
        <hr />
        {/* {isLoading ? (
          <Loader />
        ) : (
          <div>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )} */}
        <div className={styles.resalts}>
            {results?.map((product) => (
              <ProductCard key={product.id} product={product} renderDesc={false} renderAdd={true} />
            ))}
          </div>
      </div>
    </LayOut>
  );
};

export default Results;







