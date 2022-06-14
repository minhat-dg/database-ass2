module.exports = app => {
    const tuyen = require("../controllers/tuyen.js");
  
    var router = require("express").Router();
    
    // Create a new Account
    router.post("/", tuyen.create);
  
    router.put("/:id", tuyen.update);

    router.delete("/:id", tuyen.delete);

    router.get("/", tuyen.getAll);

    app.use('/api/tuyen', router);
  };