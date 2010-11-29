using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB;
using MongoDbNotes.Models;
using MongoDbNotes.ViewModels;

namespace MongoDbNotes.Controllers {
    [HandleError]
    public class NoteController : Controller {
        private readonly NoteRepository _repository;

        public NoteController(NoteRepository notes) {
            _repository = notes;
        }

        /// <summary>
        /// Shows a list of all notes.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index() {
            var notes = _repository.FindAll();

            return View(notes);
        }

        /// <summary>
        /// Shows a single note with the given id.
        /// </summary>
        /// <param name="id">The id (as a string)</param>
        /// <returns></returns>
        public ActionResult Show(string id) {
            var note = _repository.FindOneById(new Oid(id));
            return View(note);
        }

        public ActionResult Add() {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Add(string title, string body, string tags) {
            if (title.Length == 0)
                ModelState.AddModelError("title", "Title cannot be blank");

            if (body.Length == 0)
                ModelState.AddModelError("body", "Body cannot be blank");

            if (ModelState.IsValid) {
                var doc = new Document();
                doc.Add("title", title);
                doc.Add("body", body);
                doc.Add("tags", tags.Split(new[]{' '}, StringSplitOptions.RemoveEmptyEntries));

                _repository.Save(doc);

                return RedirectToAction("Index");
            }

            return View();
        }

        /// <summary>
        /// Deletes the note with the given id
        /// </summary>
        /// <param name="id">The id (as a string)</param>
        /// <returns></returns>
        [AcceptVerbs(HttpVerbs.Delete)]
        public ActionResult Delete(string id) {
            var oid = new Oid(id);
            _repository.DeleteById(oid);

            TempData["notice"] = "Note deleted";
            return RedirectToAction("Index");
        }

        /// <summary>
        /// Shows notes with a given tag.
        /// </summary>
        /// <param name="tag">The tag</param>
        /// <returns></returns>
        public ActionResult Tagged(string tag) {
            var query = new Document {{"tags", tag}};
            var results = _repository.Find(query);

            return View(new TaggedNotesViewModel {
                 TagName = tag, 
                 Notes = results
             });
        }
    }
}
