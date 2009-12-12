using System;
using System.Linq;
using System.Web.Mvc;
using MongoDB.Driver;

namespace MongoDbNotes {
    public static class Helpers {
        public static string Title (this HtmlHelper html, string title) {
            const string siteTitle = "Notes";
            if (string.IsNullOrEmpty(title))
                return siteTitle;
            return string.Format("{0} - {1}", title, siteTitle);
        }

        public static string ToFriendlyString(this Oid oid) {
            var bytes = oid.Value;
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }
}