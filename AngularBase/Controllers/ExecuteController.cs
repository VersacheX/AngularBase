using AngularBase.Application;
using AngularBase.Application.Helpers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using AuthorizeAttribute = AngularBase.Application.Helpers.AuthorizeAttribute;

namespace AngularBase.Controllers
{
    [Route("[controller]/[action]")]
    public class ExecuteController : Controller
    {
        [Authorize]
        public IActionResult ExecuteProcedure([FromBody] DataRequest dataRequest)
        {
            int? userId = this.HttpContext.Items["UserId"] as int?; //GetUserId from context

            string result = Dao.ExecuteProcedure((int)userId, dataRequest.Procedure, dataRequest.Parameters);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }

        [AllowAnonymous]
        public IActionResult NoAuthExecuteProcedure([FromBody] DataRequest dataRequest)
        {
            //int? userId = this.HttpContext.Items["UserId"] as int?; //GetUserId from context

            string result = Dao.NoAuthExecuteProcedure(dataRequest.Procedure, dataRequest.Parameters);

            if (result == null)
                return BadRequest();

            return Ok(result);
        }
    }
}
