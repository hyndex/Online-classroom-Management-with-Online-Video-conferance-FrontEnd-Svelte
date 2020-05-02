
<!-- Role  Modal Started-->

<div class="modal fade" id="roleModal" tabindex="-1" role="dialog" aria-labelledby="roleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="roleModalLabel">new member</h5>
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
            <label for="roleModalPhone1">Name</label>
            <input type="text" placeholder="Name" class="form-control"  aria-describedby="group">
          </div>
          <div class="form-group">
            <label for="roleModalPassword1">Description</label>
            <input type="test"  placeholder="username/phone" class="form-control" >
          </div>
          <button type="submit" class="btn btn-primary">ADD</button>
        </form>
        <!-- Form ended -->
      </div>
      
    </div>
  </div>
</div>

<!-- Role Modal ended-->

<button type="button" class="btn btn-primary my-5" data-toggle="modal" data-target="#roleModal">
    Add a member
</button>



