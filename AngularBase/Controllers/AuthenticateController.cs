using AngularBase.Application;
using AngularBase.Application.Helpers;
using AngularBase.Application.Services;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace AngularBase.Controllers
{
    [Route("[controller]/[action]")]
    public class AuthorizationController : Controller
    {
        private IUserService _userService { get; set; }

        public AuthorizationController(IUserService userService)
        {
            _userService = userService;
        }

        [AllowAnonymous]
        public IActionResult Authenticate([FromBody] LoginInformation model)
        {
            var response = _userService.Authenticate(model);

            if (response == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(response);
        }
    }
}
