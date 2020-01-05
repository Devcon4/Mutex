using mutex_data.entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace mutex_data.Entities {
	public class Post {

		public int PostId { get; set; }
		public string Name { get; set; }
		
		[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
		public DateTime CreatedDate { get; set; }

		public DateTime PublishedDate { get; set; }
		
		[DatabaseGenerated(DatabaseGeneratedOption.Computed)]
		public DateTime LastUpdated { get; set; }

		[Column(TypeName = "text")]
		public string Content { get; set; }

		public string PostStatusId { get; set; }
		public PostStatus Status { get; set; }

	}
}
