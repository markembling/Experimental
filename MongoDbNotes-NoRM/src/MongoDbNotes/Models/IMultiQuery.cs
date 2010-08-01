using System.Collections.Generic;
using Norm;

namespace MongoDbNotes.Models {
    public interface IMultiQuery<T> {
        IEnumerable<T> Execute(Mongo mongo);
    }
}