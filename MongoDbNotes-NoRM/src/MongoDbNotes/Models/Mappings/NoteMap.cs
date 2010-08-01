using MongoDbNotes.Models.Entities;
using Norm.Configuration;

namespace MongoDbNotes.Models.Mappings {
    public class NoteMap : MongoConfigurationMap {
        public NoteMap() {
            For<Note>(config => {
                config.UseCollectionNamed("notes");
                config.ForProperty(x => x.Id).UseAlias("_id");
                config.ForProperty(x => x.Title).UseAlias("title");
                config.ForProperty(x => x.Body).UseAlias("body");
                config.ForProperty(x => x.Tags).UseAlias("tags");
            });
        }
    }
}