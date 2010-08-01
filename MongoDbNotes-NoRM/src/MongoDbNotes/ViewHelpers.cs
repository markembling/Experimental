using System;
using System.Linq;
using System.Web.Mvc;

namespace MongoDbNotes {
    public static class ViewHelpers {
        public static string Title (this HtmlHelper html, string title) {
            const string siteTitle = "Notes";
            if (string.IsNullOrEmpty(title))
                return siteTitle;
            return string.Format("{0} - {1}", html.Encode(title), siteTitle);
        }
    }
}