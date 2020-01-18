using Microsoft.EntityFrameworkCore;
using mutex_data.entities;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace mutex_data {
	public class MutexContext : DbContext {
		public MutexContext() {
			Database.Migrate();
		}
		public MutexContext(DbContextOptions<MutexContext> optionsBuilder) : base(optionsBuilder) {
			Database.Migrate();
		}

        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        //{
        //    optionsBuilder.UseNpgsql("Server=localhost;Port=5432;Database=mutex;User Id=dev;Password=MutexDev");
        //}

        public DbSet<Post> Posts { get; set; }
		public DbSet<PostStatus> PostStatuses { get; set; }
    }
}
