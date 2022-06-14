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
            var query = `INSERT INTO NHAN_VIEN VALUES ('${nhanvien.id}','${nhanvien.name}','${nhanvien.sex}',convert(datetime,'${nhanvien.inDay}',105),convert(datetime,'${nhanvien.dob}',105),${nhanvien.salary},'${nhanvien.homeNumber}','${nhanvien.street}','${nhanvien.province}','${nhanvien.phone}')`;
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

module.exports = Nhanvien;