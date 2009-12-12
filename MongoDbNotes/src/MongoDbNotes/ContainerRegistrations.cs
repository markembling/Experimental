using Autofac.Builder;
using Autofac.Integration.Web.Mvc;
using MongoDB.Driver;
using MongoDbNotes.Models;

namespace MongoDbNotes {
    public class ContainerRegistrations : Module {
        protected override void Load(ContainerBuilder builder) {
            builder.RegisterModule(new AutofacControllerModule(System.Reflection.Assembly.GetExecutingAssembly()));

//            builder.Register(c => MvcApplication.InitializeNHibernateSessionFactory()).SingletonScoped();
//            builder.Register(c => c.Resolve<ISessionFactory>().OpenSession()).ContainerScoped();

            builder.Register(c => MvcApplication.ConnectMongoDb()).SingletonScoped();
            builder.Register(c => new NoteRepository(c.Resolve<Database>())).SingletonScoped();
        }

    }
}