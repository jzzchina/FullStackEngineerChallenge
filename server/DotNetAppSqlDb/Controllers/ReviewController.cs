using DotNetAppSqlDb.Models;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DotNetAppSqlDb.Controllers
{
    public class ReviewController : ApiController
    {
        private MyDatabaseContext _dbContext = new MyDatabaseContext();

        [HttpGet]
        [Route("api/reviews")]
        public IHttpActionResult GetEmployees(string loginId)
        {
            var list = _dbContext.Review
                .Where(e => e.ReviewAccountId == loginId)
                .Select(e => new
                {
                    Uid = e.Uid,
                    ReviewAccountId = e.ReviewAccountId,
                    TargetAccountId = e.TargetAccountId,
                    Name = "test",
                    Rank = e.Rank,
                    Description = e.Description
                })
                .ToList();
            return Ok(list);

        }

        private string getName(string accoutId)
        {
            var acc = _dbContext.Account.FirstOrDefault(e => e.AccountId == accoutId);
            return acc == null ? "" : acc.Name;
        }

        [HttpPost]
        [Route("api/reviews/details")]
        public IHttpActionResult EmployeeDetails(Review req)
        {
            _dbContext.Review.Add(req);
            _dbContext.SaveChanges();
            return Ok();

        }

        public class ReviewEdit : Review{
            public string FeedbackAccountId { get; set; }
        }

        [HttpPost]
        [Route("api/reviews/add")]
        public IHttpActionResult AddEmployee(ReviewEdit req)
        {
            _dbContext.Review.Add(new Review
            {
                ReviewAccountId = req.ReviewAccountId,
                TargetAccountId = req.TargetAccountId,
                Rank = req.Rank,
                Description = req.Description
            });

            if (!string.IsNullOrEmpty(req.FeedbackAccountId))
            {
                _dbContext.Review.Add(new Review
                {
                    ReviewAccountId = req.FeedbackAccountId,
                    TargetAccountId = req.TargetAccountId,
                    Rank = "",
                    Description = ""
                });
            }


            _dbContext.SaveChanges();
            return Ok();

        }

        [HttpPost]
        [Route("api/reviews/edit")]
        public IHttpActionResult EditEmployee(ReviewEdit req)
        {
            var review = _dbContext.Review.FirstOrDefault(e => e.Uid == req.Uid);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }

            review.Rank = req.Rank;
            review.Description = req.Description;
            _dbContext.SaveChanges();

            return Ok();

        }

        [HttpPost]
        [Route("api/reviews/delete")]
        public IHttpActionResult DeleteEmployee(Review req)
        {

            var review = _dbContext.Review.FirstOrDefault(e => e.Uid == req.Uid);
            if (review == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
            _dbContext.Review.Remove(review);
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