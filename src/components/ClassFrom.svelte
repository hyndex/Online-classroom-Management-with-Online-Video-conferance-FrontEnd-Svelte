<!-- group Modal -->
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
        <form>
          <div class="form-group">
            <input type="text" disabled="disabled" placeholder="id in case of edit" class="form-control"  aria-describedby="group">
          </div>
          <div class="form-group">
            <label for="groupModalPhone1">Name</label>
            <input type="text" class="form-control"  aria-describedby="name">
          </div>
          <div class="form-group">
            <label for="groupModalPassword1">Description</label>
            <input type="test" class="form-control" >
          </div>
          <button type="submit" class="btn btn-primary">create/update( condition )</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>
<!-- group Modal ended-->

<button type="button" class="btn btn-primary my-5" data-toggle="modal" data-target="#groupModal">
    Create New Class
</button>
