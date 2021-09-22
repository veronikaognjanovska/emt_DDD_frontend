import './App.css';
import React, {Component} from "react";
import Header from '../Header/Header';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import BookService from "../../Service/BookService";
import NotificationService from "../../Notifications/NotificationService";
import BooksList from "../Books/BooksList";
import BookAdd from '../Books/BookAdd/BookAdd';
import BookEdit from '../Books/BookEdit/BookEdit';
import BookView from "../Books/BookView/BookView";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import OrderService from "../../Service/OrderService";
import OrderView from "../Orders/OrderView/OrderView";
import OrdersList from "../Orders/OrdersList";
import Login from "../Login/Login";
import Register from "../Login/Register";
import Logout from "../Login/Logout1";
import UserProfile from "../Users/User";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import UserService from "../../Service/UserService";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            username: undefined,
            books: [],
            orders: [],
            selectedBook: {},
            selectedOrder: {},
        }
    }

    render() {
        return (
            <Router>
                <ReactNotification/>
                <Header/>
                <main>
                    <div className={"container pt-4"}>
                        <Route path={"/login"} exact render={() =>
                            <Login onLogin={this.onLogin}/>}/>
                        <Route path={"/register"} exact render={() =>
                            <Register/>}/>
                        <Route path={"/logout"} exact render={() =>
                            <Logout onLogout={this.onLogout}/>}/>
                        <Route path={"/users/:username"} exact render={() =>
                            <UserProfile/>}/>
                        <Route path={"/orders/view/:id"} exact render={() =>
                            <OrderView
                                order={this.state.selectedOrder}
                            />
                        }/>
                        <Route path={"/orders"} exact render={() =>
                            <OrdersList orders={this.state.orders}
                                        onView={this.onViewGetOrder}/>
                        }/>
                        <Route path={"/shoppingcart"} exact render={() =>
                            <ShoppingCart items={this.state.items}
                                          onOrderAll={this.onOrder}
                                          onRemoveItem={this.onRemoveItemFromSC}/>
                        }/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd
                                addBook={this.addBook}/>
                        }/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit
                                onEditBook={this.editBook}
                                book={this.state.selectedBook}/>
                        }/>
                        <Route path={"/books/view/:id"} exact render={() =>
                            <BookView
                                book={this.state.selectedBook}
                                onAddToShoppingCartBook={this.addToShoppingCartBook}
                            />
                        }/>
                        <Route path={"/books"} exact render={() =>
                            <BooksList books={this.state.books}
                                       onEdit={this.getBook}
                                       onDelete={this.deleteBook}
                                       onView={this.onViewGet}/>
                        }/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        this.loadBooks();
        let username = UserService.getLoggedInUser();
        if (username) {
            this.loadOrders();
            this.loadItems();
            this.setState({
                username: username
            });
        }
    }

    loadBooks = () => {
        BookService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadOrders = () => {
        OrderService.fetchOrders()
            .then((data) => {
                this.setState({
                    orders: data.data
                })
            });
    }

    loadItems = () => {
        OrderService.fetchItems()
            .then((data) => {
                this.setState({
                    items: data.data
                })
            });
    }

    onViewGet = (id) => {
        this.getBook(id);
    }

    onViewGetOrder = (id) => {
        this.getOrder(id);
    }

    onLogin = (username) => {
        this.setState({
            username: username
        });
    }

    onLogout = () => {
        this.setState({
            username: undefined
        });
    }

    getBook = (id) => {
        BookService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    addBook = (bookTitle, bookAuthor, bookQuantity, amount, currency) => {
        BookService.addBook(bookTitle, bookAuthor, bookQuantity, amount, currency)
            .then(() => {
                this.loadBooks();
                NotificationService.success('Success!', 'Book added successfully!')
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Book can not be added!');
            });
    }

    editBook = (id, bookTitle, bookAuthor, bookQuantity, amount, currency) => {
        BookService.editBook(id, bookTitle, bookAuthor, bookQuantity, amount, currency)
            .then(() => {
                this.loadBooks();
                NotificationService.success('Success!', 'Book edited successfully!')
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Book can not be edited!');
            });
    }

    deleteBook = (id) => {
        BookService.deleteBook(id)
            .then(() => {
                this.loadBooks();
                NotificationService.warn('Warning!', 'Book deleted successfully!')
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Book can not be deleted!');
            });
    }

    getOrder = (id) => {
        OrderService.getOrder(id)
            .then((data) => {
                this.setState({
                    selectedOrder: data.data
                })
            });
    }


    addToShoppingCartBook = (book, qty) => {
        OrderService.addToShoppingCartBook(book, qty)
            .then(() => {
                this.loadItems();
                this.loadBooks();
                NotificationService.success('Success!', 'Book added to Shopping Cart successfully!')
                window.location.pathname = "/books";
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Book can not be added to Shopping Cart!')
            });
    }

    onRemoveItemFromSC = (orderItemId) => {
        OrderService.onRemoveItemFromSC(orderItemId)
            .then(() => {
                this.loadItems();
                this.loadBooks();
                NotificationService.warn('Success!', 'Book removed from Shopping Cart successfully!')
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Book can not be removed from Shopping Cart!')
            });
    }

    onOrder = (address) => {
        // window.location.pathname = "/books";
        OrderService.makeOrder(address)
            .then(() => {
                this.loadOrders();
                this.loadItems();
                NotificationService.success('Success!', 'Order made successfully!')
            })
            .catch(error => {
                NotificationService.danger('Error!', 'Order can not be made!')
            });
    }

    reloadSelected() {
        this.loadBooks();
        this.loadOrders();
        this.getBook(this.state.selectedBook.id);
        this.getOrder(this.state.selectedOrder.id);
    }
}

export default App;
