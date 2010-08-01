using System;
using System.Collections.Generic;
using Norm;

namespace MongoDbNotes.Models.Queries {
    public class AllNotes : IMultiQuery<Note> {
        public IEnumerable<Note> Execute(Mongo mongo) {
            return mongo.GetCollection<Note>().Find();
        }
    }
}