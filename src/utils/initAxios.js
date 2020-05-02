import axios from 'axios';
import {  server, accessToken, svAxios  } from "../store/Store.js";

export async function initAxios() {
  const myAxios = axios.create({
    baseURL: server,
    timeout: 10000,
    withCredentials: true,
  });


  myAxios.interceptors.request.use(function (req) {
    let jwt;
    accessToken.subscribe(value => {
        jwt = value;
    });
    if (accessToken) {
      req.headers['Authorization'] = `Bearer ${jwt}`;
    }
    return req;
  });
  svAxios.set(myAxios)
  return myAxios;
}
