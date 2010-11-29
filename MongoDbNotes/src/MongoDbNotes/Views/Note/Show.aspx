<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<MongoDB.Document>" %>
<%@ Import Namespace="MongoDB" %>
<%@ Import Namespace="MongoDbNotes"%>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    <%= Html.Title((string)Model["title"]) %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <div class="note">
        <h2><%= Html.Encode((string)Model["title"]) %></h2>
        
        <% Html.BeginForm("Delete", "Note", new { id = ((Oid)Model["_id"]).ToFriendlyString() }, 
                          FormMethod.Post, new { @class = "delete" }); %>
            <%= Html.HttpMethodOverride(HttpVerbs.Delete) %>
            <input type="submit" value="Delete" />
        <% Html.EndForm(); %>
        
        <p><%= Html.Encode(Model["body"]) %></p>

        <% if (Model["tags"] as IList<string> != null) { %>
            <ul class="tags">
            <% foreach (var tag in Model["tags"] as IList<string>) { %>
                <li><%= Html.ActionLink(tag, "Tagged", new { tag })%></li>
            <% } %>
            </ul>
        <% } %>
        
    </div>
    
    <p><%= Html.ActionLink("Back", "Index") %></p>
</asp:Content>
