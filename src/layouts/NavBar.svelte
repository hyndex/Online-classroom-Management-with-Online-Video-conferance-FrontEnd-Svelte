<script>
import {  server, accessToken, refreshToken, svAxios, user,loadingstore,pathStore  } from "../store/Store.js";
import Cookies from "js-cookie"
import Home from "../pages/home.svelte";
import Login from "../pages/login.svelte";
import { Router, Route, navigate, Link } from "svelte-routing";
let logout=false

async function handleLogout(){
      
      confirm('Are you sure')
      const res = await $svAxios.post('/auth/logout/')
      Cookies.set('refresh_token', false)
      Cookies.set('access_token', false)
      accessToken.set(false)
      user.set(false)
      refreshToken.set(false)
}

</script>
<Router>
<nav class="navbar navbar-expand-lg navbar-light bg-light d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <a class="navbar-brand" href="#">GoToClass.Online</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
          <Link to='/'>
            <a class="nav-link" href="#">Home<span class="sr-only">(current)</span></a>
          </Link>
      </li>
      <li class="nav-item">
        <Link to='/invoice'>
          <a class="nav-link" href="#" aria-disabled="true">Profile</a>
        </Link>
      </li>
      <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Tutorials
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
          <a class="dropdown-item" href="#">How to Create a Class</a>
          <a class="dropdown-item" href="#">How to Add students to Class</a>
          <a class="dropdown-item" href="#">How to Create a Assignment</a>
          <a class="dropdown-item" href="#">How to Create a Notes</a>
          <a class="dropdown-item" href="#">How to submit a Assignment</a>
          <a class="dropdown-item" href="#">How to Start a Class</a>
          <a class="dropdown-item" href="#">How to Join a Class</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Have more question?</a>
        </div>
      </li>
      <li class="nav-item">
        <a class="nav-link disabled mx-5" href="#" tabindex="-1" aria-disabled="true">{$user.username}</a>
      </li>
      {#if $loadingstore==true}
          <div class="spinner-grow ml-2 text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow ml-2 text-primary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-secondary" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-success" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-danger" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-warning" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-info" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-light" role="status">
            <span class="sr-only">Loading...</span>
          </div>
          <div class="spinner-grow text-dark" role="status">
            <span class="sr-only">Loading...</span>
          </div>
    
      {/if}
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <!-- Search bar 
      <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> 
      -->
      {#if $accessToken == false}
          <button class="btn btn-outline-warning my-2 mx-2 my-sm-0" type="submit">Log In</button>
          <button class="btn btn-outline-success my-2 mx-2 my-sm-0" type="submit">Sign Up</button>
      {:else}
         <a class="btn btn-outline-danger my-2 mx-2 my-sm-0" on:click={()=>{handleLogout()}} type="submit">Log Out</a>
      {/if}
      
      
    </form>
  </div>
</nav>
</Router>
