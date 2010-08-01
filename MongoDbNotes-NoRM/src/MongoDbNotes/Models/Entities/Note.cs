using System.Collections.Generic;
using Norm;

namespace MongoDbNotes.Models.Entities
{
    public class Note {
        public Note() {
            Tags = new List<string>();
        }

        public ObjectId Id { get; set; }
        public string Title { get; set; }
        public string Body { get; set; }
        public List<string> Tags { get; set; }
    }
}