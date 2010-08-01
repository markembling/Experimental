using System;
using System.Collections.Generic;
using System.Linq;
using Norm;

namespace MongoDbNotes.Models.Queries {
    public class NotesByTag : IMultiQuery<Note> {
        private readonly string _tag;

        public NotesByTag(string tag) {
            _tag = tag;
        }

        public IEnumerable<Note> Execute(Mongo mongo) {
            return mongo.GetCollection<Note>().AsQueryable().Where(x => x.Tags.Contains(_tag));
        }
    }
}