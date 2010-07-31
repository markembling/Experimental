<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<TaggedNotesViewModel>" %>
<%@ Import Namespace="MongoDbNotes"%>
<%@ Import Namespace="MongoDbNotes.ViewModels"%>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
	<%= Html.Title(string.Format("Notes Tagged {0}", Model.TagName)) %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Notes Tagged '<%= Html.Encode(Model.TagName) %>'</h2>
    
    <% if (Model.Notes.Count() == 0) { %>
        <p>There are no notes tagged '<%= Html.Encode(Model.TagName) %>'</p>
    <% } else { %>
    
        <ul class="notes">
        <% foreach (var note in Model.Notes) { %>
            <li><%= Html.ActionLink(note.Title, "Show", new { id = note.Id }) %></li>
        <% } %>
        </ul>
        
    <% } %>
    
    <p class="clear-both"><%= Html.ActionLink("Back", "Index", "Note") %></p>

</asp:Content>
