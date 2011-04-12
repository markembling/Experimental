<%@ Page Language="C#" MasterPageFile="~/Views/Shared/Site.Master" Inherits="System.Web.Mvc.ViewPage" %>

<asp:Content ID="aboutContent" ContentPlaceHolderID="HeadContent" runat="server">
	<script src="http://ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js"></script>

	<link href="/Content/uploadify/uploadify.css" type="text/css" rel="stylesheet" />
	<script type="text/javascript" src="/Content/uploadify/jquery-1.4.2.min.js"></script>
	<script type="text/javascript" src="/Content/uploadify/swfobject.js"></script>
	<script type="text/javascript" src="/Content/uploadify/jquery.uploadify.v2.1.4.min.js"></script>
	<script type="text/javascript">
	$(document).ready(function() {
		$('#file_upload').uploadify({
			'uploader'  : '/Content/uploadify/uploadify.swf',
			'script'    : '<%= Url.Action("Upload", "Home") %>',
			'cancelImg' : '/Content/uploadify/cancel.png',
			'fileDataName' : 'file',
			'auto'      : false,
			//'multi' : true,
			'removeCompleted' : false,
			'buttonText': "Browse for file",
			'onError': function(event, id, file, error) { alert(error.info); },
			'onAllComplete': function(event, data) { allDone(); }
		});

		$('#uploadbtn').click(function(){
			var t = $("#file-title").val();
			if (t.length == 0) {
				alert("Enter a title");
				return false;
			}

			$('#file_upload').uploadifySettings('scriptData', {"title": t});
			$('#file_upload').uploadifyUpload();

			return false;
		});

		$('#done').click(function(){
			window.location.href = "<%= Url.Action("Files", "Home") %>";
		});
	});

	function allDone() {
		$("#main").prepend('<p class="notice">File successfully uploaded.</p>');
		$("#done").removeAttr("disabled")
	}
	</script>
</asp:Content>

<asp:Content ID="Content2" ContentPlaceHolderID="MainContent" runat="server">
	<h2>Upload a file</h2>

	<form method="post" action="<%= Url.Action("Upload", "Home") %>" enctype="multipart/form=data">
		<label for="title">Title: </label><br>
		<input type="text" name="title" id="file-title" />
		<br><br>

		<input type="file" name="file" id="file_upload"><br>

		<input type="submit" id="uploadbtn" value="Upload">
		<input type="button" id="done" value="Continue" disabled />
	</form>
</asp:Content>
