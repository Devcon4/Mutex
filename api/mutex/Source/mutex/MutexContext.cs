namespace mutex
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using mutex.Models;

    public class MutexContext: DbContext
    {

        public MutexContext() => this.Database.Migrate();
        public MutexContext(DbContextOptions<MutexContext> optionsBuilder) : base(optionsBuilder) => this.Database.Migrate();

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=mutex;User Id=dev;Password=MutexDev");
        //}

        public DbSet<Post> Posts { get; set; }
    }
}
