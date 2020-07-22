This is a RESTLESS API for a URL Shortener application (backend) made using Node.JS and the framework Express and MongoDB as the database.

NPM Modules used : express (for the http server), helmet (security middleware for express), cors (cors middleware for express), mongoose (mongodb database handler) and yup (for validation).
This is a collaboration with Mohamed Alaa, his job was the front end application using Vue.js and here is the link : https://github.com/mohammed-alaa/url-shortner
_________________________________

Usage :
```
/register (POST) : takes 'Email', 'Username' and 'Password' as params, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/login (POST) : takes 'Email' and 'Password' as params, returns 'success' true alongside a 'message' with values 'token' and 'name' if the operation is successful and false alongside a message of error if the operation is not successful
/authenticate (GET) : takes 'Token' as a query param, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/logout (GET) : takes 'Token' as a query param, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/change-name (POST) : takes 'Token' and 'newName' as params, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/change-password (POST) : takes 'Token', 'oldPassword' and 'newPassword' as params, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/add_url (POST) : takes 'Token', 'Url' and 'Slug' as params, returns success true if the operation is successful and false alongside a message of error if the operation is not successful
/get_url (GET) : takes 'Token' as a query param, returns success true and message (array) with data of (id, slug, url, clicks, time) if the operation is success and false alongside a message of error if the operation is not successful
/url/:id (GET) : takes :id as a param, returns success true and message that contains a url if the operation is successful and false alongside a message of error if the operation is not successful
```
