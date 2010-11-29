using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using Autofac;
using Autofac.Integration.Web;
using Autofac.Integration.Web.Mvc;
using MongoDB;

namespace MongoDbNotes {
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : System.Web.HttpApplication, IContainerProviderAccessor {
        static IContainerProvider _containerProvider;

        public IContainerProvider ContainerProvider {
            get { return _containerProvider; }
        }

        public static void RegisterRoutes(RouteCollection routes) {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",                                              // Route name
                "{controller}/{action}/{id}",                           // URL with parameters
                new { controller = "Note", action = "Index", id = "" }  // Parameter defaults
            );
        }

        public static IMongoDatabase ConnectMongoDb() {
            var url = ConfigurationManager.AppSettings["mongo-connection"];
            var dbName = ConfigurationManager.AppSettings["mongo-database"];

            var mongo = new Mongo(url);
            mongo.Connect();
            var db = mongo.GetDatabase(dbName);

            return db;
        }

        protected void Application_Start() {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterModule(new ContainerRegistrations());
            _containerProvider = new ContainerProvider(builder.Build());

            ControllerBuilder.Current.SetControllerFactory(new AutofacControllerFactory(ContainerProvider));

            AreaRegistration.RegisterAllAreas();
            RegisterRoutes(RouteTable.Routes);
        }
    }
}