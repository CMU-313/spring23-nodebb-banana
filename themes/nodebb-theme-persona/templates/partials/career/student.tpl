<div>
    <!-- IF newAccount -->
        Ready to get started? Sign up below and find your next job opportunity!
    <!-- ELSE -->
        You have been successfully registered! You can update your personal information below at any time.
    <!-- END -->
</div>
<div class="career-block">
    <div class="alert alert-danger<!-- IF !error --> hidden<!-- ENDIF !error -->" id="career-error-notify" >
        <strong>Registration Error</strong>
        <p>{error}</p>
    </div>
    <form component="career/local" class="form-horizontal" role="form" action="{config.relative_path}/api/v3/career/register" method="post">
        <div class="form-group">
            <label for="name" class="col-lg-3 control-label">Name</label>
            <div class="col-lg-9">
                <input class="form-control" type="text" placeholder="Name" name="name" value="{name}" id="name" autocorrect="off" autocapitalize="off" autocomplete="off" />
                <span class="register-feedback" id="name-notify"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="email" class="col-lg-3 control-label">Email</label>
            <div class="col-lg-9">
                <input class="form-control" type="email" placeholder="Email" name="email" value="{email}" id="email" autocorrect="off" autocapitalize="off" autocomplete="off" />
                <span class="register-feedback" id="email-notify"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="age" class="col-lg-3 control-label">Age</label>
            <div class="col-lg-9">
                <input class="form-control" type="number" placeholder="Age" name="age" value="{age}" id="age" autocorrect="off" autocapitalize="off" autocomplete="off" min="0"/>
                <span class="register-feedback" id="age-notify"></span>
            </div>
        </div>
        <div class="form-group">
            <label for="gender" class="col-lg-3 control-label">Gender</label>
            <div class="col-lg-9">
                <select class="form-control" name="gender" aria-label="Gender">
                    <option value="M"<!-- IF (gender=="M") --> selected<!-- END -->>Male</option>
                    <option value="F"<!-- IF (gender=="F") --> selected<!-- END -->>Female</option>
                    <option value="O"<!-- IF (gender=="O") --> selected<!-- END -->>Other</option>
                </select>
                <span class="register-feedback" id="gender-notify"></span>
            </div>
        </div>

        <div class="form-group">
            <div class="col-lg-offset-4 col-lg-6">
                <button class="btn btn-primary btn-lg btn-block" id="signup" type="submit">
                    <!-- IF newAccount -->
                        Sign Up
                    <!-- ELSE -->
                        Update
                    <!-- END -->
                </button>
            </div>
        </div>
        <input id="token" type="hidden" name="token" value="" />
        <input id="noscript" type="hidden" name="noscript" value="true" />
        <input type="hidden" name="_csrf" value="{config.csrf_token}" />
    </form>
</div>
