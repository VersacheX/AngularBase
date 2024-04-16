using AngularBase.Application;
using AngularBase.Application.Helpers;
using AngularBase.Application.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Text.Json;
using System.Threading.Tasks;
using AuthorizeAttribute = AngularBase.Application.Helpers.AuthorizeAttribute;

namespace AngularBase.Controllers
{
    [Route("[controller]/[action]")]
    public class AccountController : Controller
    {
        private IUserService _userService { get; set; }
        private IEmailService _emailService { get; set; }

        public AccountController(IUserService userService, IEmailService emailService)
        {
            this._userService = userService;
            this._emailService = emailService;
        }

        [Authorize]
        public IActionResult ChangePassword([FromBody] User model)
        {
            model.Password = _userService.HashPassword(model.Password);
            model.NewPassword = _userService.HashPassword(model.NewPassword);

            int? userId = this.HttpContext.Items["UserId"] as int?; //GetUserId from context

            string result = Dao.ExecuteProcedure((int)userId, "ChangePassword", JsonSerializer.Serialize<User>(model));

            User user = null;

            try
            {
                User[] users = JsonSerializer.Deserialize<User[]>(result);

                if (users != null && users.Length > 0)
                    user = users[0];
            }
            catch (Exception ex)
            {

            }
            //if (result == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });

            // Send off an email or some shit on success -- Password has been changed.  If you did not request this password change blah blah 
            return Ok(user);
        }

        [AllowAnonymous]
        public async Task<IActionResult> ActivateAccount([FromBody] User model)
        {
            string result = Dao.NoAuthExecuteProcedure("no_auth_ActivateAccount", JsonSerializer.Serialize<User>(model));

            //if (result == null)
            //    return BadRequest(new { message = "Activation Fail" });

            // Send off an email or some shit on success -- Your account has been activated. Welcome to blah blah


            User user = null;

            try
            {
                User[] users = JsonSerializer.Deserialize<User[]>(result);

                if (users != null && users.Length > 0)
                    user = users[0];
            }
            catch (Exception ex)
            {

            }

            if (user == null)
            {
                return BadRequest(new { message = "Problems activating account" });
            }

            //Send e-mail here
            MailRequest request = new();
            request.ToEmail = user.Email;
            request.Subject = "Account Activated";
            request.Body = this._emailService.GetAccountActivatedMailBody(user.Username);

            try
            {
                await this._emailService.SendEmailAsync(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(user);
        }

        [AllowAnonymous]
        public async Task<IActionResult> CreateAccount([FromBody] User model)
        {
            model.Password = _userService.HashPassword(model.Password);
            model.ActivationCode = _userService.GenerateActivationCode();

            string result = Dao.NoAuthExecuteProcedure("no_auth_CreateAccount", JsonSerializer.Serialize<User>(model));

            //if (result == null)
            //    return BadRequest(new { message = "Username or password is incorrect" });

            // Send off an email or some shit on success -- Password has been changed.  If you did not request this password change blah blah 
            User[] users = JsonSerializer.Deserialize<User[]>(result);
            User user = null;

            if (users != null && users.Length > 0)
                user = users[0];

            if (user == null)
            {
                return BadRequest(new { message = "Problems creating account" });
            }

            //Send e-mail here
            MailRequest request = new();
            request.ToEmail = user.Email;
            request.Subject = "Activate Account";
            request.Body = this._emailService.GetActivateAccountMailBody(user.Username, user.ActivationCode);

            try
            {
                await this._emailService.SendEmailAsync(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(user);
        }

        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword([FromBody] User model)
        {
            string newPassword = this._userService.GenerateRandomPassword();

            model.Password = _userService.HashPassword(newPassword);

            string result = Dao.NoAuthExecuteProcedure("no_auth_ResetPassword", JsonSerializer.Serialize<User>(model));
            //If passwordReset Successful  ---  This username must exist with 2 security questions

            if (result == null)
                return BadRequest(new { message = "Security question answer(s) incorrect" });

            User[] users = JsonSerializer.Deserialize<User[]>(result);
            User user = null;

            if (users != null && users.Length > 0)
                user = users[0];

            if (user == null)
            {
                return BadRequest(new { message = "Security question answer(s) incorrect" });
            }

            //Send e-mail here
            MailRequest request = new();
            request.ToEmail = user.Email;
            request.Subject = "Password Reset";
            request.Body = this._emailService.GetResetPasswordMailBody(user.UserPK, user.Username, newPassword);

            try
            {
                await this._emailService.SendEmailAsync(request);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }

            return Ok(user);
        }

        [AllowAnonymous]
        public IActionResult GetSecurityQuestions([FromBody] User model)
        {
            string result = Dao.NoAuthExecuteProcedure("no_auth_GetSecurityQuestions", JsonSerializer.Serialize<User>(model));

            if (result == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(result);
        }

        //[Authorize]
        //public IActionResult CreateAccount([FromBody] User model)
        //{
        //    model.Password = _userService.HashPassword(model.Password);
        //    model.NewPassword = _userService.HashPassword(model.NewPassword);

        //    int? userId = this.HttpContext.Items["UserId"] as int?; //GetUserId from context

        //    string result = Dao.ExecuteProcedure((int)userId, "ChangePassword", JsonSerializer.Serialize<User>(model));

        //    //if (result == null)
        //    //    return BadRequest(new { message = "Username or password is incorrect" });

        //    // Send off an email or some shit on success
        //    return Ok(result);
        //}
    }
}