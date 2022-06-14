import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../assets/css/table.css'
import BootstrapTable from "react-bootstrap-table-next";
import { useState } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios';

export default function Employee() {
  

    const [datas, setData] = useState([]);
    const [emplDescription, setEmplDescription] = useState({ id: -1 })

    const handleShowAdd = () => { setEmplDescription(0) };

    React.useEffect(()=>{
        axios.get('http://localhost:8080/api/nhanvien/')
        .then(response=>{
          const data = response.data.recordset;
          console.log(data)
          setData(response.data.recordset);
        })
        .catch(error=>{
          console.log(error);
        })
      }, []) 



    const columns = [
        {
            dataField: "MA_NHAN_VIEN",
            text: "Mã nhân viên",
            sort: true,
        },
        {
            dataField: "HO_VA_TEN",
            text: "Họ và tên",
            sort: true,
        },
        {
            dataField: "GIOI_TINH",
            text: "Giới tính",
            sort: true,
            formatter: (value) => (
                <span>
                  {value==="M" ? "Nam" : "Nữ"}
                </span>
            )
        },
        {
            dataField: "NGAY_SINH",
            text: "Ngày sinh",
            sort: true,
            formatter: (value) => (
                <span>
                  {new Date(value).toLocaleDateString('vi-VN')}
                </span>
            )
        },
        {
            dataField: "SDT_NOI_BO",
            text: "Số điện thoại nội bộ",
            sort: true,
        },
    ];


    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            setEmplDescription(row)
        },
    };

    return (
        <div className="my-5 container">
            {emplDescription.id === -1 ? <p /> : <RoomDescription data={emplDescription} setEmplDescription={setEmplDescription} />}
            <div className=" text-center">
                <h2 class="mt-4 text-center">DANH SÁCH NHÂN VIÊN</h2>
                <BootstrapTable className="text-center"
                    keyField="id" data={datas}
                    columns={columns}
                    rowEvents={rowEvents}
                    pagination={paginationFactory({ sizePerPage: 10 })}
                />
            </div>
            <div class="d-flex flex-row-reverse">
                <button onClick={handleShowAdd} style={{
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "1rem",
                    fontWeight: "600",
                    border: "none",
                    borderRadius: "10px",
                    padding: "0.2rem",
                    width: "100px"
                }}>Thêm</button>
            </div>
        </div >
    );
}



function RoomDescription(props) {
    const { data, setEmplDescription } = props
    const initialFValues = {
        id:data.MA_NHAN_VIEN,
        name: data.HO_VA_TEN,
        sex: data.GIOI_TINH === undefined ? "" : ((data.GIOI_TINH === "M") ? "Nam" : "Nữ"),
        dob: data.NGAY_SINH === undefined ? "" : new Date(data.NGAY_SINH).toLocaleDateString('vi-VN'),
        phone: data.SDT_NOI_BO,
        homeNumber: data.SO_NHA,
        street: data.TEN_DUONG,
        province: data.TINH,
        inDay: data.NGAY_VAO_LAM === undefined ? "" : new Date(data.NGAY_VAO_LAM).toLocaleDateString('vi-VN'),
        salary: data.LUONG,
    }

    const [values, setValues] = useState(initialFValues);

    const handleInputChange = e => {
        console.log("EDIT")
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const addNhanvien = e =>{
        console.log("ADD");
        axios.post(`http://localhost:8080/api/nhanvien/`, {
            id: values.id,
            name: values.name,
            sex: (values.sex === "Nam") ? "M" : "F",
            dob: values.dob,
            phone: values.phone,
            homeNumber: values.homeNumber,
            street: values.street,
            province: values.province,
            inDay: values.inDay,
            salary: values.salary,
        })
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
          alert('Invalid input');
        })
      }

    const editNhanvien = e => {
        console.log("EDIT")
        axios.put(`http://localhost:8080/api/nhanvien/${values.id}`, {
            id: values.id,
            name: values.name,
            sex: (values.sex === "Nam") ? "M" : "F",
            dob: values.dob,
            phone: values.phone,
            homeNumber: values.homeNumber,
            street: values.street,
            province: values.province,
            inDay: values.inDay,
            salary: values.salary,
        })
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
          console.log(error);
          alert('Invalid input');
        })
    }

    const deleteNhanvien = e => {
        console.log("DELETE");
        axios.delete(`http://localhost:8080/api/nhanvien/${values.id}`)
        .then(response => {
          console.log(response);
          window.location.reload();
        })
        .catch(error => {
            console.log(error);
            alert('Deleting failed');
        })
    }

    return (
        <div className="popup-box">
            <Modal.Dialog className="popup-content">
                <Modal.Header closeButton onClick={() => setEmplDescription({id: -1})}>
                    <Modal.Title>{data.MA_NHAN_VIEN !== undefined ? "Thông tin nhân viên" : "Thêm nhân viên"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Mã nhân viên</Form.Label>
                            <Form.Control name='id' type="text" placeholder="Nhập mã nhân viên" defaultValue={initialFValues.id} onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Họ và tên" defaultValue={initialFValues.name} onChange={handleInputChange}/>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-3" controlId="sex">
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Control name='sex' type="text" placeholder="Nam / Nữ" defaultValue={initialFValues.sex} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="dob">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control name='dob' type="text" placeholder="dd/mm/yyyy" defaultValue={initialFValues.dob} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3 col-2" controlId="homeNumber">
                                <Form.Label>Số nhà</Form.Label>
                                <Form.Control name='homeNumber' type="text" placeholder="" defaultValue={initialFValues.homeNumber} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-6" controlId="street">
                                <Form.Label>Tên đường</Form.Label>
                                <Form.Control name='street' type="text" placeholder="" defaultValue={initialFValues.street} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-4" controlId="province">
                                <Form.Label>Tỉnh</Form.Label>
                                <Form.Control name='province' type="text" placeholder="" defaultValue={initialFValues.province} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                        <div className="row">
                            <Form.Group className="mb-3 col-3" controlId="inDay">
                                <Form.Label>Ngày vào làm</Form.Label>
                                <Form.Control name='inDay' type="text" placeholder="" defaultValue={initialFValues.inDay} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-4" controlId="formName">
                                <Form.Label>Lương</Form.Label>
                                <Form.Control name='salary' type="text" placeholder="" defaultValue={initialFValues.salary} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="formName">
                                <Form.Label>Số điện thoại nội bộ</Form.Label>
                                <Form.Control name='phone' type="text" placeholder="" defaultValue={initialFValues.phone} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                        {data.MA_NHAN_VIEN !== undefined && <Button className='delBtn' variant="secondary" onClick={deleteNhanvien}>
                            Xóa
                        </Button>}
                    <Button variant="primary" onClick={data.MA_NHAN_VIEN === undefined ? addNhanvien : editNhanvien}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

