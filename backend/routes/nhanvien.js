module.exports = app => {
    const nhanvien = require("../controllers/nhanvien.js");
  
    var router = require("express").Router();
    
    // Create a new Account
    router.post("/", nhanvien.create);

    router.put("/:id", nhanvien.update);

    router.delete("/:id", nhanvien.delete);

    router.get("/", nhanvien.getAll);

    app.use('/api/nhanvien', router);
  };