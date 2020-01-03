using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using HotChocolate;
using HotChocolate.AspNetCore;
using HotChocolate.Types;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using mutex_api.modules.mutation;
using mutex_api.modules.post;
using mutex_api.modules.query;
using mutex_data;
using mutex_data.Entities;

namespace mutex_api {

	[AttributeUsage(AttributeTargets.Class, AllowMultiple = false, Inherited = true)]
	public class Inject: Attribute { }

	public class Startup {
		public Startup(IConfiguration configuration) {
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services) {
			services.AddControllers();

			var injectServices = Assembly.GetExecutingAssembly().GetTypes().Where(t => t.GetCustomAttributes(typeof(Inject), true).Any()).Distinct();

			foreach(var s in injectServices) {
				services.AddSingleton(s);
			}

			services.AddDbContext<MutexContext>(options => options.UseNpgsql(Configuration.GetConnectionString("MutexDB")));
			services.Configure<KestrelServerOptions>(
					Configuration.GetSection("Kestrel"));
			services.AddGraphQL(sp => SchemaBuilder.New()
				.BindClrType<DateTime, DateTimeType?>()
				.AddServices(sp)
				.AddQueryType<QueryType>()
				.AddMutationType<MutationType>()
				//.AddObjectType<PostType>()
				.Create());
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env) {
			if (env.IsDevelopment()) {
				app.UseDeveloperExceptionPage();
			}

			//app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthorization();

			app.UseGraphQL("/api/graphql");
			app.UsePlayground("/api/graphql", "/api/playground");

			app.UseEndpoints(endpoints => {
				endpoints.MapControllers();
			});
		}
	}
}
