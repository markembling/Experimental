using System.Collections.Generic;
using MongoDbNotes.Models;

namespace MongoDbNotes.ViewModels {
    public class TaggedNotesViewModel {
        public string TagName;
        public IEnumerable<Note> Notes;
    }
}