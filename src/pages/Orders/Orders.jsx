
import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import styles from "./orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";

const Orders = () => {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, [user]);

  return (
    <LayOut>
      <div className={styles.container}>
        <h1 className={styles.header}>Your Orders</h1>
        {orders?.length === 0 ? (
          <div className={styles.emptyOrders}>
            <p className={styles.emptyText}>You don't have any orders yet.</p>
          </div>
        ) : (
          <div className={styles.ordersList}>
            {orders?.map((eachOrder, i) => (
              <div key={i} className={styles.orderCard}>
                <div className={styles.orderHeader}>
                  <div>
                    <p className={styles.orderDate}>
                      Order Placed: {new Date(eachOrder?.data?.created * 1000).toLocaleDateString()}
                    </p>
                    <p className={styles.orderId}>Order ID: {eachOrder?.id}</p>
                  </div>
                  <div>
                    <p className={styles.orderTotal}>
                      Total: ${eachOrder?.data?.amount?.toFixed(2) || "N/A"}
                    </p>
                  </div>
                </div>
                <hr className={styles.divider} />
                <div className={styles.orderItems}>
                  {eachOrder?.data?.basket?.map((order) => (
                    <ProductCard
                      flex={true}
                      product={order}
                      key={order.id}
                      className={styles.productCard}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </LayOut>
  );
};

export default Orders;