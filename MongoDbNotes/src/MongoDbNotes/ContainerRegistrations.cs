using Autofac.Builder;
using Autofac.Integration.Web.Mvc;
using MongoDB.Driver;
using MongoDbNotes.Models;

namespace MongoDbNotes {
    public class ContainerRegistrations : Module {
        protected override void Load(ContainerBuilder builder) {
            builder.RegisterModule(new AutofacControllerModule(System.Reflection.Assembly.GetExecutingAssembly()));

            builder.Register(c => MvcApplication.ConnectMongoDb()).ContainerScoped();
            builder.Register(c => new NoteRepository(c.Resolve<Database>())).ContainerScoped();
        }
    }
}