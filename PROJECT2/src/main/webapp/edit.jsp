<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>

<html>
<head>
    <meta charset="UTF-8">
    <title>Edit Post</title>

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
        label {
            font-size: 20px;
        }
    </style>

</head>
<body>
    <div class="jumbotron text-center"><h1>Edit Post</h1></div>
    <form action="post" method="POST" >
        <div class="form-group">
            <label for="title">Title</label>
            <input maxlength="100" class="form-control" type="text" name="title" id="title" value="<c:out value="${title}"></c:out>">
        </div>

        <input type="hidden" name="postid" value="<c:out value="${postid}"></c:out>">
        <input type="hidden" name="username" value="<c:out value="${username}"></c:out>">

        <div class="form-group">
            <label for="body">Body</label>
            <textarea class="form-control" style="height: 20rem;" name="body" id="body"><%=  request.getAttribute("body") %></textarea>
        </div>

        <div class="btn-group btn-group-lg">
            <button type="submit" name="action" value="save" class="btn btn-primary" >Save</button>
            <button type="submit" name="action" value="preview" class="btn btn-info" >Preview</button>
            <button type="submit" name="action" value="list" class="btn btn-warning" >Close</button>
            <button type="submit" name="action" value="delete" class="btn btn-danger" >Delete</button>
        </div>
    </form>
</body>
</html>
