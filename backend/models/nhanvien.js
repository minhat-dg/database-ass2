var sql = require('mssql/msnodesqlv8');
var config = require('./db-config.js')

const Nhanvien = function(nhanvien) {
    this.id = nhanvien.id;
    this.name = nhanvien.name;
    this.sex = nhanvien.sex;
    this.inDay = nhanvien.inDay;
    this.dob = nhanvien.dob;
    this.salary = nhanvien.salary;
    this.homeNumber = nhanvien.homeNumber;
    this.street = nhanvien.street;
    this.province = nhanvien.province;
    this.phone = nhanvien.phone;
}

Nhanvien.create = (nhanvien, result) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();
            //var query = `INSERT INTO NHAN_VIEN VALUES ('${nhanvien.id}','${nhanvien.name}','${nhanvien.sex}',convert(datetime,'${nhanvien.inDay}',105),convert(datetime,'${nhanvien.dob}',105),${nhanvien.salary},'${nhanvien.homeNumber}','${nhanvien.street}','${nhanvien.province}','${nhanvien.phone}')`;
            var query = `EXEC THEM_NHAN_VIEN '${nhanvien.id}','${nhanvien.name}','${nhanvien.sex}','${nhanvien.inDay}','${nhanvien.dob}',${nhanvien.salary},'${nhanvien.homeNumber}','${nhanvien.street}','${nhanvien.province}','${nhanvien.phone}'`
            console.log(query);
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("errorrrr: ", err);
                    result(err, null);
                    return;
                }
                result(null, { id: res.insertId, ...nhanvien });
            });
        }
    })
}

Nhanvien.update = (nhanvien, result) => {

    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();
            //var query = `UPDATE NHAN_VIEN SET MA_NHAN_VIEN='${nhanvien.id}',HO_VA_TEN='${nhanvien.name}',GIOI_TINH='${nhanvien.sex}',NGAY_VAO_LAM=convert(datetime,'${nhanvien.inDay}',105),NGAY_SINH=convert(datetime,'${nhanvien.dob}',105),${nhanvien.salary},'${nhanvien.homeNumber}','${nhanvien.street}','${nhanvien.province}','${nhanvien.phone}')`;
            var query = `EXEC CAP_NHAT_NHAN_VIEN '${nhanvien.id}','${nhanvien.id}','${nhanvien.name}','${nhanvien.sex}','${nhanvien.inDay}','${nhanvien.dob}',${nhanvien.salary},'${nhanvien.homeNumber}','${nhanvien.street}','${nhanvien.province}','${nhanvien.phone}'`
            console.log(query);
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                    // not found nhanvien
                    result({ kind: "not_found" }, null);
                    return;
                }
                
                result(null, res);
            });
        }
    })
}

Nhanvien.delete = (id, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = `EXEC XOA_NHAN_VIEN ${id}`;
            console.log("QUERY: "+query)
            request.query(query,(err, res, fields) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                if (res.affectedRows == 0) {
                // not found Nhanvien with id
                result({ kind: "not_found" }, null);
                return;
                }
        
                result(null, res);
            });
        }
    })
};

Nhanvien.getAll = (title, result) => {
    sql.connect(config, function(err){
        if(err){
            console.log(err);
        } else {
            var request = new sql.Request();   
            var query = "SELECT * FROM NHAN_VIEN";
            console.log("QUERY: "+query)
            request.query(query,(err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                }
        
                console.log("Nhanvien: ", res);
                result(null, res);
            });
        }
    })
};

module.exports = Nhanvien;