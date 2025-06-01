import { BrowserRouter } from "react-router-dom";
import AppRouter from "./Router";
import { useContext, useEffect } from "react";
import { DataContext } from "./Components/DataProvider/DataProvider";
import {Type} from './Utility/action.type'
import {auth} from './Utility/firebase'


function App() {
  const [{user}, dispatch] = useContext(DataContext)

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if(authUser) {
        // console.log(authUser)
        dispatch({
          type:Type.SET_USER,
          user:authUser,
        })
      } else {
           dispatch({
          type:Type.SET_USER,
          user:null,
        });
      }
    });
  }, [])
  return (
    <>
      <AppRouter />
      {/* <Landing /> */}
    </>
  );
}

export default App;
