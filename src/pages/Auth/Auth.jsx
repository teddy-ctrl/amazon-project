import { useState, useContext, useEffect } from "react";
import styles from "./auth.module.css";
import { auth, db } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { ClipLoader } from "react-spinners";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Type = {
  SET_USER: "SET_USER",
};

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [businessEmail, setBusinessEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [reenterPassword, setReenterPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showBusinessForm, setShowBusinessForm] = useState(false);
  const [showBusinessSignupForm, setShowBusinessSignupForm] = useState(false);

  const [{ user }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData = useLocation();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const getFriendlyErrorMessage = (errorCode) => {
    switch (errorCode) {
      case "auth/email-already-in-use":
        return "This email is already registered.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Invalid email or password.";
      case "auth/weak-password":
        return "Password is too weak. It must be at least 6 characters and include letters and numbers.";
      case "permission-denied":
        return "Unable to save user data due to permission issues. Please contact support.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const handleEmailChange = (e, setEmailFunc) => {
    const value = e.target.value;
    setEmailFunc(value);
    if (value && !emailRegex.test(value)) {
      setError("Please enter a valid email address");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (e, setPasswordFunc) => {
    const value = e.target.value;
    setPasswordFunc(value);
    if (value && value.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (value && !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(value)) {
      setError("Password must include letters and numbers");
    } else {
      setError("");
    }
  };

  const handleReenterPasswordChange = (e) => {
    const value = e.target.value;
    setReenterPassword(value);
    if (value && value !== businessPassword) {
      setError("Passwords do not match");
    } else {
      setError("");
    }
  };

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);
    if (value && value.trim().length < 2) {
      setError("Full name must be at least 2 characters");
    } else {
      setError("");
    }
  };

  const authHandler = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password");
      return;
    }
    setLoading(true);
    try {
      const userInfo = await signInWithEmailAndPassword(auth, email, password);
      dispatch({ type: Type.SET_USER, user: userInfo.user });
      navigate(navStateData?.state?.redirect || "/");
    } catch (err) {
      setError(getFriendlyErrorMessage(err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!email || !emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }
    setShowPassword(true);
    setError("");
  };

  const handleChangeEmail = (e) => {
    e.preventDefault();
    setShowPassword(false);
    setEmail("");
    setPassword("");
    setError("");
  };

  const handleBusinessSignup = (e) => {
    e.preventDefault();
    if (!businessEmail || !emailRegex.test(businessEmail)) {
      setError("Please enter a valid business email");
      return;
    }
    setShowBusinessSignupForm(true);
    setError("");
  };

  const handleBusinessAccountCreation = async (e) => {
    e.preventDefault();
    if (!fullName || !businessEmail || !businessPassword || !reenterPassword) {
      setError("All fields are required");
      return;
    }
    if (!emailRegex.test(businessEmail)) {
      setError("Please enter a valid email address");
      return;
    }
    if (businessPassword !== reenterPassword) {
      setError("Passwords do not match");
      return;
    }
    if (
      businessPassword.length < 6 ||
      !/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(businessPassword)
    ) {
      setError(
        "Password must be at least 6 characters and include letters and numbers"
      );
      return;
    }
    if (fullName.trim().length < 2) {
      setError("Full name must be at least 2 characters");
      return;
    }
    if (!db) {
      setError("Firestore is not initialized. Please check Firebase configuration.");
      console.error("Firestore instance is undefined");
      return;
    }
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        businessEmail,
        businessPassword
      );
      const user = userCredential.user;
      console.log("User created with UID:", user.uid);

      // Sanitize data to ensure valid Firestore fields
      const userData = {
        fullName: fullName.trim(),
        email: businessEmail.toLowerCase().trim(),
        createdAt: new Date().toISOString(),
      };
      console.log("Attempting to write to Firestore with data:", userData);

      try {
        await setDoc(doc(db, "users", user.uid), userData);
        console.log("Firestore write successful for user:", user.uid);
      } catch (firestoreError) {
        console.error("Firestore write error:", firestoreError);
        throw new Error(firestoreError.code === "permission-denied" 
          ? "permission-denied" 
          : `Failed to write to Firestore: ${firestoreError.message}`);
      }

      dispatch({ type: Type.SET_USER, user });
      setShowBusinessSignupForm(false);
      setShowBusinessForm(false);
      setError("Account created successfully!");
      setTimeout(() => setError(""), 3000);
      navigate(navStateData?.state?.redirect || "/");
    } catch (err) {
      console.error("Account creation error:", err);
      setError(getFriendlyErrorMessage(err.message || err.code));
    } finally {
      setLoading(false);
    }
  };

  const handleShowBusinessForm = (e) => {
    e.preventDefault();
    setShowBusinessForm(true);
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setError("");
  };

  const handleBack = (e) => {
    e.preventDefault();
    setShowBusinessSignupForm(false);
    setFullName("");
    setBusinessEmail("");
    setBusinessPassword("");
    setReenterPassword("");
    setError("");
  };

  return (
    <div className={styles.authContainer}>
      <Link to="/" className={styles.logo} aria-label="Amazon Home">
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG24.png"
          alt="Amazon Logo"
          width="100"
        />
      </Link>
      {!showBusinessForm ? (
        <div
          className={styles.formBox}
          role="region"
          aria-label="Sign-in or Account Creation"
        >
          {!showPassword ? (
            <>
              {navStateData?.state?.msg && (
                <small style={{ margin: "15px 0", textAlign: "center" }}>
                  {navStateData.state.msg}
                </small>
              )}
              <h2 className={styles.signInText}>Sign in or create account</h2>
              <div>
                <label htmlFor="email" className={styles.label}>
                  Enter mobile number or email
                </label>
                <input
                  type="email"
                  id="email"
                  className={styles.input}
                  value={email}
                  onChange={(e) => handleEmailChange(e, setEmail)}
                  aria-describedby={error ? "email-error" : undefined}
                  aria-required="true"
                />
              </div>
              <button
                className={styles.continueBtn}
                onClick={handleContinue}
                disabled={loading || !!error}
                aria-label="Continue with sign-in"
              >
                {loading ? <ClipLoader color="#000" size={15} /> : "Continue"}
              </button>
              <p className={styles.agreementText}>
                By continuing, you agree to Amazon's{" "}
                <a href="#" className={styles.link}>
                  Conditions of Use
                </a>{" "}
                and{" "}
                <a href="#" className={styles.link}>
                  Privacy Notice
                </a>
                .
              </p>
              <a
                href="#"
                className={styles.helpLink}
                aria-label="Need help with sign-in"
              >
                Need help?
              </a>
              <hr className={styles.divider} />
              <p className={styles.businessText}>Buying for work?</p>
              <button
                type="button"
                onClick={handleShowBusinessForm}
                className={styles.businessBtn}
                disabled={loading || !!error}
                aria-label="Create a free Amazon Business account"
              >
                {loading ? (
                  <ClipLoader color="#000" size={15} />
                ) : (
                  "Create a free business account"
                )}
              </button>
            </>
          ) : (
            <>
              <h2 className={styles.signInText}>
                {loading ? <ClipLoader color="#000" size={15} /> : "Sign in"}
              </h2>
              <div className={styles.emailDisplay}>
                <span>{email}</span>
                <a
                  href="#"
                  className={styles.changeLink}
                  onClick={handleChangeEmail}
                  aria-label="Change email address"
                >
                  Change
                </a>
              </div>
              <div className={styles.passwordContainer}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <a
                  href="#"
                  className={styles.forgetLink}
                  aria-label="Forgot your password"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                onChange={(e) => handlePasswordChange(e, setPassword)}
                value={password}
                className={styles.input}
                aria-describedby={error ? "password-error" : undefined}
                aria-required="true"
              />
              <button
                type="submit"
                onClick={authHandler}
                className={styles.continueBtn}
                disabled={loading || !!error}
                aria-label="Sign in with email and password"
              >
                {loading ? <ClipLoader color="#000" size={15} /> : "Sign in"}
              </button>
            </>
          )}
        </div>
      ) : !showBusinessSignupForm ? (
        <div
          className={styles.businessCreationContainer}
          role="region"
          aria-label="Business Account Creation"
        >
          <div className={styles.businessForm}>
            <h2>Let's create your free Amazon Business account</h2>
            <p>Enter an email. Work email preferred.</p>
            <input
              type="email"
              value={businessEmail}
              onChange={(e) => handleEmailChange(e, setBusinessEmail)}
              className={styles.input}
              placeholder="Enter email"
              aria-describedby={error ? "business-email-error" : undefined}
              aria-required="true"
            />
            <button
              className={styles.continueBtn}
              onClick={handleBusinessSignup}
              disabled={loading || !!error}
              aria-label="Get started with business account"
            >
              {loading ? <ClipLoader color="#000" size={15} /> : "Get started"}
            </button>
            <p>
              Already an Amazon Business customer?{" "}
              <a
                href="#"
                className={styles.link}
                onClick={(e) => {
                  e.preventDefault();
                  setShowBusinessForm(false);
                  setBusinessEmail("");
                  setError("");
                }}
                aria-label="Sign in as existing Amazon Business customer"
              >
                Sign in
              </a>
            </p>
          </div>
          <div className={styles.businessBenefits}>
            <h2>Reshape buying for your organization</h2>
            <ul>
              <li>
                <span role="img" aria-label="discount">
                  💰
                </span>{" "}
                Quantity Discounts: Enjoy great discounts, starting from just
                two units, on over 60 million products from the most trusted
                brands.
              </li>
              <li>
                <span role="img" aria-label="prime">
                  ⭐
                </span>{" "}
                Business Prime: Get unlimited, FREE shipping on eligible orders
                for everyone on your business account, plus more benefits.
              </li>
              <li>
                <span role="img" aria-label="users">
                  👥
                </span>{" "}
                Many users: Connect your team, create purchasing groups, payment
                methods.
              </li>
            </ul>
            <img
              src="https://m.media-amazon.com/images/I/416LUsi8c6L.svg"
              alt="Amazon Business benefits illustration"
            />
            <a
              href="#"
              className={styles.link}
              aria-label="Learn more about Amazon Business"
            >
              Learn more about Amazon Business
            </a>
          </div>
        </div>
      ) : (
        <div
          className={styles.businessSignupContainer}
          role="region"
          aria-label="Business Account Signup"
        >
          <div className={styles.businessSignupForm}>
            <h2>Enter your full name and choose your business password</h2>
            <p>All fields are required</p>
            <button
              className={styles.backBtn}
              onClick={handleBack}
              aria-label="Back to previous step"
            >
              ← Back
            </button>
            <div>
              <label htmlFor="fullName" className={styles.label}>
                Your name
              </label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={handleFullNameChange}
                className={styles.input}
                placeholder="First and last name"
                aria-describedby={error ? "fullname-error" : undefined}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="businessEmail" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="businessEmail"
                value={businessEmail}
                onChange={(e) => handleEmailChange(e, setBusinessEmail)}
                className={styles.input}
                aria-describedby={error ? "business-email-error" : undefined}
                aria-required="true"
              />
            </div>
            <div>
              <label htmlFor="businessPassword" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="businessPassword"
                value={businessPassword}
                onChange={(e) => handlePasswordChange(e, setBusinessPassword)}
                className={styles.input}
                placeholder="At least 6 characters"
                aria-describedby={error ? "business-password-error" : undefined}
                aria-required="true"
              />
              <p className={styles.infoText}>
                <span role="img" aria-label="info">
                  ✅
                </span>{" "}
                Passwords must be at least 6 characters and include letters and
                numbers.
              </p>
            </div>
            <div>
              <label htmlFor="reenterPassword" className={styles.label}>
                Re-enter password
              </label>
              <input
                type="password"
                id="reenterPassword"
                value={reenterPassword}
                onChange={handleReenterPasswordChange}
                className={styles.input}
                aria-describedby={error ? "reenter-password-error" : undefined}
                aria-required="true"
              />
            </div>
            <button
              className={styles.nextBtn}
              onClick={handleBusinessAccountCreation}
              disabled={loading || !!error}
              aria-label="Create Amazon Business account"
            >
              {loading ? (
                <ClipLoader color="#000" size={15} />
              ) : (
                "Create account"
              )}
            </button>
            <p className={styles.agreementText}>
              By creating an account, you agree to Amazon's{" "}
              <a href="#" className={styles.link}>
                Conditions of Use
              </a>{" "}
              and{" "}
              <a href="#" className={styles.link}>
                Privacy Notice
              </a>
              , and the Amazon Business Terms and Conditions. You agree that you
              are creating this business account on behalf of your organization
              and have authority to bind your organization.
            </p>
          </div>
        </div>
      )}
      <div className={styles.divider}></div>
      <div className={styles.footer}>
        <div className={styles.footerLink}>
          <a href="#" className={styles.link}>
            Conditions of Use
          </a>
          <a href="#" className={styles.link}>
            Privacy Notice
          </a>
          <a href="#" className={styles.link}>
            Help
          </a>
        </div>
        <p className={styles.copyright}>
          © 1996-2025, Amazon.com, Inc. or its affiliates
        </p>
      </div>
      {error && (
        <div
          id="error-message"
          role="alert"
          className={styles.errorMessage}
          aria-live="assertive"
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Auth;