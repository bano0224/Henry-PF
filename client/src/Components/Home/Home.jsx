import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import FilterByCategory from "../Filter/FilterByCategory/FilterByCategory";
import Search from "../Search/Search";
import landing from '../../media/landing.mp4'
import ChangeOrder from '../Filter/ChangeOrder/ChangeOrder'
import getProducts from "../../actions/getProducts";

export default function Home() {
  const productReducer = useSelector((state) => state.productReducer)
  const { products } = productReducer
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const currentProducts = products.slice(firstIndex, lastIndex);
  

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({top: 500, behavior: 'smooth'});
  };

  return (
    <div className={s.container}>
      {/* <Container maxWidth="sm"> */}

      <NavBar />
      <div >
        <div className={s.videoContainer}>
          <video muted autoPlay loop className={s.video}>
            <source src={landing} type="video/mp4"/>
          </video>
          <div className={s.gray}></div>
          <div className={s.h3Container}>
            <h3 className={s.titleB}>Welcome to </h3>
            <h3 className={s.title}>E-Market</h3>
          </div>
        </div>
      </div>
      <div className={s.body3}>
        <div className={s.navBar}>
          
          <div className={s.filter}>
            <div className={s.search}>
              <Search id='search' />
            </div>
            <div className={s.filterByCategory}>
              <FilterByCategory />
            </div>
            <div className={s.change}>
              <ChangeOrder />
            </div>
          </div>
        </div>
        <div className={s.bodyCards}>
        { 
          products.length === 0
          ? <h4>No se encontraron productos</h4>
          : <Cards currentProducts={currentProducts} />
        }
        </div>
      </div>
      <div className={s.paginationContainer}>
        <Pagination
          products={products.length}
          productsPerPage={productsPerPage}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
      <Footer />
    </div>
  );
}