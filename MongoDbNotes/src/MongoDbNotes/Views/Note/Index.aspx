<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage<IEnumerable<Document>>" %>
<%@ Import Namespace="MongoDB.Driver"%>

<asp:Content ID="indexTitle" ContentPlaceHolderID="TitleContent" runat="server">
    Home Page
</asp:Content>

<asp:Content ID="indexContent" ContentPlaceHolderID="MainContent" runat="server">
    <h2><%=Html.Encode(ViewData["Message"])%></h2>
    
    <% if (Model.Count() == 0) { %>
        <p>There are no notes</p>
    <% } else { %>
    
        <ul>
        <% foreach (var note in Model) { %>
            <li><%= note["title"] %></li>
        <% } %>
        </ul>
        
    <% } %>
    
    <p><%= Html.ActionLink("Add Note", "Add", "Note") %></p>
    
</asp:Content>
