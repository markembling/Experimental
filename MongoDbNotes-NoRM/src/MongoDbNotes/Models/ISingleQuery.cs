using Norm;

namespace MongoDbNotes.Models {
    public interface ISingleQuery<T> {
        T Execute(Mongo mongo);
    }
}