using Autofac;
using MongoDB.Driver;
using MongoDbNotes.Models;

namespace MongoDbNotes {
    public class ContainerRegistrations : Module {
        protected override void Load(ContainerBuilder builder) {
            builder.Register(c => MvcApplication.ConnectMongoDb()).InstancePerLifetimeScope();
            builder.Register(c => new NoteRepository(c.Resolve<Database>()));
        }
    }
}