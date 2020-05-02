<script>
    import {  server, accessToken, refreshToken, svAxios, user } from "../store/Store.js";
    import { onMount } from 'svelte';
    import { writable } from "svelte/store";
    import { Router, Link, Route } from "svelte-routing";
    let classes=[]
    let members=[]
    let memberUsername=''
    const render=writable(false)
    $: renderNow=render
 
    const editClassData ={
        id:'',
        name:'',
        description:'',
    }
    let createClassData ={
        id:'',
        name:'',
        description:'',
    }
    let addMemberData ={
        username:'',
    }
    let selectedClass=[]
    let classLink=[]
    onMount(async () => {
        const res = await $svAxios.get('/group/');
        if(res.data){
            classes=await res.data;
            classLink=[]
            classes.forEach(temp => {
              classLink.push('class/'+temp.id)
            });
        }
    });
    
    async function deleteClass(id){
        const res = await $svAxios.delete('/group/'+id+'/');
        if(res.status<400){
            classes=classes.filter(p => p.id !== id);
            classLink=[]
            classes.forEach(temp => {
              classLink.push('class/'+temp.id)
            });
            console.log('success')
        }
        console.log('deleting:',id)
    }
    function deleteMember(id){
        console.log('deleting:',id)
    }
    function editClass(id){
        console.log('edit:',id)
    }
    async function fetchMembers(id){
        const res = await $svAxios.get('/add/');
        if(res.data){
            members = await res.data;
            console.log(members)
        }
    }

    async function sumbitCreateClass(event){
        event.preventDefault();
        const res = await $svAxios.post('/group/', {
        name: createClassData.name,
        description: createClassData.description
        });
        if(res.data){
            let newClass = await res.data;
            classes = [newClass, ...classes]
            classLink=[]
            classes.forEach(temp => {
              classLink.push('class/'+temp.id)
            });
            console.log(newClass)
        }
    }

    function enterClass(temp){
        editClassData.id=temp.id
        editClassData.name=temp.name
        editClassData.description=temp.description
        console.log('selected class:',editClassData)
        render.set(true)
    }
    let temp;

    async function addMemmber(id){
      const member = await svAxios.post('/add/',{
          username: memberUsername,
          groupid: id,
          role:"student" 
      
      })
      if (member.data){
        
      }
    }
</script>

<main role="main">
    <div class="album py-2">
        <div class="container">
            <button type="button" class="btn btn-primary my-2" data-toggle="modal" data-target="#groupModal">
                Create New Class
            </button>
            <div class="row">
            <!-- cards for classes starts-->
            {#each classes as  classroom, index}
               <div class="col-md-4">
                    <div class="card mb-4 shadow-sm" >
                        <svg class="bd-placeholder-img card-img-top" width="100%" height="150" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img" aria-label="Placeholder: Thumbnail"><title></title><rect width="100%" height="100%" fill="#55595c"/><text class="float-left" x="50%" y="50%" fill="#eceeef" dy=".3em">{classroom.name}</text></svg>
                        <div class="card-body">
                            
                            <p class="card-text">Description: {classroom.description.slice(0,15)} ..</p>
                            <div class="d-flex justify-content-between align-items-center">
                                <div class="btn-group">
                                    <button type="button" class="btn btn-sm btn-outline-secondary" on:click={()=>deleteClass(classroom.id)}>Delete</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" data-whatever={classroom.id} on:click={()=>editClass(classroom)} data-toggle="modal" data-target="#groupeditModal">Edit</button>
                                    <button type="button" class="btn btn-sm btn-outline-secondary" on:click={()=>fetchMembers(classroom.id)} data-toggle="modal" data-target="#roleListModal">Members</button>
                                
                                    <Link to={classLink[index]} ><button type="button" class="btn mx-2 btn-sm btn-outline-secondary" on:click={()=>enterClass(classroom.id)}>Enter</button></Link>

                                </div>
                                <small class="text-muted">9 mins</small>
                            </div>
                        </div>
                    </div>
                </div>
            {/each}
            <!-- cards for classes end-->
            </div>
        </div>
    </div>
</main>


<!-- Modals Start-->

<!-- Class Create Modal -->
<div class="modal fade" id="groupModal" tabindex="-1" role="dialog" aria-labelledby="groupModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupModalLabel">New group</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={sumbitCreateClass}>
          <div class="form-group">
            <label for="groupModalPhone1">Name</label>
            <input type="text" class="form-control" bind:value={createClassData.name}  aria-describedby="name">
          </div>
          <div class="form-group">
            <label for="groupModalPassword1">Description</label>
            <input type="test" class="form-control" bind:value={createClassData.description} >
          </div>
          <button type="submit" class="btn btn-primary" data-toggle="modal" data-target="#groupModal">Create</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Class Create Modal ended-->


<!-- Class Edit Modal -->
<div class="modal fade" id="groupeditModal" tabindex="-1" role="dialog" aria-labelledby="groupModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="groupModalLabel">Edit group</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form>
          <div class="form-group">
            <input type="text" disabled="disabled" class="form-control"  aria-describedby="group">
          </div>
          <div class="form-group">
            <label for="groupModalPhone1">Name</label>
            <input type="text" class="form-control" bind:value={editClassData.name} aria-describedby="name">
          </div>
          <div class="form-group">
            <label for="groupModalPassword1">Description</label>
            <input type="test" class="form-control" bind:value={editClassData.description} >
          </div>
          <button type="submit" class="btn btn-primary">Update</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Class Edit Modal ended-->

  <!-- Roles list modal start-->

  <div class="modal fade" id="roleListModal" tabindex="-1" role="dialog" aria-labelledby="roleListModal" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="roleListModaTitle">Members </h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div class="input-group mb-3">
          <input type="text" class="form-control" bind:value={memberUsername} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" on:click={()=>console.log(memberUsername)} type="button" id="button-addon2">Add</button>
          </div>
        </div>
          {#if members.length === 0}
              <h1>No Members Found ...</h1>
            {:else}
            <ul class="list-group">
              {#each members as member}
                <li class="list-group-item d-flex justify-content-between align-items-center" data-toggle="popover" title={member.profile.user.username} >
                  {member.profile.name}   {member.role}  
                  <button class="badge badge-danger badge-pill mx-1" on:click={() => deleteMember(member.id)}>x</button>
                </li>
              {/each}
              </ul>
            {/if}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>


  <!-- Roles modal end-->

<!-- Modals End-->