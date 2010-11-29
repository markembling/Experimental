using System;
using System.Collections;
using System.Collections.Generic;
using MongoDB;

namespace MongoDbNotes.Models
{
    public class NoteRepository
    {
        private readonly IMongoDatabase _db;
        private const string CollectionName = "notes";

        public NoteRepository(IMongoDatabase db) {
            _db = db;
        }

        public IEnumerable<Document> Find(Document querySpec) {
            return GetCollection().Find(querySpec).Documents;
        }

        public Document FindOne(Document querySpec) {
            return GetCollection().FindOne(querySpec);
        }

        public Document FindOneById(Oid id) {
            var spec = new Document {{"_id", id}};
            return FindOne(spec);
        }

        public IEnumerable<Document> FindAll() {
            return GetCollection().FindAll().Documents;
        }

        public void Save(Document doc) {
            GetCollection().Save(doc);
        }

        public void Delete(Document spec) {
            GetCollection().Remove(spec);
        }

        public void DeleteById(Oid id) {
            var spec = new Document {{"_id", id}};
            Delete(spec);
        }

        private IMongoCollection GetCollection() {
            return _db.GetCollection(CollectionName);
        }
    }
}