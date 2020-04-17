
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DotNetAppSqlDb.Models
{
    public class Review
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Uid { get; set; }
        public string ReviewAccountId { get; set; }
        public string TargetAccountId { get; set; }
        public string Rank { get; set; }
        public string Description { get; set; }
    }

}