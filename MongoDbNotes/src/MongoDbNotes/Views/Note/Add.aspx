<%@ Page Title="" Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>
<%@ Import Namespace="MongoDbNotes"%>

<asp:Content ID="Content1" ContentPlaceHolderID="TitleContent" runat="server"><%= Html.Title("Add New Note") %></asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">

    <h2>Add New Note</h2>
    
    <% Html.BeginForm("Add"); %>
        <ol>
            <li>
                <label for="title">Title:</label>
                <%= Html.TextBox("title", null, new { size = 30, maxlength = 30 }) %>
            </li>
            <li>
                <label for="body">Note:</label>
                <%=Html.TextArea("body", null, new {cols = 60, rows = 14 }) %>
            </li>
            <li>
                <label for="tags">Tags (separate with spaces):</label>
                <%= Html.TextBox("tags", null, new { size = 50 }) %>
            </li>
            <li>
                <input type="submit" value="Add" />
                <%= Html.ActionLink("Cancel", "Index") %>
            </li>
        </ol>
    <% Html.EndForm(); %>

</asp:Content>
