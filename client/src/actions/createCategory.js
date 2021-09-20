import { CREATE_CATEGORY, GET_CATEGORIES } from "./index";
import { URL_CATEGORIES, URL_CATEGORY_CREATE } from "../utils/utils";
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
              resolve(imageUrl.push(url)
            );
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

export default function createCategory(payload) {
  return async function () {
    try {
      const image = await uploadImage(payload.image, payload.name)
      await axios.post(URL_CATEGORY_CREATE, {...payload, image});
      const response = await axios.get(`${URL_CATEGORIES}`)
      return {
      type: GET_CATEGORIES,
      payload: response.data
    }
    } catch(err) {
      console.log('En este momento no se puede crear la categoria', err)
    }
  };
}

