using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using MongoDB.Driver.GridFS;

/**
 * Beware - a connection to MongoDB is created in *each action* it is needed 
 * in. Bad bad bad - and I'll fix it at some point. It's only a test app so
 * perfection is irrelevant.
 */

namespace GridFsMvc.Controllers {
	[HandleError]
	public class HomeController : Controller {
		private const string MongoConnectionString = "mongodb://localhost";
		private const string MongoDatabase = "gridfstest";

		// Should do this in the routes but hey, it's only a quick test/demo app.
		public ActionResult Index() {
			return RedirectToAction("Files");
		}

		public ActionResult Upload() {
			return View();
		}

		[HttpPost]
		public ActionResult Upload(HttpPostedFileBase file, string title) {
			var mongo = MongoServer.Create(MongoConnectionString);
			var db = mongo.GetDatabase(MongoDatabase);
			var gfs = db.GridFS;

			// Put file into gridfs
			var stream = file.InputStream;
			var uploaded = gfs.Upload(stream, file.FileName, new MongoGridFSCreateOptions {
				ContentType = file.ContentType, Metadata = new BsonDocument{{"title", title}}
			});

			mongo.Disconnect();

			return Content(Url.Action("Download", new { id = uploaded.Id.ToString() }), "text/plain");
		}

		/// <summary>
		/// Display all the files
		/// </summary>
		public ActionResult Files(string search) {
			var mongo = MongoServer.Create(MongoConnectionString);
			var db = mongo.GetDatabase(MongoDatabase);
			var gfs = db.GridFS;

			var files = new List<MongoGridFSFileInfo>();

			if (! string.IsNullOrEmpty(search)) {
				var regex = new BsonRegularExpression(string.Format(".*{0}.*", search), "i");
				files = gfs.Find(
					Query.Or(
						Query.Matches("metadata.title", regex), 
						Query.Matches("filename", regex)))
					.ToList();
			} else {
				files = gfs.FindAll().ToList();
			}

			mongo.Disconnect();

			return View(files);
		}

		/// <summary>
		/// Download an individual file
		/// </summary>
		public ActionResult Download(string id) {
			var mongo = MongoServer.Create(MongoConnectionString);
			var db = mongo.GetDatabase(MongoDatabase);
			var gfs = db.GridFS;

			var file = gfs.FindOneById(new ObjectId(id));

			mongo.Disconnect();

			return File(file.OpenRead(), file.ContentType, file.Name);
		}

		public ActionResult Delete(string id) {
			var mongo = MongoServer.Create(MongoConnectionString);
			var db = mongo.GetDatabase(MongoDatabase);
			var gfs = db.GridFS;

			gfs.DeleteById(new ObjectId(id));

			mongo.Disconnect();

			TempData["notice"] = "File deleted.";
			return RedirectToAction("Files");
		}
	}
}
