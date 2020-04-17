using DotNetAppSqlDb.Models;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Cors;

namespace DotNetAppSqlDb.Controllers
{
    public class FeedbackController : ApiController
    {
        private MyDatabaseContext _dbContext = new MyDatabaseContext();



        [HttpGet]
        [Route("api/feedbacks")]
        public IHttpActionResult GetFeedbacks(string loginId)
        {

            var list = _dbContext.Review
                .Where(e => e.ReviewAccountId == loginId)
                .Select(e => new
                {
                    Uid = e.Uid,
                    Name = "test",
                    Rank = e.Rank,
                    Description = e.Description
                })
                .ToList();
            return Ok(list);

        }

        [HttpPost]
        [Route("api/feedbacks/edit")]
        public IHttpActionResult EditFeedback(Review req)
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