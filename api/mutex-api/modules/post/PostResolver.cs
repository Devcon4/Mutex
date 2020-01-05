using HotChocolate;
using mutex_api.modules.mutation;
using mutex_api.modules.query;
using mutex_data;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex_api.modules.post {
	public class PostResolver {
		private readonly MutexContext _db;

		public PostResolver(MutexContext db) {
			_db = db;
		}

		public Post Post([Parent] Query parent) {
			return new Post {
				Name = "test",
				PostId = 2
			};
		}

		[GraphQLDescription("Get all Posts")]
		public List<Post> Posts([Parent] Query parent) {
			return _db.Posts.ToList();
		}

		public Post CreatePost([Parent] Mutation parent, Post input) {
			var addPost = _db.Add(new Post {
					Name = input.Name,
			});

			_db.SaveChanges();

			return _db.Posts.FirstOrDefault(p => p.PostId == addPost.Entity.PostId);
		}
	}
}
