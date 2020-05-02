<!-- Notes Modal ended-->
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
        <form>
          <div class="form-group">
            <input type="text" disabled="disabled" placeholder="id in case of edit" class="form-control"  aria-describedby="group">
          </div>
          <div class="form-group">
            <input type="text" class="form-control"  aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" class="form-control" >
          </div>
          <div class="form-group">
            <div class="custom-file my-1">
              <label class="custom-file-label" for="customFile">Choose file</label>
              <input type="file"  bind:files class="custom-file-input" id="customFile">
            </div>
          </div>
          
          <button type="submit" class="btn btn-primary">update/add</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>

<!-- Notes Modal ended-->

<button type="button" class="btn btn-primary my-5" data-toggle="modal" data-target="#noteModal">
    Create New Note
</button>