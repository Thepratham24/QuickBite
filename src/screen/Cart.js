// import React from 'react';
// import Delete from '@material-ui/icons/Delete';
// import { useCart, useDispatchCart } from '../Components/Contextreducer';
// localStorage.setItem("userEmail", "user@example.com");
// export default function Cart() {
//   // Get cart state and dispatch function from context
//   let data = useCart();
//   let dispatch = useDispatchCart();

//   // If the cart is empty, display a message
//   if (data.length === 0) {
//     return (
//       <div>
//         <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
//       </div>
//     );
//   }

//   // Calculate total price of items in the cart
//   let totalPrice = data.reduce((total, food) => total + parseFloat(food.price) * food.qty, 0);

//   const newLocal = "http://localhost:5000/api/OrderData";
//   // Handle checkout process
//   const handleCheckOut = async () => {
//     let userEmail = localStorage.getItem("userEmail");
//     console.log(userEmail)
//     if (!userEmail) {
//       console.error("User email is not found in local storage.");
//       return;
//     }

//     try {
//       console.log("Sending checkout request...");

//       let response = await fetch(newLocal, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           order_data: [data],
//           email: userEmail,
//           order_date: new Date().toDateString()
//         })
//       });

//       console.log("Response status:", response.status);
//       console.log("Response body:", await response.text());

//       if (response.ok) {
//         console.log("Order placed successfully.");
//         dispatch({ type: "DROP" });
//       } else {
//         console.error("Failed to place the order. Status:", response.status);
//       }
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   // Render the cart items and checkout button
//   return (
//     <div>
//       <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
//         <table className='table table-hover'>
//           <thead className='text-success fs-4'>
//             <tr>
//               <th scope='col'>#</th>
//               <th scope='col'>Name</th>
//               <th scope='col'>Quantity</th>
//               <th scope='col'>Size</th>
//               <th scope='col'>Amount</th>
//               <th scope='col'></th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((food, index) => (
//               <tr key={index}>
//                 <th scope='row'>{index + 1}</th>
//                 <td>{food.name}</td>
//                 <td>{food.qty}</td>
//                 <td>{food.size}</td>
//                 <td>{food.price}</td>
//                 <td>
//                   <button type="button" className="btn p-0" onClick={() => dispatch({ type: "REMOVE", index })}>
//                     <Delete />
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <div>
//           <h1 className='fs-2'>Total Price: {totalPrice.toFixed(2)}/-</h1>
//         </div>
//         <div>
//           <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
//         </div>
//       </div>
//     </div>
//   );
// }

























import React from 'react';
import Delete from '@material-ui/icons/Delete';
import { useCart, useDispatchCart } from '../Components/Contextreducer';

export default function Cart() {
  // Get cart state and dispatch function from context
  let data = useCart();
  let dispatch = useDispatchCart();

  // If the cart is empty, display a message
  if (data.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    );
  }



  // Calculate total price of items in the cart
  let totalPrice = data.reduce((total, food) => total + food.price, 0);

  // Handle checkout process
  const handleCheckOut = async() => {
    let userEmail = localStorage.getItem("userEmail");

   
    let response = await fetch("http://localhost:5000/api/auth/OrderData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        order_data: data,
        email: userEmail,
        order_date: new Date().toDateString()
      })
    });
  
  
    console.log("Order response: ",response)
    if (response.ok) {
      // Clear the cart if the order is successfully placed
      dispatch({ type: "DROP" });
    } else {
      console.error("Failed to place the order.");
      console.log(data)
      console.log(userEmail)
      console.log("date")
    }
  };

  // Render the cart items and checkout button
  return (
    <div>
      <div className='container m-auto mt-5 table-responsive table-responsive-sm table-responsive-md'>
        <table className='table table-hover'>
          <thead className='text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Size</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {data.map((food, index) => (
              <tr key={index}>
                <th scope='row'>{index + 1}</th>
                <td>{food.name}</td>
                <td>{food.qty}</td>
                <td>{food.size}</td>
                <td>{food.price}</td>
                <td>
                  <button type="button" className="btn p-0">
                    <Delete onClick={() => dispatch({ type: "REMOVE", index })} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <h1 className='fs-2'>Total Price: {totalPrice}/-</h1>
        </div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  );
}



