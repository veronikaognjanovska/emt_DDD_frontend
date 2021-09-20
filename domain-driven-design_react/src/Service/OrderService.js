import axios from "../custom-axios/axios";
import UserService from "./UserService";

const OrderURL = 'http://localhost:5792/api/orders';

const OrderService = {

    fetchOrders: () => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}`);
    },

    getOrder: (id) => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}/${id}`);
    },

    fetchItems: (id) => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}/items`);
    },

    makeOrder: (id) => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}/makeorder`);
    },

    addToShoppingCartBook: (bookId) => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}/add/${bookId}`);
    },

    onRemoveItemFromSC: (bookId) => {
        return axios.get(`${OrderURL}/${UserService.getLoggedInUser()}/remove/${bookId}`);
    },
};

export default OrderService;
