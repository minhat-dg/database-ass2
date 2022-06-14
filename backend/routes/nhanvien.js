module.exports = app => {
    const nhanvien = require("../controllers/nhanvien.js");
  
    var router = require("express").Router();
    
    // Create a new Account
    router.post("/", nhanvien.create);

    app.use('/api/nhanvien', router);
  };