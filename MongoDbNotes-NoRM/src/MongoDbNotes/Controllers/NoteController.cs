using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDbNotes.Models;
using MongoDbNotes.Models.Queries;
using MongoDbNotes.ViewModels;
using Norm;

namespace MongoDbNotes.Controllers {
    [HandleError]
    public class NoteController : Controller {
        private readonly Mongo _mongo;

        public NoteController(Mongo mongo) {
            _mongo = mongo;
        }

        /// <summary>
        /// Shows a list of all notes.
        /// </summary>
        /// <returns></returns>
        public ActionResult Index() {
            var notes = new AllNotes().Execute(_mongo);
            return View(notes);
        }

        /// <summary>
        /// Shows a single note with the given id.
        /// </summary>
        /// <param name="id">The id (as a string)</param>
        /// <returns></returns>
        public ActionResult Show(string id) {
            var note = new NoteById(new ObjectId(id)).Execute(_mongo);
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
                var note = new Note { Title = title, Body = body };
                note.Tags.AddRange(tags.Split(new[]{' '}, StringSplitOptions.RemoveEmptyEntries));

                _mongo.GetCollection<Note>().Save(note);

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
            _mongo.GetCollection<Note>().Delete(new Note {Id = new ObjectId(id)});

            TempData["notice"] = "Note deleted";
            return RedirectToAction("Index");
        }

        /// <summary>
        /// Shows notes with a given tag.
        /// </summary>
        /// <param name="tag">The tag</param>
        /// <returns></returns>
        public ActionResult Tagged(string tag) {
            var results = new NotesByTag(tag).Execute(_mongo);

            return View(new TaggedNotesViewModel {
                 TagName = tag, 
                 Notes = results
             });
        }
    }
}
