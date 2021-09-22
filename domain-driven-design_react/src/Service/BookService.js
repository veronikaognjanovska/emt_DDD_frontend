import axios from "../custom-axios/axios";

const BookURL = 'http://localhost:5791/api/books';

const BookService = {

    fetchBooks: () => {
        return axios.get(`${BookURL}`);
    },

    getBook: (id) => {
        return axios.get(`${BookURL}/${id}`);
    },


    addBook: (bookTitle, bookAuthor, bookQuantity, amount, currency) => {
        return axios.post(`${BookURL}/add`, {
            "bookTitle": bookTitle,
            "bookAuthor": bookAuthor,
            "quantity": bookQuantity,
            "amount": amount,
            "currency": currency
        });
    },

    editBook: (id, bookTitle, bookAuthor, bookQuantity, amount, currency) => {
        return axios.put(`${BookURL}/edit/${id}`, {
            "bookTitle": bookTitle,
            "bookAuthor": bookAuthor,
            "quantity": bookQuantity,
            "amount": amount,
            "currency": currency
        });
    },

    deleteBook: (id) => {
        return axios.delete(`${BookURL}/delete/${id}`);
    },


};

export default BookService;
