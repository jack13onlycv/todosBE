# todosBE
**Restful api for todos on nodeJS with MongoDB**

- [x] Backend with NodeJS
- [x] MongoDB as database with Mongoose
- [x] Logging with middleware
- [x] Cors and dotenv usage

**API**
GET /todos/?(page=1&limit=10) returns all todos
GET /todos/:id return one todo by id
POST /todos creates a todo
PATCH /todos/:id patches todo by id
DELETE /todos/:id deletes todo by id
