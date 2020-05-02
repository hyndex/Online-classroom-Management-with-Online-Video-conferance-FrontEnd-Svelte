import {  server, accessToken, refreshToken, svAxios, user  } from "../store/Store.js";
import Cookies from "js-cookie"


export async function fetchUser() {
    let axios;
    svAxios.subscribe(value => {
        axios = value;
    });
    let response = await axios.get("/auth/user/");
    let userObj = response.data;
    if (response.data){
        user.set(userObj)
        Cookies.set('user', userObj)
    }
    else{
        console.log('yoyo')
        user.set(false)
    }
    
}
