<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<Document>" %>
<%@ Import Namespace="MongoDbNotes"%>
<%@ Import Namespace="MongoDB.Driver"%>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server">
    <%= Html.Title((string)Model["title"]) %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%= Html.Encode((string)Model["title"]) %></h2>
    
    <div>
        <%= Model["body"] %>
    </div>
    
    <% Html.BeginForm("Delete", "Note", new { id = ((Oid)Model["_id"]).ToFriendlyString() }); %>
        <%= Html.HttpMethodOverride(HttpVerbs.Delete) %>
        <input type="submit" value="Delete" />
    <% Html.EndForm(); %>
    
    <p><%= Html.ActionLink("Back", "Index") %></p>
</asp:Content>
