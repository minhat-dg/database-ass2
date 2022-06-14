module.exports = app => {
    const chuyen = require("../controllers/chuyen.js");
  
    var router = require("express").Router();
    
    // Create a new Account
    router.post("/", chuyen.create);
  
    router.put("/:id", chuyen.update);

    router.delete("/:id", chuyen.delete);

    router.get("/", chuyen.getAll);

    router.get("/:id", chuyen.getByTuyenId);

    app.use('/api/chuyen', router);
  };