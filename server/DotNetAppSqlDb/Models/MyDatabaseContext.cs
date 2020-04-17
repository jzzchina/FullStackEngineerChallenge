using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace DotNetAppSqlDb.Models
{
    public class MyDatabaseContext : DbContext
    {
        public MyDatabaseContext() : base("name=MyDbConnection")
        {
        }

        public System.Data.Entity.DbSet<DotNetAppSqlDb.Models.Todo> Todoes { get; set; }
        public System.Data.Entity.DbSet<DotNetAppSqlDb.Models.Account> Account { get; set; }
        public System.Data.Entity.DbSet<DotNetAppSqlDb.Models.Review> Review { get; set; }
    }
}
