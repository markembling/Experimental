using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Driver;
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

        public ActionResult Show(string id) {
            var note = _notes.FindOneById(new Oid(id));
            return View(note);
        }

        public ActionResult Add() {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Add(string title, string body) {
            if (title.Length == 0)
                ModelState.AddModelError("title", "Title cannot be blank");

            if (body.Length == 0)
                ModelState.AddModelError("body", "Body cannot be blank");

            if (ModelState.IsValid) {
                var doc = new Document();
                doc.Add("title", title);
                doc.Add("body", body);

                _notes.Save(doc);

                return this.RedirectToAction("Index");
            }

            return View();
        }
    }
}
