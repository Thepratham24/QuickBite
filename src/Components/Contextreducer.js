// import React, { createContext, useContext, useReducer } from 'react';

// // Create contexts for state and dispatch
// const CartStateContext = createContext();
// const CartDispatchContext = createContext();

// // Reducer to manage cart state
// const reducer = (state, action) => {
//     switch(action.type) {
//         case 'ADD':
//             // Extract price based on size from options
//             const { size, options } = action;
//             const price = options[size] || 0; // Default to 0 if size not found
//             return [...state, {
//                 id: action.id,
//                 name: action.name,
//                 qty: action.qty,
//                 size,
//                 price,
//                 img: action.img
//             }];
//         default:
//             console.error("Unhandled action type: ", action.type);
//             return state;
//     }
// };

// // Provider component to wrap your app
// export const CartProvider = ({ children }) => {
//     const [state, dispatch] = useReducer(reducer, []);
    
//     return (
//         <CartDispatchContext.Provider value={dispatch}>
//             <CartStateContext.Provider value={state}>
//                 {children}
//             </CartStateContext.Provider>
//         </CartDispatchContext.Provider>
//     );
// };

// // Custom hooks for using context
// export const useCart = () => useContext(CartStateContext);
// export const useDispatchCart = () => useContext(CartDispatchContext);






















import React, { createContext, useContext, useReducer } from 'react'
const CartStateContext = createContext();
const CartDispatchContext = createContext();
const reducer = (state, action) => {
switch(action.type){
    
        case 'ADD':
            return  [...state, {id: action.id, name: action.name, qty: action.qty, size: action.size, price: action.price, img: action.img }]
        case 'REMOVE':
            let newArr= [...state]
            newArr.splice(action.index,1)                     //splice ek inbuilt function hai
            return newArr
           
        case "UPDATE":
            let arr = [...state]
            arr.find((food, index) => {
                if (food.id === action.id) {
                    console.log(food.qty, parseInt(action.qty), action.price + food.price)
                    arr[index] = { ...food, qty: parseInt(action.qty) + food.qty, price: action.price + food.price }
                }
                return arr
            })
            return arr   

        case "DROP":
            let empArray = []
            return empArray 
        default:
            console.log("Error in Reducers")

}
}
export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, [])
    return (
        <CartDispatchContext.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatchContext.Provider>
    )
}

export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatchContext); 
