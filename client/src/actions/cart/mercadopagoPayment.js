import axios from 'axios';
import { MERCADOPAGO_URL } from '../../utils/utils';
import { MERCADOPAGO_PAYMENT } from './const';

const mercadopagoPayment =  cart => async dispatch => {
    try {
        const { data } = await axios.post(`${MERCADOPAGO_URL}`, { cart });
        dispatch({ type: MERCADOPAGO_PAYMENT });
        window.location.href = data.init_point;
    } catch (error) {
        console.log(error);
    }
};

export default mercadopagoPayment;
