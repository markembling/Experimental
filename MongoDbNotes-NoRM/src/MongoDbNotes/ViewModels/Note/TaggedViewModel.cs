using System.Collections.Generic;

namespace MongoDbNotes.ViewModels.Note {
    public class TaggedViewModel {
        public string TagName;
        public IEnumerable<Models.Entities.Note> Notes;
    }
}