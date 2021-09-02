// import React, { useEffect } from "react";
// import { Link, useParams } from "react-router-dom";
// import { connect, useDispatch } from "react-redux";
// import s from "./Detail.module.css";
// import Navbar from "../NavBar/NavBar";

// function DetailProduct() {
//   const { id } = useParams();
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(id); //  pasar la action (Detail)
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return (
//     <div className>
//       <Navbar />
//       <div className={s.containerdetail}>
//         {DetailProduct.length !== 0 ? (
//           <div></div>
//         ) : (
//           <div>
//             <h1>Loading product...</h1>
//             <img
//               src="https://online.portoviejo.gob.ec/Imagenes/loading.gif"
//               width="550"
//               height="250"
//               alt=""
//               className=""
//             />
//           </div>
//         )}
//         <div>
//           <Link to="/home">
//             <button className={s.buttonback}>Back</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// }
// function mapStateToProps(state) {
//   return {
//     Detail: state.videogameDetail,
//   };
// }

// function mapDispatchToProps(dispatch) {
//   return {
//     // eslint-disable-next-line no-undef
//     getDetail: (Details) => dispatch(getDetail(Details)),
//   };
// }
// export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct);
