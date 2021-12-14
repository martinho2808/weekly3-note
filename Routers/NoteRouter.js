const express = require("express");

class NoteRouter {
  constructor(noteService) {
    this.noteService = noteService;
  }

  router() {
    let router = express.Router();
    router.get("/", this.get.bind(this));
    router.post("/", this.post.bind(this));
    router.put("/:id", this.put.bind(this));
    router.delete("/:id", this.delete.bind(this));

    return router;
  }

  get(req, res) {
    console.log("NoteRouter: GET Method");
    return this.noteService
      .list(req.auth.user)
        .then((notes) => {
          console.log(req.auth.user);
          console.log(1222222,notes);
          res.json(notes);
        })
   
        .catch((err) => res.status(500).json(err));
         
  }


  post(req, res) {
    console.log("post method");
    return this.noteService
      .add(req.body.note, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

 
  put(req, res) {
    return this.noteService
      .update(req.params.id, req.body.note, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }

  delete(req, res) {
    console.log("DELETE", req.params.id);
    return this.noteService
      .remove(req.params.id, req.auth.user)
      .then(() => this.noteService.list(req.auth.user))
      .then((notes) => res.json(notes))
      .catch((err) => res.status(500).json(err));
  }
}


module.exports = NoteRouter;
