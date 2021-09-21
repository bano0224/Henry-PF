import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
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


export default function Home() {
  const querys = new URLSearchParams(useLocation().search.slice(1));
  const status = querys.get("status"); // string con estado de la compra en mercadopago.
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
  const currentProducts = inStock.slice(firstIndex, lastIndex);
  const howManyPages = Math.ceil(inStock.length /productsPerPage)
  

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
      <Grid xs={12} sm={12} md={12} lg={12} className={classes.paginationContainer}>
        <Pagination
          products={inStock.length}
          productsPerPage={productsPerPage}
          pages={howManyPages}
          paginate={paginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Grid>
      <Footer />
    </div>
  );
}