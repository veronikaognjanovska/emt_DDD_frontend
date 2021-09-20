import React, {Component} from 'react';
import UserService from "../../Service/UserService";
import '../App/App.css';
import NotificationService from "../../Notifications/NotificationService";
import './Login.css';

class Register extends Component {

    onFormSubmit = (e) => {
        e.preventDefault();
        let username = e.target.username.value;
        let password = e.target.password.value;
        let repeatPassword = e.target.repeatPassword.value;
        let email = e.target.email.value;
        let birthday = e.target.birthday.value;
        if (this.validate(username, password, repeatPassword, email, birthday)) {
            this.onRegister(username, password, repeatPassword, email, birthday);
        } else {
            NotificationService.danger('Error!', 'Please enter valid information!');
        }
    }

    onRegister = (username, password, repeatPassword, email, birthday) => {
        UserService.register(username, password, repeatPassword, email, birthday)
            .then(() => {
                NotificationService.success('Success!', 'User is registered!');
                // redirect to login
                window.location.pathname = "/login"
            })
            .catch(function () {
                NotificationService.danger('Error!', 'User can not be registered!');
            });
    }

    validate = (username, password, repeatPassword, email, birthday) => {
        if (username === '' || password === '' || repeatPassword === '' || email === '' || birthday === '') {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div className={'form-login'}>
                <form onSubmit={this.onFormSubmit}>
                    <div className={'row m-2 mt-4'}>
                        <div className={'col-sm-12 d-flex justify-content-center'}>
                            <h3>Register</h3>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="text"
                               className="form-control"
                               id="username"
                               name="username"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                               className="form-control"
                               id="password"
                               name="password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeatPassword">Repeat password</label>
                        <input type="password"
                               className="form-control"
                               id="repeatPassword"
                               name="repeatPassword"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="text"
                               className="form-control"
                               id="email"
                               name="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="birthday">Birthday</label>
                        <input type="date"
                               className="form-control"
                               id="birthday"
                               name="birthday"
                        />
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary float-right"}
                    >Submit
                    </button>
                </form>
            </div>
        );
    }

    componentDidMount() {

    }

}


export default Register;