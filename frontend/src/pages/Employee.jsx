import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../assets/css/table.css'
import BootstrapTable from "react-bootstrap-table-next";
import { useState } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";

export default function Employee() {
    const dt = [
        {
            id: 1,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 2,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 3,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 4,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 5,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 6,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 7,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 8,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 9,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 10,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
        {
            id: 11,
            name: "Lê Minh Nhật",
            sex: "Nam",
            dob: "04/07/2001",
            phone: "01010101010"
        },
    ]

    const [datas, setData] = useState(dt);
    const [emplDescription, setEmplDescription] = useState({ id: -1 })

    const handleShowAdd = () => { setEmplDescription(0) };


    const columns = [
        {
            dataField: "id",
            text: "Mã nhân viên",
            sort: true,
        },
        {
            dataField: "name",
            text: "Họ và tên",
            sort: true,
        },
        {
            dataField: "sex",
            text: "Giới tính",
            sort: true,
        },
        {
            dataField: "dob",
            text: "Ngày sinh",
            sort: true,
        },
        {
            dataField: "phone",
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
        id:data.id,
        name: data.name,
        sex: data.sex,
        dob: data.dob,
        phone: data.phone,
    }
    return (
        <div className="popup-box">
            <Modal.Dialog className="popup-content">
                <Modal.Header closeButton onClick={() => setEmplDescription({id: -1})}>
                    <Modal.Title>Thêm nhân viên</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formMaNV">
                            <Form.Label>Mã nhân viên</Form.Label>
                            <Form.Control type="text" placeholder="Nhập mã nhân viên" value={initialFValues.id}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Họ tên</Form.Label>
                            <Form.Control type="text" placeholder="Họ và tên" value={initialFValues.name}/>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-3" controlId="formName">
                                <Form.Label>Giới tính</Form.Label>
                                <Form.Control type="text" placeholder="Nam / Nữ" value={initialFValues.sex}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="formName">
                                <Form.Label>Ngày sinh</Form.Label>
                                <Form.Control type="text" placeholder="dd/mm/yyyy" value={initialFValues.dob}/>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3" controlId="formName">
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-3" controlId="formName">
                                <Form.Label>Ngày vào làm</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-4" controlId="formName">
                                <Form.Label>Lương</Form.Label>
                                <Form.Control type="text" placeholder="" />
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="formName">
                                <Form.Label>Số điện thoại nội bộ</Form.Label>
                                <Form.Control type="text" placeholder="" value={initialFValues.phone}/>
                            </Form.Group>
                        </div>

                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setEmplDescription({id: -1})}>
                        Hủy
                    </Button>
                    <Button variant="primary" onClick={() => setEmplDescription({id: -1})}>
                        Thêm
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

