<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="java.util.* "%>

<!DOCTYPE html>
<html>
<head>
	<title>Post List</title>
	<meta charset="utf-8">

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
        table{font-size: 20px;}
      	form{display: inline-block;}
        td{word-break: break-word;}
    </style>
</head>
<body>
	<!-- New post btn -->
	<div class="jumbotron text-center">
		<h1>Welcome <c:out value="${username}"></c:out> </h1>
	</div>
	
	<!-- List of posts -->
	<table class="table table-striped table-responsive">
		<!-- Table Title -->
		<tr>
			
			<th>
				<form action="post" id="0" method="GET">
					<input type="hidden" name="username" value="<c:out value="${username}"></c:out>">
					<input type="hidden" name="postid" value="0">
					<button type="submit" name="action" value="open" class="btn btn-primary float-left">New Post</button>
				</form>
			</th>
			<th>Title</th>
			<th>Created</th>
			<th>Modified</th>
		</tr>	

		<% List<String> titles = (ArrayList<String>)request.getAttribute("titles"); %>
		<% List<String> mTimes = (ArrayList<String>)request.getAttribute("mTimes");%>
		<% List<String> cTimes = (ArrayList<String>)request.getAttribute("cTimes");%>
		<% List<Integer> postIds = (ArrayList<Integer>)request.getAttribute("postIds");%>
		<% if (titles!=null){%>
		<% for (int i=0; i<titles.size(); i++) { %>
	    	<tr>
	    		<td>
		    		<div class="btn-group">
						<form id= "<%= i %>"; action="post" method="GET">
							<button type="submit" name="action" value="open" class="btn btn btn-info">Open</button>
							<input type="hidden" name="username" value="<c:out value="${username}"></c:out>">
		                	<input type="hidden" name="postid" value="<%= postIds.get(i) %>">
						</form>
						<form id= "<%= i %>"; action="post" method="POST">
							<button type="submit" name="action" value="delete" class="btn btn-danger">Delete</button>
							<input type="hidden" name="username" value="<c:out value="${username}"></c:out>">
		                	<input type="hidden" name="postid" value="<%= postIds.get(i) %>">
						</form>
					</div>		
				</td>
				<td><%=titles.get(i) %></td>
				<td><%=cTimes.get(i) %></td>
				<td><%=mTimes.get(i) %></td>
					
				
			</tr>		
		<% } }%>
	</table>
</body>
</html>