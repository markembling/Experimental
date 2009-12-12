using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDbNotes.Models;

namespace MongoDbNotes.Controllers {
    [HandleError]
    public class NoteController : Controller {
        private readonly NoteRepository _notes;

        public NoteController(NoteRepository notes) {
            _notes = notes;
        }

        public ActionResult Index() {
            var notes = _notes.FindAll();

            return View(notes);
        }
    }
}
