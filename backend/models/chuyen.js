var sql = require('mssql/msnodesqlv8');
var config = require('./db-config.js')

const Chuyen = function(chuyen) {
    this.id = chuyen.id;
    this.carNum= chuyen.carNum;
    this.tuyenId = chuyen.tuyenId;
    this.date = chuyen.date;
    this.cost = chuyen.cost;
}

Chuyen.create = (chuyen, result) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();
            var query = `INSERT INTO CHUYEN VALUES ('${chuyen.id}','${chuyen.carNum}',${chuyen.tuyenId},convert(datetime,'${chuyen.date}',105),${chuyen.cost})`;
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("errorrrr: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: res.insertId, ...chuyen });
            });
        }
    })
}

Chuyen.update = (chuyen, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `UPDATE CHUYEN SET MA_SO_CHUYEN = '${chuyen.id}',PHUONG_TIEN = '${chuyen.carNum}',MA_SO_TUYEN = ${chuyen.tuyenId},NGAY_DI = convert(datetime,'${chuyen.date}',105),KINH_PHI = ${chuyen.cost} WHERE MA_SO_CHUYEN = ${chuyen.id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                    result({ kind: "not_found" }, null);
                    return;
                }
                
                result(null, res);
            });
        }
    })
};

Chuyen.delete = (id, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `DELETE FROM CHUYEN WHERE MA_SO_CHUYEN = ${id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                // not found CHUYEN with id
                result({ kind: "not_found" }, null);
                return;
                }
        
                result(null, res);
            });
        }
    })
};

Chuyen.getAll = (title, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = "SELECT * FROM CHUYEN";
            console.log("QUERY: "+query)
            request.query(query,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                console.log("Chuyen: ", res);
                result(null, res);
            });
        }
    })
};

Chuyen.getByTuyenId = (id, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `SELECT * FROM CHUYEN WHERE MA_SO_TUYEN = ${id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                console.log("Chuyen: ", res);
                result(null, res);
            });
        }
    })
};


module.exports = Chuyen;