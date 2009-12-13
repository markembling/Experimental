<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<Document>" %>
<%@ Import Namespace="MongoDbNotes"%>
<%@ Import Namespace="MongoDB.Driver"%>

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
        
        <%-- This is a workaround for MongoDB.Driver's handling of empty arrays.
             Instead of them getting returned as an empty string[], they come back as an empty 
             MongoDB.Driver.Document. This is presumably because it does not know what type of
             array to return (string[], int[], etc...). Therefore we have to check the type
             to know whether we're able to iterate it or whether it means there are no tags. --%>
        <% if (Model["tags"].GetType() == typeof(string[])) { %>
            <ul class="tags">
            <% foreach (var tag in (String[])Model["tags"]) { %>
                <li><%= Html.ActionLink(tag, "Tagged", new { tag })%></li>
            <% } %>
            </ul>
        <% } %>
        
    </div>
    
    <p><%= Html.ActionLink("Back", "Index") %></p>
</asp:Content>
