using System;
using System.Linq;
using System.Web.Mvc;
using MongoDB;

namespace MongoDbNotes {
    public static class Helpers {
        public static string Title (this HtmlHelper html, string title) {
            const string siteTitle = "Notes";
            if (string.IsNullOrEmpty(title))
                return siteTitle;
            return string.Format("{0} - {1}", html.Encode(title), siteTitle);
        }

        public static string ToFriendlyString(this Oid oid) {
            var bytes = oid.ToByteArray();
            return BitConverter.ToString(bytes).Replace("-", "").ToLower();
        }
    }
}