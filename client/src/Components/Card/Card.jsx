import React from "react";
import { makeStyles, alpha, withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from '@material-ui/core/Avatar';
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import { blueGrey } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { AddShoppingCart } from "@material-ui/icons";
import accounting from "accounting";
import addToCart from "../../actions/cart/addToCart";
import { useDispatch } from "react-redux";
import InfoIcon from '@material-ui/icons/Info';
import StoreIcon from '@material-ui/icons/Store';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Label from '@mui/icons-material/Label';
import {Badge} from '@material-ui/core'
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Swal from 'sweetalert2'
import addToWishList from "../../actions/users/addToWishList";
import jwt from 'jsonwebtoken'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 530,
    backgroundColor: "white",
  },
  
  action: {
    marginTop: theme.spacing(1),
    color: red[900]
  },
  title:{
    width:"90%",
    height:"20px",
    overflow:"hidden",
    textOverflow: "ellipsis",
    color: "black"
  },
  stock:{
    color: 'red'
  },
  media: {
    height: "100%",
    width: "100%",
    paddingTop: "100%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  content: {
    padding: "10px",
  },
  avatar: {
    fontFamily:'Kalam',
    backgroundColor: red[900],
  },
  stock: {
    color: 'red',
    fontSize: '80%'
  },
  stock1: {
    color: 'white',
    fontSize: '80%'
  }
}));
const StyledBadge = withStyles((theme) => ({
  badge: {
    right: 12,
    top: 12,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}))(Badge);

const longText = `Añadir al carrito`;
const longTextI = `Detalles del Producto`;
const longTextC = `Añadir a Favoritos`;

export default function ProductCard({name, image, description, price, id, stock, countInStock, discount}) {
  console.log("DISCOUNTTT", discount)
  let newPrice
  discount > 0
  ? 
  newPrice= price-(price*discount/100)
  :
  newPrice= price
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()

  const key = JSON.parse(sessionStorage.getItem("token"))?.token
  if(key){
    var decoded = jwt.verify(key, 'secret')
    var userId = (decoded.id)
  }

  const handleFavorite = () => {
    dispatch(addToWishList({idProduct: id, idUser: userId}))

    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto ha sido añadido a favoritos',
      showConfirmButton: false,
      timer: 1500
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCart = () => {
    dispatch(addToCart(id, 1))
    
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'El producto ha sido añadido al carrito',
      showConfirmButton: false,
      timer: 1500
    })
  }

  /* const handleHeart = () => {
    dispatch()
  } */

  return (
    <Card className={classes.root}>
      <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          <StoreIcon/>
        </Avatar>
      }
        action={
          <IconButton aria-label="settings" className={classes.action} >
            <Tooltip title={longTextC}>
            <FavoriteBorderOutlinedIcon onClick={handleFavorite}/>
            </Tooltip>
          </IconButton>
        }
        title={
          <Typography
          className={classes.title}
          >
            {name}
          </Typography>
        }
        subheader={accounting.formatMoney(newPrice)}
      />
      <CardMedia
        className={classes.media}
        image={image}
        title={name}
        component={Link}
        to={`/detail/${id}`}
      />
      <CardActions disableSpacing>
      <IconButton
                  title="AÃ±adir al carrito"
                  style={{ color: /*"white"*/ blueGrey[900]  }}
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  onClick={handleCart}
                  
              >
                  <Tooltip title={longText}>
                    <AddShoppingCart sx={{ m: 1 }}/>
                  </Tooltip>
      </IconButton>
      <IconButton
          title="Detalles"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          style={{ color: /* "white" */blueGrey[900] }}
          aria-label="show more"
          className={classes.button}
          component={Link}
          to={`/detail/${id}`}

        >
          <Tooltip title={longTextI}>
          <InfoIcon/>
          </Tooltip>
        </IconButton>
        {discount > 0 ? 
            <IconButton
              style={{ color: blueGrey[900] }}
              aria-label="show more"
              className={classes.button}
            >

              <StyledBadge badgeContent={
                  discount > 0 ? 
                    `${discount}%`
                  : 
                    null
                }
                  color="secondary">
                  <Label/>
              </StyledBadge>
            </IconButton>
        :
            null    
        }
          <Typography
          className={classes.stock}
          >
           {stock > 0 ? null : '¡SIN STOCK!'}
          </Typography>
          <Typography
          className={classes.stock1}
          >
            {
            stock <= 10
            ?
            `Ultimos ${stock}!!!`
            :
              null
            }
          </Typography>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          style={{ color: /*"white"*/ blueGrey[900]  }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent /*  className={classes.content}  */>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}