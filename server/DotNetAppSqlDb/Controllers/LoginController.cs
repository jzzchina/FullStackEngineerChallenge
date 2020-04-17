using DotNetAppSqlDb.Models;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DotNetAppSqlDb.Controllers
{

    public class LoginModel
    {
        public string username { get; set; }
        public string password { get; set; }
    }

    public class LoginController : ApiController
    {
        private MyDatabaseContext _dbContext = new MyDatabaseContext();

        [HttpPost]
        [Route("api/login")]
        public IHttpActionResult EditFeedback(LoginModel req)
        {
            var user = _dbContext.Account
                .Where(e => e.AccountId == req.username)
                .Where(e => e.Password == req.password)
                .FirstOrDefault();

            if (user == null)
            {
                return Ok(new
                {
                    status = false
                });
            }

            return Ok(new
            {
                status = true,
                Role = user.Role,
            });
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dbContext.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}