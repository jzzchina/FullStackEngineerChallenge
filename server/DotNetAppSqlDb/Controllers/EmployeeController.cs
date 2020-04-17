
using DotNetAppSqlDb.Models;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DotNetAppSqlDb.Controllers
{
    public class EmployeeController : ApiController
    {
        private MyDatabaseContext _dbContext = new MyDatabaseContext();

        [HttpGet]
        [Route("api/employees")]
        public IHttpActionResult GetEmployees()
        {

            var list = _dbContext.Account.ToList();
            return Ok(list);

        }

        [HttpPost]
        [Route("api/employees/details")]
        public IHttpActionResult EmployeeDetails(Account req)
        {
            _dbContext.Account.Add(req);
            _dbContext.SaveChanges();
            return Ok();

        }

        [HttpPost]
        [Route("api/employees/add")]
        public IHttpActionResult AddEmployee(Account req)
        {
            _dbContext.Account.Add(new Account {
                AccountId = req.AccountId,
                Password = req.Password,
                Name = req.Name,
                Role = req.Role,
            });
            _dbContext.SaveChanges();
            return Ok();

        }

        [HttpPost]
        [Route("api/employees/edit")]
        public IHttpActionResult EditEmployee(Account req)
        {
            var acc = _dbContext.Account.FirstOrDefault(e => e.Uid == req.Uid);
            if (acc == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            acc.AccountId = req.AccountId;
            acc.Password = req.Password;
            acc.Name = req.Name;
            acc.Role = req.Role;
            _dbContext.SaveChanges();

            return Ok();

        }

        [HttpPost]
        [Route("api/employees/delete")]
        public IHttpActionResult DeleteEmployee(Account req)
        {

            var acc = _dbContext.Account.FirstOrDefault(e => e.Uid == req.Uid);
            if (acc == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _dbContext.Account.Remove(acc);
            _dbContext.SaveChanges();

            return Ok();

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