using GraphQL.Types;
using mutex.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace mutex.Types
{
    public class PostObject : ObjectGraphType<Post> {
        private readonly MutexContext _db;

        public PostObject(MutexContext db) {
            _db = db;

            this.Field(x => x.PostId).Description("Identifier");
            Field(x => x.Content).Description("Body of the post");
        }
    }
}
