<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" 
	Inherits="System.Web.Mvc.ViewPage<IEnumerable<MongoDB.Driver.GridFS.MongoGridFSFileInfo>>" %>
<%@ Import Namespace="MongoDB.Bson" %>

<asp:Content ID="aboutContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2>Files</h2>

	<form action="<%= Url.Action("Files", "Home") %>">
		<fieldset>
			<legend>Search</legend>

			<input type="search" id="search" name="search" />
			<input type="submit" value="Go" />
		</fieldset>
	</form>

	<% if (Model.Any()) { %>

		<ul>
			<% foreach (var file in Model) { %>
				<li>
					<strong><%= file.Name%></strong>
					<strong><%= Html.ActionLink("Download", "Download", "Home", new { id = file.Id.ToString() }, new {}) %></strong>
					<%= Html.ActionLink("Delete", "Delete", "Home", new { id = file.Id.ToString() }, new {})%>
					<br>
					ID: <%= file.Id%><br />
					Length: <%= file.Length%><br>
					Content Type: <%= file.ContentType%><br />
					Uploaded: <%= file.UploadDate %><br>
					Metadata:
					<pre><%= file.Metadata.ToJson()%></pre>
				</li>
			<% } %>
		</ul>

	<% } else { %>
		<p>No files found.</p>
	<% } %>
</asp:Content>
