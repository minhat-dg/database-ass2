import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../assets/css/table.css'
import BootstrapTable from "react-bootstrap-table-next";
import { useState } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import {FormSelect} from "react-bootstrap";
import axios from 'axios';

export default function Chuyen() {
    

    const [datas, setData] = useState([]);
    const [emplDescription, setEmplDescription] = useState({ id: -1 })
    const [tuyen, setTuyen] = useState([])

    const handleShowAdd = () => { setEmplDescription(0) };
    
    React.useEffect(()=>{
        axios.get('http://localhost:8080/api/tuyen/')
        .then(response=>{
          console.log(response.data.recordset);
          setTuyen(response.data.recordset);
        })
        .catch(error=>{
          console.log(error);
        })
      }, []) 


    const columns = [
        {
            dataField: "id",
            text: "Mã số chuyến",
            sort: true,
        },
        {
            dataField: "vehicle",
            text: "Biển số xe",
            sort: true,
        },
        {
            dataField: "idTuyen",
            text: "Mã số tuyến",
            sort: true,
        },
        {
            dataField: "date",
            text: "Ngày đi",
            sort: true,
        },
        {
            dataField: "cost",
            text: "Chi phí",
            sort: true,
        },
    ];


    const rowEvents = {
        onClick: (e, row, rowIndex) => {
            console.log(row)
            setEmplDescription(row)
        },
    };


    return (
        <div className="container my-5">
            {emplDescription.id === -1 ? <p /> : <RoomDescription data={emplDescription} setEmplDescription={setEmplDescription} />}
            <h4>Tuyến:</h4>
            <div className="my-3 container">
                <FormSelect aria-label="Default select example">
                    <option>Chọn tuyến</option>
                    {tuyen.map(tuyen => {
                        return <option>{tuyen.TEN_TUYEN}</option>
                    })}
                </FormSelect>
            </div>
            <h4>Chuyến:</h4>
            <div className=" text-center">
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
        </div>
    )
}

function RoomDescription(props) {
    const { data, setEmplDescription } = props
    const initialFValues = {
        id:data.MA_SO_TUYEN,
        name: data.name,
        sex: data.sex,
        dob: data.dob,
        phone: data.phone,
    }

    const [values, setValues] = useState(initialFValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const addTuyen = e =>{
        axios.post(`http://localhost:8080/api/tuyen/`, {
          id: values.id,
          name: values.name,
          startTime: values.startTime,
          lengthTime: values.lengthTime
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

    return (
        <div className="popup-box">
            <Modal.Dialog className="popup-content">
                <Modal.Header closeButton onClick={() => setEmplDescription({id: -1})}>
                    <Modal.Title>Thêm tuyến</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Mã tuyến</Form.Label>
                            <Form.Control type="text" placeholder="Nhập mã tuyến" value={initialFValues.id} onChange={handleInputChange}/>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên tuyến</Form.Label>
                            <Form.Control type="text" placeholder="Tên tuyến" value={initialFValues.name} onChange={handleInputChange}/>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-5" controlId="startTime">
                                <Form.Label>Giờ khởi hành</Form.Label>
                                <Form.Control type="text" placeholder="hh:mm" value={initialFValues.sex} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="lengthTime">
                                <Form.Label>Thời gian</Form.Label>
                                <Form.Control type="text" placeholder="Thời gian di chuyển" value={initialFValues.dob} onChange={handleInputChange}/>
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


