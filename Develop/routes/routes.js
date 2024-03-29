const fs = require('fs');
const path = require('path');

module.exports = app => {

  fs.readFile("Develop/db/db.json", "utf8", (err, data) => {

    if (err) throw err;
    var notes = JSON.parse(data);

    // API ROUTES //

    app.get("/api/notes", function(req, res) {
      res.json(notes);
    });

    app.post("/api/notes", function(req, res)
    {
      let newNote = req.body;
      notes.push(newNote);
      updatedb();
      return console.log("Added new note: "+newNote.title);
    });

    app.get("/api/notes/:id", function(req, res) {
      notes.splice(req.params.id, 1);
      updatedb();
      console.log("Deleted note with id"+req.params.id);
    });

    // VIEW ROUTES //

    app.get('/notes', function(req, res) {
      res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    app.get('*', function(req, res) {
      res.sendFile(path.join(_dirname, "../public/index.html"));
    });

    function updatedb() {
      fs.writeFile("Develop/db/db.json",JSON.stringify(notes, '\t'),err => {
        if(err) throw err;
        return true;
      });
    }
  });

}