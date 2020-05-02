<script>
    import queryString from "query-string";
    import {  server, pathStore, stream, accessToken, refreshToken, svAxios, user, classCurrentFileStore, roomStore ,  classCurrentListStore,loadingstore, classEditDataStore, classCurrentComponentStore} from "../store/Store.js";
    import { onMount } from 'svelte';
    import { writable } from "svelte/store";
    import { Router, Link, Route } from "svelte-routing";
    import Cookies from "js-cookie"
    import Home from './home.svelte'

    let id;
    let username=''
    let email=''
    let assignments=[]
    let notes=[]
    let assignmentLink=[]
    let noteLink=[]
    let rooms=[]
    let currentList=[]
    let currentLink=[]
    let group=false
   
    let createAssignmentData={
        title:'',
        description:'',
        deadline:'',
    }
    let createNoteData={
        title:'',
        description:'',
    }
    let createSubmitData={
        title:'',
        description:'',
    }
    let files
    let editAssignmentData={
        id:'',
        title:'',
        description:'',
        deadline:'',
    }
    let editNoteData={
        id:'',
        title:'',
        description:'',
    }
    let editSubmitData={
        id:'',
        title:'',
        description:'',
    }
    let selectedTab={
        assignment:'nav-link active',
        note:'nav-link',
        room:'nav-link'
    }
    let dataTargetEditModal='"#assignmenteditModal"'
    let currentTab='assignment'
    async function changeTab(tab){
        if(tab==='note'){
            classCurrentListStore.set([])
            selectedTab.assignment='nav-link'
            selectedTab.note='nav-link active'
            selectedTab.room='nav-link'
            currentTab='note'
            stream.set(false)
            dataTargetEditModal="#noteEditModal"
            await loadNote(id)
            currentList=notes
            classCurrentListStore.set(notes)
            console.log('List',assignments)
            currentLink=noteLink
            
        }
        if(tab==='assignment'){
            classCurrentListStore.set([])
            selectedTab.assignment='nav-link active'
            selectedTab.note='nav-link '
            selectedTab.room='nav-link'
            currentTab='assignment'
            stream.set(false)
            dataTargetEditModal="#assignmenteditModal"
            await loadAssignment(id)
            currentList=assignments
            classCurrentListStore.set(assignments)
            console.log('List',assignments)
            currentLink=assignmentLink
        }
        if(tab==='room'){
            classCurrentListStore.set([])
            selectedTab.assignment='nav-link'
            selectedTab.note='nav-link '
            selectedTab.room='nav-link active'
            currentTab='room'
            await getRoom()
            currentLink=[]
            classCurrentListStore.set([])
        }
    }
    
    async function getRoom(){
      const res=await $svAxios.get('/class/room/?status=open&group__id='+id)
      if (res.data){
        roomStore.set(res.data)
      }
      else{
        roomStore.set(false)
      }
    }
    if (typeof window !== 'undefined') {
        id = window.location.pathname.slice(7,100)    
        console.log(id)
        loadAssignment(id)
        currentList=assignments
        classCurrentListStore.set(assignments)
        console.log('List',assignments)
        currentLink=assignmentLink
    }

    onMount(async () => {
        loadingstore.set(true)
        id=window.location.pathname.slice(7,100)
        const res = await $svAxios.get('/class/assignment/?group__id=' + id)
        group = await $svAxios.get('/group/'+ id+'/')
        group=group.data
        console.log(group)
        username=$user.username
        email=$user.email
        if(res.data){
          classCurrentListStore.set(res.data)
          currentLink=[]
          $classCurrentListStore.forEach(temp => {
            currentLink.push('class/assignment/'+temp.id)
          })
        }
        loadingstore.set(false)
    })
    async function loadAssignment(id) {
      loadingstore.set(true)
            const res = await $svAxios.get('/class/assignment/?group__id=' + id);
            if(res.data){
                assignments=await res.data;
                assignmentLink=[]
                assignments.forEach(temp => {
                assignmentLink.push('class/assignment/'+temp.id)
            });
            
        }
      loadingstore.set(false)
    } 
    async function loadNote(id) {
      loadingstore.set(true)
            const res = await $svAxios.get('/class/notes/?group__id=' + id);
            if(res.data){
                notes=await res.data;
                noteLink=[]
                notes.forEach(temp => {
                noteLink.push('class/note/'+temp.id)
            });
            
        }
      loadingstore.set(false)
    } 

    async function submitCreateAssignment(event){
      
        event.preventDefault();
        loadingstore.set(true)
        const res = await $svAxios.post('/class/assignment/', {
            groupid:id,
            title: createAssignmentData.title,
            description: createAssignmentData.description,
            deadline: createAssignmentData.deadline//.replace(/-/g, '')
        });
        if(res.data){
            console.log()
            let newAss = await res.data;
            let fileres
            var multifiles = files;
            for (var i = 0; i < files.length; i++) {
              var formData = new FormData();
              formData.append("file", files[i]);
              fileres=await $svAxios.put('/class/assignment_upload/'+newAss.id+'/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            }
            
            newAss = await $svAxios.get('/class/assignment/'+newAss.id+'/')
            newAss=newAss.data
            assignments = [newAss, ...assignments]
            assignmentLink=[]
            assignments.forEach(temp => {
                assignmentLink.push('class/assignment/'+temp.id)
            });
            classCurrentListStore.set(assignments)
        }
        loadingstore.set(false)
    }
    async function submitEditAssignment(event){
        event.preventDefault();
        loadingstore.set(true)
        const res = await $svAxios.put('/class/assignment/'+$classEditDataStore.id+'/', {
        groupid:id,
        title: $classEditDataStore.title,
        description: $classEditDataStore.description,
        deadline: $classEditDataStore.deadline
        });
        if(res.data){
            let updAss = await res.data;
            assignments=assignments.filter(p => p.id !== updAss.id);
            let fileres
            var multifiles = files;
            for (var i = 0; i < files.length; i++) {
              var formData = new FormData();
              formData.append("file", files[i]);
              fileres=await $svAxios.put('/class/assignment_upload/'+updAss.id+'/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
              console.log(updAss.id)
            }
            updAss = await $svAxios.get('/class/assignment/'+updAss.id+'/')
            updAss=updAss.data
            assignments = [updAss, ...assignments]            
            assignmentLink=[]
            assignments.forEach(temp => {
                assignmentLink.push('class/assignment/'+temp.id)
            });
            classCurrentListStore.set(assignments)
        }
        loadingstore.set(false)
    }
    async function submitCreateNote(event){
        event.preventDefault();
        loadingstore.set(true)
        const res = await $svAxios.post('/class/notes/', {
        groupid:id,
        title: createNoteData.title,
        description: createNoteData.description,
        });
        if(res.data){
            let newNote = await res.data;
            let fileres
            var multifiles = files;
            for (var i = 0; i < files.length; i++) {
              var formData = new FormData();
              formData.append("file", files[i]);
              fileres=await $svAxios.put('/class/notes_upload/'+newNote.id+'/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            }
            newNote = await $svAxios.get('/class/notes/'+newNote.id+'/')
            newNote=newNote.data
            notes = [newNote, ...notes]
            noteLink=[]
            notes.forEach(temp => {
                noteLink.push('class/notes/'+temp.id)
            });
            classCurrentListStore.set(notes)
        }
        loadingstore.set(false)
    }

    async function submitEditNote(event){
        event.preventDefault();
        loadingstore.set(true)
        const res = await $svAxios.put('/class/notes/'+$classEditDataStore.id+'/', {
        groupid:id,
        title: $classEditDataStore.title,
        description: $classEditDataStore.description,
        });
        if(res.data){
            let updNt = await res.data;
            notes=notes.filter(p => p.id !== updNt.id);
            let fileres
            var multifiles = files;
            for (var i = 0; i < files.length; i++) {
              var formData = new FormData();
              formData.append("file", files[i]);
              fileres=await $svAxios.put('/class/notes_upload/'+updNt.id+'/', formData, {headers: {'Content-Type': 'multipart/form-data'}})
            }
            updNt = await $svAxios.get('/class/notes/'+updNt.id+'/')
            updNt=updNt.data
            notes = [updNt, ...notes]
            noteLink=[]
            notes.forEach(temp => {
                noteLink.push('class/notes/'+temp.id)
            });
            classCurrentListStore.set(notes)
        }
        loadingstore.set(false)
    }
    async function submitCreateSubmit(event){
        event.preventDefault();
        loadingstore.set(true)
        const res = await $svAxios.post('/class/submit/', {
        title: createNoteData.title,
        description: createNoteData.description,
        });
        if(res.data){
            let newsubmit = await res.data;
            console.log(newsubmit)
        }
        loadingstore.set(false)
    }

    async function handleDelete(item){
      confirm('Are you sure')
      loadingstore.set(true)
      if (currentTab==='note'){
        const res = await $svAxios.delete('/class/notes/'+item.id+'/')
        if(res.status < 400){
          notes=notes.filter(p => p.id !== item.id);
          console.log('success')
          classCurrentListStore.set(notes)
          currentLink=[]
          $classCurrentListStore.forEach(temp => {
            currentLink.push('class/notes/'+temp.id)
          })
        }
      }
      else{
        const res = await $svAxios.delete('/class/assignment/'+item.id+'/')
        if(res.status < 400){
          assignments=assignments.filter(p => p.id !== item.id);
          console.log('success')
          classCurrentListStore.set(assignments)
          currentLink=[]
          $classCurrentListStore.forEach(temp => {
            currentLink.push('class/assignment/'+temp.id)
          })
        }
      }
      loadingstore.set(false)
    }
    function handleEdit(item){
      console.log(item)
      if(currentTab==='note'){
        editNoteData.id=item.id
        editNoteData.title=item.title
        editNoteData.description=item.description
        editNoteData.file=item.file
        classEditDataStore.set(editNoteData)
        classCurrentFileStore.set(item.file)
        files=''
      }
      if(currentTab==='assignment'){
        editAssignmentData.id=item.id
        editAssignmentData.title=item.title
        editAssignmentData.description=item.description
        editAssignmentData.deadline=item.deadline
        editAssignmentData.file=item.file        
        classEditDataStore.set(editAssignmentData)
        classCurrentFileStore.set(item.file)
        files=''
      }
    }
    function handleShow(item){
      console.log(item)
      classCurrentComponentStore.set(item)
      classCurrentFileStore.set(item.file)
      console.log($classCurrentComponentStore)
      console.log('file', $classCurrentFileStore)

    }

    function handleStreamClose(){
      stream.set(false)
    }

    async function handleFileDelete(item){
      loadingstore.set(true)
      console.log($classEditDataStore.id)
      confirm('Are you sure')
      if (currentTab==='note'){
        const res=await $svAxios.delete('/class/notes_upload/'+item.id+'/')
        let newFiles=$classCurrentFileStore
        newFiles=newFiles.filter(p => p.id !== item.id)
        classCurrentFileStore.set(newFiles)
        console.log(res)
        let updNt=await $svAxios.get('/class/notes/'+$classEditDataStore.id+'/')
        updNt=updNt.data
        notes=notes.filter(p => p.id !== updNt.id);
        notes = [updNt, ...notes]
        noteLink=[]
        notes.forEach(temp => {
            noteLink.push('class/notes/'+temp.id)
        });
        classCurrentListStore.set(notes)     
        classEditDataStore.set(updNt)
      }
      else{
        const res=await $svAxios.delete('/class/assignment_upload/'+item.id+'/')
        let newFiles=$classCurrentFileStore
        newFiles=newFiles.filter(p => p.id !== item.id)
        classCurrentFileStore.set(newFiles)
        let updAss=await $svAxios.get('/class/assignment/'+$classEditDataStore.id+'/')
        console.log(res)
        updAss=updAss.data
        assignments=assignments.filter(p => p.id !== updAss.id);
        assignments = [updAss, ...assignments]
        assignmentLink=[]
        assignments.forEach(temp => {
            assignmentLink.push('class/assignment/'+temp.id)
        });
        classCurrentListStore.set(assignments)     
        classEditDataStore.set(updAss)   
      }
      loadingstore.set(false)
    }
    $: path=pathStore
</script>
<div>
  <div class="container px-5 my-2" >
        <ul class="nav nav-tabs">
            <li class="nav-item" on:click={()=>changeTab('assignment')}>
                <a class={selectedTab.assignment} href="#">Assignments</a>
            </li>
            <li  class="nav-item"on:click={()=>changeTab('note')}>
                <a class={selectedTab.note} href="#">Notes</a>
            </li>
            <li class="nav-item" on:click={()=>changeTab('room')}>
                <a class={selectedTab.room} href="#">Live class</a>
            </li>
        </ul>
        
        <div class="list-group my-5">
          {#if group.createdBy === $user.pk}
            {#if currentTab==='note'}
                <button type="button" class="btn btn-info btn-lg btn-block my-2" data-toggle="modal" data-target="#noteModal">
                    Create New Note
                </button>
            {:else if  currentTab==='assignment'}
                <button type="button" class="btn btn-info btn-lg btn-block my-2" data-toggle="modal" data-target="#assignmentModal">
                    Create New assignment
                </button>
            {:else if  currentTab==='room'}
                <button type="button" class="btn btn-primary btn-lg btn-block my-2" on:click={()=>{stream.set(true)}} data-toggle="modal" data-target="#roomModal">
                    Create New Room
                </button>
            {/if}
          {/if}
            {#each $classCurrentListStore as item, index (item.id)}
                <div class="list-group-item list-group-item-action" >
                    <div class="d-flex w-100 justify-content-between">
                        <h5 class="mb-1">{item.title}</h5>
                        <div class='row'></div>
                        <small>
                          <div class="btn-group">
                          {#if group.createdBy === $user.pk}
                             <button type="button" class="btn  btn-outline-danger" on:click={()=>handleDelete(item)}>Delete</button>
                              {#if (currentTab==='note')}
                                <button type="button" class="btn  btn-outline-info"  data-toggle="modal" on:click={()=>{handleEdit(item)}} data-target='#noteEditModal'>Edit</button>
                              {:else}
                                <button type="button" class="btn  btn-outline-info"  data-toggle="modal" on:click={()=>{handleEdit(item)}} data-target='#assignmenteditModal'>Edit</button>
                              {/if}
                              <button type="button" class="btn mx-2 btn-sm btn-outline-secondary" data-toggle="modal" on:click={()=>{handleShow(item)}} data-target="#noteShowModal">View</button>
                          {:else}
                            <button type="button" class="btn mx-2 btn-outline-secondary" data-toggle="modal" on:click={()=>{handleShow(item)}} data-target="#noteShowModal">View</button>
                          {/if}
                          </div>
                        </small>
                    </div>
                    <p class="mb-1">Description: {item.description} ...</p>
                    <small>Attachment.</small>
                    <small>
                    {#if group.createdBy != $user.pk && group != false}
                      <div class="float-right">
                        <button type="button" class="btn btn-info">Submit</button>
                      </div>
                    {/if}
                    </small>
                </div>
            {/each}
        </div>
    </div>

</div>
<!-- Assignment Create Modal -->
<div class="modal fade" id="assignmentModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteModalLabel">Assignment Create</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={submitCreateAssignment}>
          <div class="form-group">
            <input type="text" placeholder="Title" bind:value={createAssignmentData.title} class="form-control"  aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" placeholder="Description" bind:value={createAssignmentData.description} class="form-control" >
          </div>
          <div class="form-group">
            <input type="date" class="datepicker form-control" bind:value={createAssignmentData.deadline} data-date-format="mm/dd/yyyy" placeholder="deadline yyyymmdd"  >
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">{(files) ? 'Files attached' : 'Choose multiple files'}</label>
              <input type="file" bind:files multiple class="custom-file-input" id="customFile">
            </div>
          </div>
          <button type="submit" class="my-2 btn btn-primary my-1" data-toggle="modal" data-target="#assignmentModal">Create</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Assignment Create Modal ended-->


<!-- Assignment Edit Modal -->
<div class="modal fade" id="assignmenteditModal" tabindex="-1" role="dialog" aria-labelledby="assignmenteditModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteModalLabel">Assignment Update</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={submitEditAssignment}>
          <div class="form-group">
            <input type="text" placeholder="New Title" class="form-control" bind:value={$classEditDataStore.title}   aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" placeholder="New Description" bind:value={$classEditDataStore.description} class="form-control" >
          </div>
          <div class="form-group">
            <input type="date" placeholder="New deadline yyyymmdd" bind:value={$classEditDataStore.deadline} class="form-control" >
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">{(files) ? 'Files attached' : 'Choose multiple files'}</label>
              <input type="file" bind:files multiple class="custom-file-input" id="customFile">
            </div>
          </div>
          <div class="list-group">
            {#each $classCurrentFileStore as item, index (item.id)}
              <a href='#' class="list-group-item list-group-item-action"><a href={item.file} target="_blank" > No. {index}</a> <div on:click={()=>handleFileDelete(item)} class="float-right">X</div></a>
              
            {/each}
          </div>
          <button type="submit" class="my-2 btn btn-primary my-1" data-toggle="modal" data-target="#assignmenteditModal">Update</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Assignment Edit Modal ended-->



<!-- Notes Create Modal started-->

<div class="modal fade" id="noteModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteModalLabel">Note</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={submitCreateNote}>
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Heading" bind:value={createNoteData.title} aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" class="form-control"placeholder="Description" bind:value={createNoteData.description} >
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">{(files) ? 'Files attached' : 'Choose multiple files'}</label>
              <input type="file" bind:files multiple class="custom-file-input" id="customFile">
            </div>
          </div>
          <button type="submit" class="my-2 btn btn-primary" data-toggle="modal" data-target="#noteModal">Create</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>

<!-- Notes Create Modal ended-->

<!-- Notes Edit Modal started-->

<div class="modal fade" id="noteEditModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteModalLabel">Note</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={submitEditNote}>
          <div class="form-group">
            <input type="text" placeholder="New Title" class="form-control" bind:value={$classEditDataStore.title} aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" placeholder="New Description" class="form-control" bind:value={$classEditDataStore.description}>
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">{(files) ? 'Files attached' : 'Choose multiple files'}</label>
              <input type="file" bind:files multiple class="custom-file-input" id="customFile">
            </div>
          </div>
          <div class="list-group">
            {#each $classCurrentFileStore as item, index (item.id)}
              <a href='#' class="list-group-item list-group-item-action"><a href={item.file} target="_blank" > No. {index}</a> <div on:click={()=>handleFileDelete(item)} class="float-right">X</div></a>
            {/each}
          </div>
          
          <button type="submit" class="my-2 btn btn-primary" data-toggle="modal" data-target="#noteEditModal">Update</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>

<!-- Notes Edit Modal ended-->



<!-- Assignment Submit Create Modal -->
<div class="modal fade" id="assignmentsubmitModal" tabindex="-1" role="dialog" aria-labelledby="assignmentsubmitModal" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="assignmentsubmitModal">Assignment Submit</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <!-- Form started -->
        <form on:submit={submitCreateSubmit}>
          <div class="form-group">
            <input type="text" placeholder="Title" class="form-control" bind:value={createSubmitData.title} aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" placeholder="Description" bind:value={createSubmitData.description} class="form-control" >
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">{(files) ? 'Files attached' : 'Choose multiple files'}</label>
              <input type="file" bind:files multiple class="custom-file-input" id="customFile">
            </div>
          </div>
          <div class="list-group">
            {#each $classCurrentFileStore as item, index (item.id)}
              <a href={item.file} target="_blank" class="list-group-item list-group-item-action">Attachment No. {index}</a>
            {/each}
          </div>
          <button type="submit" class="my-2 btn btn-primary my-1" data-toggle="modal" data-target="#assignmentsubmitModal">Create</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Assignment Submit Modal ended-->




<!-- Show Modal start-->


<!-- Modal -->
<div class="modal fade" id="noteShowModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">{$classCurrentComponentStore.title}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        {#if currentTab==='assignment'}
           <p>Deadline:- {$classCurrentComponentStore.deadline}</p>
        {/if}
        <p>{$classCurrentComponentStore.description}</p>
        <div class="list-group">
          {#each $classCurrentFileStore as item, index (item.id)}
            <a href={item.file} target="_blank" class="list-group-item list-group-item-action">Attachment No. {index}</a>
          {/each}
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="my-2 btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="my-2 btn btn-primary">Understood</button>
        <button type="button" class="my-2 btn btn-primary">Understood</button>
      </div>
    </div>
  </div>
</div>
<!-- Show Modal End -->



<!-- Svelte Head for jitsi start -->
<svelte:head>
    {#if $stream === true}
       <script>
        window.$(document).ready(function(){
                var domain='meet.jit.si';
                var options = {
                    roomName:'khgkjhgkjgh',
                    width:$("#roomModal").width()-270,
                    height:$("#roomModal").height()-200,
                    parentNode:document.querySelector('#meet'),
                    interfaceConfigOverwrite:{
                      HIDE_KICK_BUTTON_FOR_GUESTS:true,
                      SUPPORT_URL:'https://meetbeans.com',
                      MOBILE_APP_PROMO:false,
                      TOOLBAR_BUTTONS: [
                          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
                          'fodeviceselection', 'profile', 'chat', 'recording',
                          'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
                          'videoquality', 'filmstrip', 'invite', 'feedback', 'stats', 'shortcuts',
                          'tileview', 'download', 'help', 'mute-everyone',
                          'e2ee'
                      ],
                      APP_NAME: 'meetbeans',
                      NATIVE_APP_NAME: 'meetbeans',
                      PROVIDER_NAME: 'meetbeans',
                      DEFAULT_REMOTE_DISPLAY_NAME:'chutia',
                      JITSI_WATERMARK_LINK:'https://meetbeans.com',
                      BRAND_WATERMARK_LINK:'https://meetbeans.com',
                      DEFAULT_REMOTE_DISPLAY_NAME:'chutia',
                      HIDE_KICK_BUTTON_FOR_GUESTS: true,
                    },
                }
                var JitsiMeetExternalAPI = window.JitsiMeetExternalAPI;
                var api = new JitsiMeetExternalAPI(domain, options);
          var yourRoomPass = "hfjgvkjgkgjb";


          setTimeout(() => {
            api.addEventListener('passwordRequired', () => {
              api.executeCommand('password', yourRoomPass);
            });
              api.addEventListener('videoConferenceJoined', (response) => {
              api.executeCommand('password', yourRoomPass);
            });

          }, 10);
                
        });   
        </script>
    {/if}

  </svelte:head>

<!-- Svelte Head for jitsi end -->
<!-- Room Modal start-->
<div class="modal fade modal-fullscreen-xs-down" id="roomModal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog modal-xl" role="document">
    <div class="modal-content">

      <div class="modal-header">
        <h5 class="modal-title" id="staticBackdropLabel">online Virtual classroom</h5>
    
      </div>
      <div class="modal-body">
        {#if $stream==true}
           <div id='meet'>
          </div>
        {/if}
        
      </div>
      <div class="modal-footer">
        <button type="button" class="my-2 btn btn-secondary" on:click={()=>{handleStreamClose()}} data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
<!-- Room Modal End -->