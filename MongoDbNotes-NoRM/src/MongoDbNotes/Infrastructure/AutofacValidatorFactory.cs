using System;
using Autofac;
using FluentValidation;

namespace MongoDbNotes.Infrastructure {
    public class AutofacValidatorFactory : ValidatorFactoryBase {
        private readonly IContainer _iocContainer;

        public AutofacValidatorFactory(IContainer iocContainer) {
            _iocContainer = iocContainer;
        }

        public override IValidator CreateInstance(Type validatorType) {
            object instance;
            _iocContainer.TryResolve(validatorType, out instance);
            return instance as IValidator;
        }
    }
}