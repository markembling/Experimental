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
using MongoDB.Driver;

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

        public static MongoDB.Driver.Database ConnectMongoDb() {
            var host = ConfigurationManager.AppSettings["mongo-host"];
            var port = int.Parse(ConfigurationManager.AppSettings["mongo-port"]);
            var dbname = ConfigurationManager.AppSettings["mongo-database"];
            var username = ConfigurationManager.AppSettings["mongo-username"];
            var password = ConfigurationManager.AppSettings["mongo-password"];

            var mongo = new Mongo(host, port);
            mongo.Connect();
            var db = mongo.getDB(dbname);

            if (! string.IsNullOrEmpty(username)) {
                db.Authenticate(username, password);
            }

            //db.Authenticate()

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