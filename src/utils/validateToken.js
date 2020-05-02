import {  server, accessToken, refreshToken, svAxios  } from "../store/Store.js";
import Cookies from "js-cookie"


export async function validateToken() {
    let refresh_token = Cookies.get('refresh_token');
    console.log(server)
    
    if (refresh_token) {
        let axios;
        svAxios.subscribe(value => {
            axios = value;
        });
        // Fetch access_token
        let response = await axios.post('/auth/token/refresh/', {
            refresh: refresh_token
        });
        if (response.data.access) {
            console.log('Access',response.data.access)
            refreshToken.set(refresh_token)
            accessToken.set(response.data.access)
            Cookies.set('refresh_token', refresh_token)
            Cookies.set('access_token', response.data.access)
        }
    } else {
        refreshToken.set(false)
        accessToken.set(false)
        Cookies.set('refresh_token', false)
        Cookies.set('access_token', false)
        throw new Error('Refresh token not found');
    }
    
};
