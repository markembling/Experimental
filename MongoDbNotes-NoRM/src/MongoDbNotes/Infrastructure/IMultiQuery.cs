using System.Collections.Generic;
using Norm;

namespace MongoDbNotes.Infrastructure {
    public interface IMultiQuery<T> {
        IEnumerable<T> Execute(Mongo mongo);
    }
}