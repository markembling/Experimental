using Autofac;
using Autofac.Integration.Web;
using MongoDB;
using MongoDbNotes.Models;

namespace MongoDbNotes {
    public class ContainerRegistrations : Module {
        protected override void Load(ContainerBuilder builder) {
            builder.Register(c => MvcApplication.ConnectMongoDb())
                .As<IMongoDatabase>()
                .InstancePerHttpRequest();
            builder.Register(c => new NoteRepository(c.Resolve<IMongoDatabase>())).InstancePerHttpRequest();
        }
    }
}