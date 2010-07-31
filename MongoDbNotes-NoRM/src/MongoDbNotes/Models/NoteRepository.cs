using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using Norm;
using Norm.Collections;

namespace MongoDbNotes.Models
{
    public class NoteRepository
    {
        private readonly Mongo _db;

        public NoteRepository(Mongo db) {
            _db = db;
        }

        public Note FindOneById(ObjectId id) {
            return GetCollection().AsQueryable().Single(x => x.Id == id);
        }

        public IEnumerable<Note> FindAll() {
            return GetCollection().AsQueryable();
        }

        public void Save(Note note) {
            GetCollection().Save(note);
        }

        public void DeleteById(ObjectId id) {
            GetCollection().Delete(new Note {Id = id});
        }

        private IMongoCollection<Note> GetCollection() {
            return _db.GetCollection<Note>();
        }
    }
}