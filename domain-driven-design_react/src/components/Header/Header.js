import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';
import UserService from "../../Service/UserService";
import {subscriber} from "../../Service/StorageService";

const Header = (props) => {

    let username = UserService.getLoggedInUser();

    const userUrl = "/users/" + username;
    const getChange = () => {
        username = UserService.getLoggedInUser();
    }

    subscriber.subscribe((v) => {
        getChange();
    })

    return (
        <header className={"fixed-top"}>
            <nav className={"navbar navbar-inverse bg-my"}>
                <div className={"container-fluid"}>
                    <div className={"navbar-header"}>
                        <span className={"navbar-brand header-font"}>Domain Driven Design</span>
                    </div>
                    <div className={"navbar-header navbar-right"}>
                        <Link className={"btn btn-outline-light"} to={"/books"}>Books</Link>
                        {
                            username === undefined &&
                            <div className="d-inline">
                                <Link to={"/login"} className={"btn btn-outline-light ml-2"}>Log in</Link>
                                <Link to={"/register"} className={"btn btn-outline-light ml-2"}>Register</Link>
                            </div>
                        }
                        {
                            username !== undefined &&
                            <div className="d-inline">
                                <Link className={"btn btn-outline-light ml-2"} to={"/shoppingcart"}>Shopping Cart</Link>
                                <Link className={"btn btn-outline-light ml-2"} to={"/orders"}>Orders</Link>
                                <Link to={userUrl} className={"btn btn-outline-light ml-2"}>User</Link>
                                <Link to={"/logout"} className={"btn btn-outline-light ml-2"}>Log out</Link>
                            </div>
                        }
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header;
