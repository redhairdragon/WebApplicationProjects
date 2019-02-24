<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%><%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %><!DOCTYPE html>
<!DOCTYPE html>
<html>
<head>
	<title>Error Found</title>
</head>
<body>
	<head>Error Found</head>
	<h1>Error message:</h1>
	<p><%=  request.getAttribute("message") %></p>
	<a href="/editor/post?username=<c:out value="${username}"></c:out>">get back to list</a>
</body>
</html>