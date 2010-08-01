using Autofac;
using MongoDbNotes.Models;
using Norm;

namespace MongoDbNotes {
    public class ContainerRegistrations : Module {
        protected override void Load(ContainerBuilder builder) {
            builder.Register(c => MvcApplication.ConnectMongoDb()).InstancePerLifetimeScope();
            builder.Register(c => new NoteRepository(c.Resolve<Mongo>()));
        }
    }
}