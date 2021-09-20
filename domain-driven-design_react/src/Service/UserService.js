import {StorageService} from './StorageService';
import axios from "../custom-axios/axios";

const UserURL = 'http://localhost:5793/api/users';
const AuthURL = 'http://localhost:5793/api/auth';

const UserService = {

    // followUser: (username2) => {
    //     return axios.put(`${UserURL}/${StorageService.getLoggedInUser()?.username}/follow/${username2}`, {});
    // },
    // unfollowUser: (username2) => {
    //     return axios.put(`${UserURL}/${StorageService.getLoggedInUser()?.username}/unfollow/${username2}`, {});
    // },

    fetchUser: (username) => {
        return axios.get(`${UserURL}/${username}`);
    },

    register: (username, password, repeatPassword, email, birthday) => {
        return axios.post(`${AuthURL}/register`, {
            "username": username,
            "password": password,
            "repeatPassword": repeatPassword,
            "email": email,
            "birthday": birthday
        });
    },
    login: (username, password) => {
        return axios.post(`${AuthURL}/login`, {
            "username": username,
            "password": password
        });
    },


    getLoggedInUser: () => {
        return StorageService.getLoggedInUser()?.username;
    },
    setLoggedInUser: (data) => {
        if (data === null) {
            StorageService.setLoggedInUser(data);
        }
        StorageService.setLoggedInUser(data);
    },
    // getFollowingLoggedIn: () => {
    //     const username = StorageService.getLoggedInUser()?.username;
    //     if (username !== null & username !== undefined) {
    //         return UserService.fetchUserFollowing(username)
    //             .then((data) => {
    //                 let list = data.data.map(item => {
    //                     return {username: item.username}
    //                 });
    //                 StorageService.setUserFollowing(list);
    //                 return Promise.resolve({username: username, following: list});
    //             });
    //     }
    //     return Promise.resolve('null');
    // },


};

export default UserService;