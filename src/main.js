import App from './App.svelte';
import {  server, accessToken, refreshToken, svAxios  } from "./store/Store.js";
import Cookies from '../node_modules/js-cookie/src/js.cookie';
import {fetchUser} from './utils/fetchCurrentUser'
import {initAxios} from './utils/initAxios'
import {validateToken} from './utils/validateToken'

export default app = (async function() {
	try {
	  initAxios();
	  await validateToken();
	  await fetchUser();
	} catch (error) {
	  console.log("User is not logged in");
	}
  
	const app = new App({
		target: document.body,
	});
	
	return app
  })();
  


