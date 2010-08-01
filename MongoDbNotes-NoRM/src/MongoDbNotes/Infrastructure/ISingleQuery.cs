using Norm;

namespace MongoDbNotes.Infrastructure {
    public interface ISingleQuery<T> {
        T Execute(Mongo mongo);
    }
}