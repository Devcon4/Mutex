using HotChocolate.Types;
using mutex_api.modules.post;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex_api.modules.mutation {
	public class Mutation {
		public Post CreatePost { get; set; }
	}


	// Optional: Used to configure the graphql type.
	public class MutationType : ObjectType<Mutation> {

		protected override void Configure(IObjectTypeDescriptor<Mutation> descriptor) {
			descriptor.Include<PostResolver>();
		}
	}
}
