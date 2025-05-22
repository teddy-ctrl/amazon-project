// import { useReducer } from "react"
// import { Type } from "./action.typoe"



// export const initialState = {
//     baske:[]
// }

// export const reducer = (state, action) => {
//     switch (action.Type) {
//         case Type.ADD_TO_BASKET:
//             return {
//                 ...state,
//                 basket:[...state.basket, action.item]
//             }

            
//         default:
//             return state;
//     }
// }




import { useReducer } from "react";
import { Type } from "./action.type";
export const initialState = { basket: [] };
export const reducer = (state, action) => {
  switch (action.type) {
    case Type.ADD_TO_BASKET:
      return { ...state, basket: [...state.basket, action.item] };
    default:
      return state;
  }
};