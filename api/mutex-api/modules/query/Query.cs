using HotChocolate.Types;
using mutex_api.modules.post;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex_api.modules.query {
	public class Query {
		public Post post { get; set; }
		public List<Post> posts { get; set; }
	}


	// Optional: Used to configure the graphql type.
	public class QueryType : ObjectType<Query> {

		protected override void Configure(IObjectTypeDescriptor<Query> descriptor) {
			descriptor.Include<PostResolver>();
		}
	}
}