using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDbNotes.Models;
using MongoDbNotes.Models.Entities;
using MongoDbNotes.Models.Queries;
using MongoDbNotes.ViewModels;
using MongoDbNotes.ViewModels.Note;
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
        public ActionResult Show(ObjectId id) {
            var note = new NoteById(id).Execute(_mongo);
            return View(note);
        }

        public ActionResult Add() {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Add(Note note) {
            if (ModelState.IsValid) {
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
        public ActionResult Delete(ObjectId id) {
            _mongo.GetCollection<Note>().Delete(new Note {Id = id});

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

            return View(new TaggedViewModel {
                 TagName = tag, 
                 Notes = results
             });
        }
    }
}
