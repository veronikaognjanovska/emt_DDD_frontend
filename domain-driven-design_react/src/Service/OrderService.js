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

    makeOrder: (address) => {
        console.log("asdasdad")
        return axios.put(`${OrderURL}/${UserService.getLoggedInUser()}/makeorder`, {
            'address': address
        });
    },

    addToShoppingCartBook: (book, qty) => {
        return axios.put(`${OrderURL}/${UserService.getLoggedInUser()}/add`, {
            'quantity': qty,
            'book': book
        });
    },

    onRemoveItemFromSC: (orderItemId) => {
        return axios.put(`${OrderURL}/${UserService.getLoggedInUser()}/remove`, {
            'orderItemId': orderItemId
        });
    },
};

export default OrderService;
