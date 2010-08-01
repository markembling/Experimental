using System;
using System.Linq;
using Norm;

namespace MongoDbNotes.Models.Queries {
    public class NoteById : ISingleQuery<Note> {
        private readonly ObjectId _id;

        public NoteById(ObjectId id) {
            _id = id;
        }

        public Note Execute(Mongo mongo) {
            return mongo.GetCollection<Note>().AsQueryable().Single(x => x.Id == _id);
        }
    }
}