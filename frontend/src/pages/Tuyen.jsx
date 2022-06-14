import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import '../assets/css/table.css'
import BootstrapTable from "react-bootstrap-table-next";
import { useState } from "react";
import paginationFactory from "react-bootstrap-table2-paginator";
import axios from 'axios';

export default function Tuyen() {
    const [datas, setData] = useState([]);
    const [emplDescription, setEmplDescription] = useState({ id: -1 })

    const handleShowAdd = () => { setEmplDescription(0) };
    React.useEffect(()=>{
        axios.get('http://localhost:8080/api/tuyen/')
        .then(response=>{
          console.log(response.data.recordset);
          setData(response.data.recordset);
        })
        .catch(error=>{
          console.log(error);
        })
      }, []) 


    const columns = [
        {
            dataField: "MA_SO_TUYEN",
            text: "Mã số tuyến",
            sort: true,
        },
        {
            dataField: "TEN_TUYEN",
            text: "Tên tuyến",
            sort: true,
        },
        {
            dataField: "GIO_KH",
            text: "Giờ khởi hành",
            sort: true,
            formatter: (value) => (
                <span>
                  {new Date(value).toLocaleTimeString('vi-VN')}
                </span>
            )
        },
        {
            dataField: "THOI_GIAN_VC",
            text: "Thời gian đi",
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
                <h2 class="mt-4 text-center">TUYẾN XE</h2>
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
        id:data.MA_SO_TUYEN,
        name: data.TEN_TUYEN,
        startTime: data.GIO_KH,
        lengthTime: data.THOI_GIAN_VC
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

    const addTuyen = e =>{
        console.log("ADD");
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

    const editTuyen = e => {
        console.log("EDIT")
        axios.put(`http://localhost:8080/api/tuyen/${values.id}`, {
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

    const deleteTuyen = e => {
        console.log("DELETE");
        axios.delete(`http://localhost:8080/api/tuyen/${values.id}`)
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
                    <Modal.Title>{data.MA_SO_TUYEN !== undefined ? "Thông tin tuyến" : "Thêm tuyến"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="id">
                            <Form.Label>Mã tuyến</Form.Label>
                            <Form.Control name='id' type="text" placeholder="Nhập mã tuyến" defaultValue={initialFValues.id} onChange={handleInputChange} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Tên tuyến</Form.Label>
                            <Form.Control name='name' type="text" placeholder="Tên tuyến" defaultValue={initialFValues.name} onChange={handleInputChange}/>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-5" controlId="startTime">
                                <Form.Label>Giờ khởi hành</Form.Label>
                                <Form.Control name='startTime' type="text" placeholder="hh:mm::ss" defaultValue={initialFValues.startTime} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="lengthTime">
                                <Form.Label>Thời gian</Form.Label>
                                <Form.Control name='lengthTime' type="text" placeholder="Thời gian di chuyển" defaultValue={initialFValues.lengthTime} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                        {data.MA_SO_TUYEN !== undefined && <Button className='delBtn' variant="secondary" onClick={deleteTuyen}>
                            Xóa
                        </Button>}
                    <Button variant="primary" onClick={data.MA_SO_TUYEN === undefined ? addTuyen : editTuyen}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}

