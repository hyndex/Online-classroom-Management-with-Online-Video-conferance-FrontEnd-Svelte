<script>
	import page from "page"
	import {  server, accessToken, refreshToken, svAxios, user, pathStore  } from "./store/Store.js";

	function nevigate(ctx,next){
		console.log(`Nevigating to: ,${ctx.path}`)
	}

	import Home from "./pages/home.svelte";
	import Class from "./pages/class.svelte";
	import Assignment from "./pages/assignment.svelte";
	import Note from "./pages/note.svelte";
	import Room from "./pages/room.svelte";
	import Invoice from "./pages/invoice.svelte";
	import Signup from "./pages/signup.svelte";
	import Login from "./pages/login.svelte";
	import Navbar from "./layouts/NavBar.svelte";

	
	page('/',nevigate)
	page('/login',nevigate)
	page('/signup',nevigate)
	page('/assignment',nevigate)
	page('/assignment/*',nevigate)
	page('/note',nevigate)
	page('/home',nevigate)
	page('/note/*',nevigate)
	page('/class',nevigate)
	page('/class/*',nevigate)
	page('/room',nevigate)
	page('/invoice',nevigate)
	page('*',()=>{console.log('ERROR 404')})
	page.start({hashbang:false})
    import { Router, Link, Route } from "svelte-routing";


</script>
<Navbar/>

<Router>
  <div class="container">
  	{#if ($user == false || $accessToken == false)}
	   	<Route path="/" component={Login} />
		<Route path="/signup" component={Signup} />
	   	<Route path="*" component={Login} />
	{:else}
		<Route path="/home" component={Home} />
		<Route path="/" component={Home} />
		<Route path="/class/:id" component={Class} />
		<Route path="/home" component={Home} />
		<Route path="/assignment" component={Assignment} />
		<Route path="/note" component={Note} />
		<Route path="/room" component={Room} />
		<Route path="/invoice" component={Invoice} />
		<Route path="*" component={Home} />
  	{/if}   
  </div>
</Router>