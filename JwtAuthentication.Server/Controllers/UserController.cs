using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace JwtAuthentication.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController(SignInManager<IdentityUser> signInManager, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        [HttpGet("Login")]
        public async Task<IActionResult> Login(string user, string password)
        {
            var result = await signInManager.PasswordSignInAsync(user, password, false, false);

            if (result.Succeeded)
            {
                return Ok();
            }

            return Unauthorized();
        }

        [HttpGet("Name")]
        public IActionResult GetUserName() => httpContextAccessor.HttpContext?.User.Identity?.IsAuthenticated ?? false
            ? Ok(httpContextAccessor.HttpContext.User.Identity.Name)
            : Unauthorized();
    }
}
