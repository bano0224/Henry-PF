import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
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

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    maxHeight: 450,

  },
  
  action: {
    marginTop: "1rem",
    textDecoration: "none",
  },
  title:{
    width:"100%",
    height:"20px",
    overflow:"hidden",
    textOverflow: "ellipsis",
  },
  media: {
    height: "100%",
    width: "100%",
    paddingTop: "90%", // 16:9
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
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductCard({name, image, description, price, id}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch()

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleCart = () => {
    dispatch(addToCart(id, 1))
    alert("El producto a sido agregado al carrito");
  }

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Typography
            className={classes.action}
            variant="h5"
            color="textSecondary"
          >
            {accounting.formatMoney(price)}
          </Typography>
        }
        title={
          <Typography
          className={classes.title}
          >
            {name}
          </Typography>
        }
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
                  style={{ color: blueGrey[900] }}
                  aria-label="open drawer"
                  className={classes.button}
                  id='button'
                  onClick={handleCart}
                  
              >
                  <AddShoppingCart/>
      </IconButton>
      <IconButton
          title="Detalles"
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          style={{ color: blueGrey[900] }}
          aria-label="show more"
          className={classes.button}
          component={Link}
          to={`/detail/${id}`}

        >
          <InfoIcon/>
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>
            {description}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}