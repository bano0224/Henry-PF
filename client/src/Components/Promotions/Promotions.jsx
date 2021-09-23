import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import NavBar from "../NavBar/NavBar";
import s from "./Promotions.module.css"
import Cards from "../Cards/Cards";
import Pagination from "../Pagination/Pagination";
import Footer from "../Footer/Footer";
import FilterByCategory from "../Filter/FilterByCategory/FilterByCategory";
import Search from "../Search/Search";
import landing from '../../media/promotionsnew.mp4'
import ChangeOrder from '../Filter/ChangeOrder/ChangeOrder'
import getProducts from "../../actions/getProducts";
import {Grid} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    container:{
    
    },
    media: {
      height: 0,
      paddingTop: '56.25%', // 16:9
    },
    paginationContainer: {
      fontSize: '90%',
      paddingTop: '5%',
      display: 'flex',
      flexDirection: 'row',
      /* justifyContent: 'auto', */ 
      boxSizing: 'content-box',
      width: '100%',
    }
    }))

export default function Promotions() {
    const productReducer = useSelector((state) => state.productReducer)
    const { products } = productReducer
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage, setProductsPerPage] = useState(9);
    const lastIndex = currentPage * productsPerPage;
    const firstIndex = lastIndex - productsPerPage;
    const dispatch = useDispatch();
    const classes = useStyles();
    


  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const inStock = products.filter(p => p.countInStock >= 1)
    const inDiscount = inStock.filter(p => p.discount > 0)
  const currentProducts = inDiscount.slice(firstIndex, lastIndex);
  const howManyPages = Math.ceil(inDiscount.length /productsPerPage)
  

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
            <h3 className={s.title}>Feria de </h3>
            <h3 className={s.title}>Descuentos</h3>
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
      <Pagination
          products={inDiscount.length}
          productsPerPage={productsPerPage}
          pages={howManyPages}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      <Footer />
    </div>
  );
}