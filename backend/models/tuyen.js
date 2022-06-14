var sql = require('mssql/msnodesqlv8');
var config = require('./db-config.js')

const Tuyen = function(tuyen){
    this.id = tuyen.id;
    this.name = tuyen.name;
    this.startTime = tuyen.startTime;
    this.lengthTime = tuyen.lengthTime;
}

Tuyen.create = (tuyen, result) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();
            var query = `INSERT INTO TUYEN_DUONG VALUES (${tuyen.id},\'${tuyen.name}\',convert(time,\'${tuyen.startTime}\',24),${tuyen.lengthTime})`;
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("errorrrr: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: res.insertId, ...tuyen });
            });
        }
    })
}

Tuyen.update = (tuyen, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `UPDATE TUYEN_DUONG SET MA_SO_TUYEN = ${tuyen.id}, TEN_TUYEN = '${tuyen.name}', GIO_KH = convert(time,'${tuyen.startTime}',24), THOI_GIAN_VC = ${tuyen.lengthTime} WHERE MA_SO_TUYEN = ${tuyen.id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                    // not found tuyen
                    result({ kind: "not_found" }, null);
                    return;
                }
                
                result(null, res);
            });
        }
    })
};

Tuyen.delete = (id, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `DELETE FROM TUYEN_DUONG WHERE MA_SO_TUYEN = ${id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                // not found Account with id
                result({ kind: "not_found" }, null);
                return;
                }
        
                result(null, res);
            });
        }
    })
};

Tuyen.getAll = (title, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = "SELECT * FROM TUYEN_DUONG";
            console.log("QUERY: "+query)
            request.query(query,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                console.log("Tuyen: ", res);
                result(null, res);
            });
        }
    })
};


module.exports = Tuyen;