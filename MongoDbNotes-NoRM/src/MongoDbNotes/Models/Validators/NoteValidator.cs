using FluentValidation;
using MongoDbNotes.Models.Entities;

namespace MongoDbNotes.Models.Validators {
    public class NoteValidator : AbstractValidator<Note> {
        public NoteValidator() {
            RuleFor(x => x.Title).NotEmpty();
            RuleFor(x => x.Body).NotEmpty();
        }
    }
}