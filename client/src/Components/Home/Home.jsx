import React, {useState} from "react";
import { useSelector } from 'react-redux'
import NavBar from "../NavBar/NavBar";
import s from "./Home.module.css";
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Footer from '../Footer/Footer'
import  FilterByCategory  from "../Filter/FilterByCategory/FilterByCategory";
import  ChangeOrder  from "../ChangeOrder/changeorder";


export default function Home() {

  const allProducts = useSelector((state) => state.products);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);
  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = allProducts.slice(firstIndex, lastIndex);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={s.body3}>
      <div className={s.navBar}>
        <NavBar />
        <div className={s.filter}>
        <FilterByCategory/>
        <ChangeOrder/>
        </div>
      </div>
      <div className={s.bodyCards}>
        <Cards currentProducts={currentProducts}/>
      </div>
      <div className={s.paginationContainer}>
        <Pagination products={allProducts.length}
          productsPerPage={productsPerPage}
          paginate={paginate} />
      </div>
      <Footer/>
    </div>
  );
}
