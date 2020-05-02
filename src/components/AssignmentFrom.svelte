<!-- Assignment Modal -->
<div class="modal fade" id="assignmentModal" tabindex="-1" role="dialog" aria-labelledby="noteModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="noteModalLabel">Assignment Form</h5>
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
            <input type="text" placeholder="Title" class="form-control"  aria-describedby="name">
          </div>
          <div class="form-group">
            <input type="test" placeholder="Description" class="form-control" >
          </div>
          <div class="form-group">
            <input type="test" placeholder="deadline yyyymmdd" class="form-control" >
          </div>
          <div class="form-group">
            <div class="custom-file">
              <label class="custom-file-label" for="customFile">Choose file</label>
              <input type="file"  bind:files class="custom-file-input" id="customFile">
            </div>
          </div>
          <button type="submit" class="btn btn-primary my-1">update/add based on logic</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- Assignment Modal ended-->
<button type="button" class="btn btn-primary my-5" data-toggle="modal" data-target="#assignmentModal">
    Create New Assignment
</button>