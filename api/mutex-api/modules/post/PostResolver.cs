using HotChocolate;
using mutex_api.modules.query;
using mutex_data.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex_api.modules.post {
    [GraphQLResolverOf(typeof(Post))]
    [GraphQLResolverOf(typeof(Query))]
    public class PostResolver {

        public string GetTest([Parent] Post parent) => "Test!";

        public Post Post([Parent] Query parent) {
            return new Post {
                Name = "test",
                PostId = 2
            };
        }

        [GraphQLDescription("Get all Posts")]
        public List<Post> Posts([Parent] Query parent) {
            return new List<Post>() {
                new Post {
                    Name = "test",
                    PostId = 1
                }
            };
        }
    }
}
