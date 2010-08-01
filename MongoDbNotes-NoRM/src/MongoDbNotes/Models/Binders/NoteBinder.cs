using System;
using System.Web.Mvc;
using MongoDbNotes.Models.Entities;

namespace MongoDbNotes.Models.Binders {
    public class NoteBinder : DefaultModelBinder {
        public override object BindModel(ControllerContext controllerContext, ModelBindingContext bindingContext) {
            var note = base.BindModel(controllerContext, bindingContext) as Note;  // Have the default binder handle most of this
            var tagsValue = bindingContext.ValueProvider.GetValue("Tags");  // Get the posted value for tags

            if (tagsValue != null && !string.IsNullOrEmpty(tagsValue.AttemptedValue.Trim()) && note != null) {
                bindingContext.ModelState.Remove("Tags"); // Remove any existing errors for this property

                note.Tags.Clear();
                note.Tags.AddRange(
                    tagsValue.AttemptedValue.Trim()
                        .Split(new[] {' '}, StringSplitOptions.RemoveEmptyEntries)
                );
            }

            return note;
        }
    }
}