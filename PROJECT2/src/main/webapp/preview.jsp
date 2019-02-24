<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>Preview</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>

    <style type="text/css">
        .jumbotron {
            background-color:#8080ff !important;
            color: white;
            margin-bottom: 0px;
        }
        .bnt{
        	margin: 0 0 0 0;
        }
    </style>
</head>
<body>

	<div class="jumbotron text-center"><h1>Preview</h1></div>
	

	<div class="panel panel-default col-md-10 col-md-offset-1">
		<div class="panel-heading">
			<form action="post" method="POST">
				<button class="btn btn-primary btn-lg" type="submit" name="action" value="open">Close Preview</button>
				<input type="hidden" name="username" value="<c:out value="${param['username']}"></c:out>">
				<input type="hidden" name="postid" value="<%= request.getAttribute("postid")%>">
				<input type="hidden" name="title" value="<c:out value="${title}"></c:out>">
				<input type="hidden" name="body" value="<c:out value="${body}"></c:out>">
			</form>
		</div>
		<div class="panel-body">
			<h1><%= request.getAttribute("titlePreview")%></h1>
			<div><%= request.getAttribute("bodyPreview")%></div>
		</div>
		
	</div>
	
</body>
</html>