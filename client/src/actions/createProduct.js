import { CREATE_PRODUCT } from "./index";
import { URL_PRODUCT_CREATE } from "../utils/utils";
import axios from "axios";
import { storage } from "../firebase";

const uploadImage = async (img, name) => {
  let imageUrl = [];
  const image = await img.map(image => {
    return new Promise((resolve, reject) => {
      const storageRef = storage.ref();
      const uploadTask = storageRef.child(`/product_images/${name}`).put(image);
      uploadTask.on(
        'state_changed',
        snapshot => {},
        error => {reject(error)},
        async () => {
          await storage
            .ref('product_images')
            .child(name)
            .getDownloadURL()
            .then(url => {
              resolve(imageUrl.push(url));
            });
        }
      );
    })
  });
  return Promise.all(image)
    .then(response => {
      return imageUrl[0];
    })
};

export default function createProduct(product) {
  return async function (dispatch) {
    try {
      const imageUrl = await uploadImage(product.imageUrl, product.name);
      const { price, countInStock } = product;
      const post = (await axios.post(URL_PRODUCT_CREATE, { ...product, imageUrl, price: parseInt(price), countInStock: parseInt(countInStock) })).data;
      dispatch({
        type: CREATE_PRODUCT,
        post,
      })
    } catch(err) {
      console.log('En este momento no se puede crear el producto', err);
    }
    
  };
}
