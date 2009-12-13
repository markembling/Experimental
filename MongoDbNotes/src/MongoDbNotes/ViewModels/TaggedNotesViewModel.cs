using System.Collections.Generic;
using MongoDB.Driver;

namespace MongoDbNotes.ViewModels {
    public class TaggedNotesViewModel {
        public string TagName;
        public IEnumerable<Document> Notes;
    }
}