<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<MongoDB.Document>>" %>
<%@ Import Namespace="MongoDB" %>
<%@ Import Namespace="MongoDbNotes"%>

<asp:Content ID="indexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    <%= Html.Title(null) %></asp:Content>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContent" runat="server">
    
    <% if (Model.Count() == 0) { %>
        <p>There are no notes</p>
    <% } else { %>
    
        <ul class="notes">
        <% foreach (var note in Model) { %>
            <li><%= Html.ActionLink((string)note["title"], "Show", new { id = ((Oid)note["_id"]).ToFriendlyString() }) %></li>
        <% } %>
        </ul>
        
    <% } %>
    
    <p class="clear-both"><%= Html.ActionLink("Add Note", "Add", "Note") %></p>
    
</asp:Content>
