import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utility/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import styles from "./Orders.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import { ClipLoader } from "react-spinners";

const Orders = () => {
    const context = useContext(DataContext);
    const user = context ? context[0].user : null;

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user) {
            const unsubscribe = db.collection("users").doc(user.uid).collection("orders")
                .orderBy("created", "desc").onSnapshot(
                    (snapshot) => {
                        setOrders(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                        setLoading(false);
                    },
                    (error) => {
                        console.error("Error fetching orders:", error);
                        setLoading(false);
                    }
                );
            return () => unsubscribe();
        } else {
            setOrders([]);
            setLoading(false);
        }
    }, [user]);

    return (
        <LayOut>
            <section className={styles.orders_page_container}>
                <div className={styles.orders_header_section}>
                    <div className={styles.breadcrumbs}>
                        <a href="/account">Your Account</a> › <span>Your Orders</span>
                    </div>
                    <div className={styles.title_and_search}>
                        <h1>Your Orders</h1>
                        <div className={styles.search_container}>
                            <input type="text" placeholder="Search all orders" />
                            <button className={styles.search_button}>Search Orders</button>
                        </div>
                    </div>
                    {/* Placeholder for the navigation tabs */}
                    <nav className={styles.orders_nav}>
                        <a href="#" className={styles.active}>Orders</a>
                        <a href="#">Buy Again</a>
                        <a href="#">Not Yet Dispatched</a>
                    </nav>
                </div>
                
                {loading ? (
                    <div className={styles.loader_container}><ClipLoader color="#007185" size={50} /></div>
                ) : (
                    <>
                        {/* Placeholder for the filter dropdown */}
                        <div className={styles.filter_container}>
                            <span>{orders.length} orders</span> placed in the last 3 months
                        </div>

                        {orders.length === 0 ? (
                            <div className={styles.no_orders}>You have no orders to display.</div>
                        ) : (
                            orders.map((order) => (
                                <div key={order.id} className={styles.order_card}>
                                    <div className={styles.order_card_header}>
                                        <div className={styles.header_info_group}>
                                            <div className={styles.header_column}>
                                                <span>ORDER PLACED</span>
                                                <p>{new Date(order.created * 1000).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                            </div>
                                            <div className={styles.header_column}>
                                                <span>TOTAL</span>
                                                <p>${(order.amount / 100).toFixed(2)}</p>
                                            </div>
                                            <div className={styles.header_column}>
                                                <span>DISPATCH TO</span>
                                                <p>{user?.email?.split('@')[0] || 'Guest'}</p>
                                            </div>
                                        </div>
                                        <div className={styles.header_column_right}>
                                            <span>ORDER # {order.id}</span>
                                            <p><a href="#">View order details</a> | <a href="#">Invoice</a></p>
                                        </div>
                                    </div>
                                    <div className={styles.order_card_body}>
                                        <h2 className={styles.arrival_status}>Arriving Wednesday</h2>
                                        {order.basket?.map((item, i) => (
                                            <div key={i} className={styles.product_row}>
                                                <div className={styles.product_details}>
                                                    {/* We use the ProductCard for the image and title */}
                                                    <ProductCard product={item} flex={true} renderAdd={false} renderDesc={false} />
                                                </div>
                                                <div className={styles.action_buttons}>
                                                    <button className={styles.yellow_button}>Track package</button>
                                                    <button className={styles.white_button}>View or edit order</button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                    </>
                )}
            </section>
        </LayOut>
    );
};

export default Orders;