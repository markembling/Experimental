<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<MongoDbNotes.Models.Entities.Note>" %>
<%@ Import Namespace="MongoDbNotes"%>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    <%= Html.Title(Model.Title) %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="note">
        <h2><%= Html.Encode(Model.Title) %></h2>
        
        <% Html.BeginForm("Delete", "Note", new { id = Model.Id }, 
               FormMethod.Post, new { @class = "delete" }); %>
            <%= Html.HttpMethodOverride(HttpVerbs.Delete) %>
            <input type="submit" value="Delete" />
        <% Html.EndForm(); %>
        
        <p><%= Html.Encode(Model.Body) %></p>
        
        <% if (Model.Tags.Any()) { %>
            <ul class="tags">
            <% foreach (var tag in Model.Tags) { %>
                <li><%= Html.ActionLink(tag, "Tagged", new { tag })%></li>
            <% } %>
            </ul>
        <% } %>
        
    </div>
    
    <p><%= Html.ActionLink("Back", "Index") %></p>
</asp:Content>
