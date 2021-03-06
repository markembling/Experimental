﻿using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using System.Web.Services.Description;
using Autofac;
using Autofac.Integration.Web;
using Autofac.Integration.Web.Mvc;
using FluentValidation.Attributes;
using FluentValidation.Mvc;
using MongoDbNotes.Infrastructure;
using MongoDbNotes.Models;
using MongoDbNotes.Models.Binders;
using MongoDbNotes.Models.Entities;
using MongoDbNotes.Models.Mappings;
using Norm;
using Norm.Configuration;

namespace MongoDbNotes {
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801

    public class MvcApplication : HttpApplication, IContainerProviderAccessor {
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

        public static Mongo ConnectMongoDb() {
            MongoConfiguration.Initialize(config => config.AddMap<NoteMap>());
            return Mongo.Create("MongoConnection");
        }

        protected void Application_Start() {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());
            builder.RegisterModule(new ContainerRegistrations());
            _containerProvider = new ContainerProvider(builder.Build());

            // Hook up Autofac's controller factory
            ControllerBuilder.Current.SetControllerFactory(new AutofacControllerFactory(ContainerProvider));

            // Hook up custom model binders
            ModelBinders.Binders.Add(typeof(Note), new NoteBinder());

            // Set up FluentValidation
            DataAnnotationsModelValidatorProvider.AddImplicitRequiredAttributeForValueTypes = false;
            ModelValidatorProviders.Providers.Add(
                new FluentValidationModelValidatorProvider(
                    new AutofacValidatorFactory(ContainerProvider.ApplicationContainer)));


            AreaRegistration.RegisterAllAreas();
            RegisterRoutes(RouteTable.Routes);
        }
    }
}