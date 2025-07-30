import React, { useContext, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import styles from "./payment.module.css";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "../../Components/Product/CurrencyFormat";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Type } from "../../Utility/action.type";

const Payment = () => {
  const context = useContext(DataContext);
  const [{ user, basket }, dispatch] = Array.isArray(context) ? context : [{ user: null, basket: [] }, () => {}];
  
  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const totalItem = basket?.reduce((amount, item) => (item.amount || 1) + amount, 0);
  const total = basket.reduce(
    (amount, item) => item.price * (item.amount || 1) + amount,
    0
  );

  const handleChange = (e) => {
    setCardError(e?.error ? e.error.message : "");
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!stripe || !elements || !basket?.length || !user) {
      setCardError(
        !user ? "Please sign in to proceed." :
        !basket?.length ? "Your basket is empty." :
        "Payment processing is not available."
      );
      return;
    }

    setProcessing(true);
    setCardError(null);

    try {
      // ====================================================================
      // FIX: Replace simulated secret with a real API call to your backend.
      // ====================================================================

      // 1. Call your backend to create the payment intent.
      // NOTE: For production, use an environment variable for the URL.
      // Your server expects the amount in cents, so we multiply by 100.
      const response = await fetch(`http://localhost:5000/payment/create?total=${Math.round(total * 100)}`, {
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Failed to connect to the payment server.");
      }
      
      const data = await response.json();
      const clientSecret = data.clientSecret;

      if (!clientSecret) {
        throw new Error("Failed to retrieve client secret from the server.");
      }

      // 2. Confirm the card payment with the REAL clientSecret from the server.
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        // This will now show real errors from Stripe (e.g., "Your card was declined.")
        throw new Error(error.message);
      }

      // 3. Save the successful order to Firebase.
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount / 100, // Convert back to dollars for storage
          created: paymentIntent.created,
        });

      // 4. Empty the basket from the state.
      dispatch({ type: Type.EMPTY_BASKET });

      // 5. Navigate to the orders page with a success message.
      setProcessing(false);
      navigate("/orders", { state: { msg: "You have placed a new order" } });

    } catch (error) {
      console.error("Payment error:", error);
      setCardError(error.message);
      setProcessing(false);
    }
  };


  // The rest of the JSX remains exactly the same.
  return (
    <LayOut>
      <div className={styles.payment_page_container}>
        <div className={styles.checkout_header}>
          <h1>Checkout ({totalItem} items)</h1>
        </div>
        <form onSubmit={handlePayment} className={styles.payment_form_layout}>
          <div className={styles.payment_main_content}>
            <div className={styles.checkout_section}>
              <div className={styles.section_header}>
                <h2>1   Shipping address</h2>
              </div>
              <div className={styles.section_content}>
                <p>{user?.email || "Please sign in"}</p>
                <p>123 React Lane</p>
                <p>Chicago, IL</p>
              </div>
            </div>
            <div className={styles.checkout_section}>
              <div className={styles.section_header}>
                <h2>2   Review items and delivery</h2>
              </div>
              <div className={styles.section_content}>
                {basket?.length > 0 ? (
                  basket.map((item, i) => (
                    <ProductCard
                      key={i}
                      product={item}
                      flex={true}
                      isCheckoutItem={true}
                      renderAdd={false}
                      renderDesc={false}
                    />
                  ))
                ) : (
                  <p>Your basket is empty.</p>
                )}
              </div>
            </div>
            <div className={styles.checkout_section}>
              <div className={styles.section_header}>
                <h2>3   Payment method</h2>
              </div>
              <div className={styles.section_content}>
                <div className={styles.card_element_container}>
                  <CardElement onChange={handleChange} />
                </div>
                {cardError && <small className={styles.card_error_message}>{cardError}</small>}
              </div>
            </div>
          </div>
          <div className={styles.payment_summary_panel}>
            <div className={styles.summary_card}>
              <button type="submit" className={styles.amazon_button} disabled={processing || !stripe || !elements || !basket?.length || !user}>
                {processing ? (<><ClipLoader color="gray" size={12} /> Processing...</>) : ("Place Your Order")}
              </button>
              <p className={styles.summary_terms}>By placing your order, you agree to Amazon's privacy notice and conditions of use.</p>
              <hr className={styles.summary_divider} />
              <h3>Order Summary</h3>
              <div className={styles.summary_line}><span>Items ({totalItem}):</span><span><CurrencyFormat amount={total} /></span></div>
              <div className={styles.summary_line}><span>Shipping & handling:</span><span><CurrencyFormat amount={0} /></span></div>
              <hr className={styles.summary_divider_light} />
              <div className={`${styles.summary_line} ${styles.summary_total}`}><span>Order total:</span><span><CurrencyFormat amount={total} /></span></div>
            </div>
          </div>
        </form>
      </div>
    </LayOut>
  );
};

export default Payment;