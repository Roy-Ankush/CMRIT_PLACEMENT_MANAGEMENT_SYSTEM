// import React from 'react';
// import {Outlet} from 'react-router-dom';

// const Officer = () => {
//   return (
//     <div>
//       <Outlet/>
//     </div>
//   )
// }

// export default Officer


import React, { useEffect, useState } from 'react';
import Navbar from '../../components/Navbar_off';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';

// Set axios defaults globally
axios.defaults.withCredentials = true;

function Officer() {
//   const [isValid, setIsValid] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyUser = async () => {
//       try {
//         const res = await axios.get('http://localhost:8000/api/user/officer');
//         setIsValid(true);
//         console.log("i am done")
//         console.log(res)  
//         navigate('/officer/home')
//       } catch (error) {
//         console.log("error is",error)
//         console.log("inside officer page of catch block");
//         navigate('/');
//       }
//     };

//     verifyUser();
//   }, [navigate]);

  return (
    <>
       {/* {isValid && (  */}
        <>
           <Navbar /> 
          <Outlet />
        </>
        {/* )}   */}
    </>
  );
}

export default Officer;

