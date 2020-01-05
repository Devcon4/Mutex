using HotChocolate.Types;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex_api.modules.post {
	public class PostType : ObjectType<Post> {
		protected override void Configure(IObjectTypeDescriptor<Post> descriptor) {
		}
	}

	public class PostInputType : InputObjectType<Post> {
		protected override void Configure(IInputObjectTypeDescriptor<Post> descriptor) {
			descriptor.Field(c => c.CreatedDate).Type<DateTimeType?>();
			descriptor.Field(c => c.LastUpdated).Type<DateTimeType?>();
			descriptor.Field(c => c.PublishedDate).Type<DateTimeType?>();

		}
	}
}
