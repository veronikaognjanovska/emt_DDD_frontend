import React, {Component} from 'react';
import UserService from "../../Service/UserService";

import '../App/App.css';
import {Link} from "react-router-dom";


class UserProfile extends Component {


    constructor(props) {
        super(props);
        this.state = {
            data: "", //<- should be user
            show: false,
            showEdit: false,
            type: '',
            dataList: [],
            loggedInUserUsername: undefined,
            loggedInUserFollowing: []
        }
    }

    render() {
        return (
            <div className="row book-view">
                <div className={"button-left"}>
                    <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
                </div>
                <div className={"col-sm-12 m-4"}>
                    <h1>User Info</h1>
                </div>
                <div className={"col-sm-12"}>
                    <form>
                        <div className="form-group">
                            <label>Username</label>
                            <input type="text"
                                   className="form-control"
                                   id="username"
                                   name="username"
                                   value={this.state.data?.username}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Email</label>
                            <input type="text"
                                   className="form-control"
                                   id="email"
                                   name="email"
                                   value={this.state.data?.email}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Birthday</label>
                            <input type="text"
                                   className="form-control"
                                   id="birthday"
                                   name="birthday"
                                   value={this.state.data?.birthday}
                                   disabled
                            />
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    componentDidMount() {
        this.getLoggedInUser();
        this.loadUser(this.getUrl());
    }

    componentDidUpdate() {
        const username = this.getUrl();
        if (username !== this.state.username) {
            this.loadUser(username);
        }
    }

    getLoggedInUser = () => {
        this.setState({
            loggedInUserUsername: UserService.getLoggedInUser()
        });
    }

    getUrl = () => {
        const path = window.location.pathname.toString().split('/');
        const username = path[path.length - 1];
        return username;
    }

    loadUser = (username) => {
        UserService.fetchUser(username)
            .then((data) => {
                this.setUser(data);
            });
    }

    setUser = (data) => {
        const birthdayStirng =
            data.data.birthday.substr(0, 4) + '-' + data.data.birthday.substr(5, 2) + '-' + data.data.birthday.substr(8, 2);
        const user = {
            ...data.data,
            birthday: birthdayStirng
        }
        this.setState({
            data: user,
            username: user.username
        })
    }


}


export default UserProfile;