import React, { useContext, useState } from "react";
   import LayOut from "../../Components/LayOut/LayOut";
   import styles from "./payment.module.css";
   import { DataContext } from "../../Components/DataProvider/DataProvider";
   import ProductCard from "../../Components/Product/ProductCard";
   import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
   import CurrencyFormat from "../../Components/Product/CurrencyFormat";
   import { axiosInstance } from "../../Api/axios";
   import { db } from "../../Utility/firebase";
   import { useNavigate } from "react-router-dom";
   import { ClipLoader } from "react-spinners";

   const Payment = () => {
     const [{ user, basket }, dispatch] = useContext(DataContext);
     const [cardError, setCardError] = useState(null);
     const [processing, setProcessing] = useState(false);

     const stripe = useStripe();
     const elements = useElements();
     const navigate = useNavigate();

     const totalItem = basket?.reduce((amount, item) => item.amount + amount, 0);
     const total = basket.reduce(
       (amount, item) => item.price * item.amount + amount,
       0
     );

     const handleChange = (e) => {
       setCardError(e?.error ? e.error.message : "");
     };

     const handlePayment = async (e) => {
       e.preventDefault();

       if (!stripe || !elements || basket?.length === 0) {
         setCardError("Payment form is not ready or basket is empty.");
         return;
       }

       setProcessing(true);
       setCardError(null);

       try {
         // 1 - Backend: Get client secret
         const response = await axiosInstance({
           method: "POST",
           url: `/payment/create?total=${Math.round(total * 100)}`,
         });

         console.log(response.data);
         const clientSecret = response.data?.clientSecret;

         // 2 - Client side: Confirm payment
         const { paymentIntent, error } = await stripe.confirmCardPayment(
           clientSecret,
           {
             payment_method: {
               card: elements.getElement(CardElement),
             },
           }
         );

         if (error) {
           setCardError(error.message);
           setProcessing(false);
           return;
         }

         // 3 - Save to Firebase
         await db
           .collection("users")
           .doc(user.uid)
           .collection("orders")
           .doc(paymentIntent.id)
           .set({
             basket: basket,
             amount: paymentIntent.amount,
             created: paymentIntent.created,
           });

         // Empty basket
         dispatch({ type: "EMPTY_BASKET" });

         navigate("/orders", { state: { msg: "You have placed a new order" } });
       } catch (error) {
         console.error("Payment error:", error);
         setCardError(error.message);
         setProcessing(false);
       }
     };

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
                   <h2>1   Shipping address</h2>
                 </div>
                 <div className={styles.section_content}>
                   <p>{user?.email}</p>
                   <p>123 React Lane</p>
                   <p>Chicago, IL</p>
                 </div>
               </div>

               <div className={styles.checkout_section}>
                 <div className={styles.section_header}>
                   <h2>2   Review items and delivery</h2>
                 </div>
                 <div className={styles.section_content}>
                   {basket?.map((item, i) => (
                     <ProductCard
                       key={i}
                       product={item}
                       flex={true}
                       isCheckoutItem={true}
                     />
                   ))}
                   {basket?.length === 0 && <p>Your basket is empty.</p>}
                 </div>
               </div>

               <div className={styles.checkout_section}>
                 <div className={styles.section_header}>
                   <h2>3   Payment method</h2>
                 </div>
                 <div className={styles.section_content}>
                   <div className={styles.card_element_container}>
                     <CardElement
                       onChange={handleChange}
                       options={{
                         style: {
                           base: {
                             fontSize: "16px",
                             color: "#424770",
                             "::placeholder": { color: "#aab7c4" },
                           },
                           invalid: { color: "#9e2146" },
                         },
                       }}
                     />
                   </div>
                   {cardError && (
                     <small className={styles.card_error_message}>
                       {cardError}
                     </small>
                   )}
                   <p className={styles.payment_info_text}>
                     Enter your card details. Your payment information is secure.
                   </p>
                 </div>
               </div>
             </div>

             <div className={styles.payment_summary_panel}>
               <div className={styles.summary_card}>
                 <button
                   type="submit"
                   className={styles.amazon_button}
                   disabled={processing || !stripe || !elements || !basket?.length}
                 >
                   {processing ? (
                     <>
                       <ClipLoader color="gray" size={12} /> Processing...
                     </>
                   ) : (
                     "Place Your Order"
                   )}
                 </button>
                 <p className={styles.summary_terms}>
                   By placing your order, you agree to Amazon's privacy notice and
                   conditions of use.
                 </p>
                 <hr className={styles.summary_divider} />
                 <h3>Order Summary</h3>
                 <div className={styles.summary_line}>
                   <span>Items ({totalItem}):</span>
                   <span>
                     <CurrencyFormat amount={total} />
                   </span>
                 </div>
                 <div className={styles.summary_line}>
                   <span>Shipping & handling:</span>
                   <span>
                     <CurrencyFormat amount={0} />
                   </span>
                 </div>
                 <hr className={styles.summary_divider_light} />
                 <div className={`${styles.summary_line} ${styles.summary_total}`}>
                   <span>Order total:</span>
                   <span>
                     <CurrencyFormat amount={total} />
                   </span>
                 </div>
               </div>
             </div>
           </form>
         </div>
       </LayOut>
     );
   };

   export default Payment;