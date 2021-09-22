import React, {Component} from 'react';
import '../App/App.css';
import NotificationService from "../../Notifications/NotificationService";
import './Login.css';
import UserService from "../../Service/UserService";

class Logout extends Component {

    onLogout = () => {
        let message = '';
        try {
            UserService.setLoggedInUser(null);
            message = 'User is logged out!';
            NotificationService.success('Success!', message);
            this.props.onLogout();
        } catch (e) {
            message = 'User can not log out';
            NotificationService.danger('Error!', message);
        }
        return message;
    };

    render() {
        return (
            <div className={''}>
                <div className={'row m-2 mt-4'}>
                    <div className={'col-sm-12 d-flex justify-content-center'}>
                        <h3>
                            {this.onLogout()}
                        </h3>
                    </div>
                </div>
            </div>
        );
    }

    componentDidMount() {
    }

}


export default Logout;