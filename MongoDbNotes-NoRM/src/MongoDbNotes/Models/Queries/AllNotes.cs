using System;
using System.Collections.Generic;
using MongoDbNotes.Infrastructure;
using MongoDbNotes.Models.Entities;
using Norm;

namespace MongoDbNotes.Models.Queries {
    public class AllNotes : IMultiQuery<Note> {
        public IEnumerable<Note> Execute(Mongo mongo) {
            return mongo.GetCollection<Note>().Find();
        }
    }
}