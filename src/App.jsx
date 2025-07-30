import { useContext, useEffect } from "react";
import AppRouter from "./Router";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { Type } from './Utility/action.type';
import { auth } from './Utility/firebase';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
    // This Firebase listener checks for a logged-in user on every app load
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        // If a user is found, update the global state
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        // If no user, set the global state to null
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    // Cleanup the listener when the App component unmounts
    return () => {
      unsubscribe();
    };
  }, [dispatch]); // Adding dispatch to the dependency array

  return (
    <>
      <AppRouter />
    </>
  );
}

export default App;