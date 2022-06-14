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
    const [selectedTuyen, setSelectedTuyen] = useState('0')

    const handleShowAdd = () => { setEmplDescription(0) };
    
    React.useEffect(()=>{
        console.log("USE EFFECT CALLED")
        axios.get('http://localhost:8080/api/tuyen/')
        .then(response=>{
          console.log(response.data.recordset);
          setTuyen(response.data.recordset);
        })
        .catch(error=>{
          console.log(error);
        })
        
        var api = 'http://localhost:8080/api/chuyen/';
        if(selectedTuyen !== '0'){
            api = api + selectedTuyen;
        }
        console.log(api)
        axios.get(api)
        .then(response=>{
          console.log(response.data.recordset);
          setData(response.data.recordset);
        })
        .catch(error=>{
          console.log(error);
        })
      }, [selectedTuyen]) 



    const columns = [
        {
            dataField: "MA_SO_CHUYEN",
            text: "Mã số chuyến",
            sort: true,
        },
        {
            dataField: "PHUONG_TIEN",
            text: "Biển số xe",
            sort: true,
        },
        {
            dataField: "MA_SO_TUYEN",
            text: "Mã số tuyến",
            sort: true,
        },
        {
            dataField: "NGAY_DI",
            text: "Ngày đi",
            sort: true,
            formatter: (value) => (
                <span>
                  {new Date(value).toLocaleDateString('vi-VN')}
                </span>
            )
        },
        {
            dataField: "KINH_PHI",
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

    const handleSelect = e => {
        setSelectedTuyen(e.target.value)
    }


    return (
        <div className="container my-5">
            {emplDescription.id === -1 ? <p /> : <RoomDescription data={emplDescription} setEmplDescription={setEmplDescription} />}
            <h4>Tuyến:</h4>
            <div className="my-3 container">
                <FormSelect aria-label="Default select example" value={selectedTuyen} onChange={handleSelect}>
                    <option value={0}>Chọn tuyến</option>
                    {tuyen.map(tuyen => {
                        return <option value={tuyen.MA_SO_TUYEN}>{tuyen.TEN_TUYEN}</option>
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
        id:data.MA_SO_CHUYEN,
        carNum: data.PHUONG_TIEN,
        tuyenId: data.MA_SO_TUYEN,
        date: new Date(data.NGAY_DI).toLocaleDateString('vi-VN'),
        cost: data.KINH_PHI
    }

    const [values, setValues] = useState(initialFValues);

    const handleInputChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const addChuyen = e =>{
        axios.post(`http://localhost:8080/api/chuyen/`, {
            id: values.id,
            carNum: values.carNum,
            tuyenId: values.tuyenId,
            date: values.date,
            cost: values.cost
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

      const editChuyen = e => {
        console.log("EDIT")
        axios.put(`http://localhost:8080/api/chuyen/${values.id}`, {
            id: values.id,
            carNum: values.carNum,
            tuyenId: values.tuyenId,
            date: values.date,
            cost: values.cost
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

    const deleteChuyen = e => {
        console.log("DELETE");
        axios.delete(`http://localhost:8080/api/chuyen/${values.id}`)
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
                    <Modal.Title>{data.MA_SO_CHUYEN !== undefined ? "Thông tin chuyến" : "Thêm chuyến"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                    <div className="row">
                            <Form.Group className="mb-3 col-5" controlId="id">
                                <Form.Label>Mã chuyến</Form.Label>
                                <Form.Control name='id' type="text" placeholder="" defaultValue={initialFValues.id} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="tuyenId">
                                <Form.Label>Mã tuyến</Form.Label>
                                <Form.Control name='tuyenId' type="text" placeholder="" defaultValue={initialFValues.tuyenId} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                        <Form.Group className="mb-3 col-10" controlId="carNum">
                            <Form.Label>Phương tiện</Form.Label>
                            <Form.Control name="carNum" type="text" placeholder="" defaultValue={initialFValues.carNum} onChange={handleInputChange}/>
                        </Form.Group>
                        <div className="row">
                            <Form.Group className="mb-3 col-5" controlId="date">
                                <Form.Label>Ngày đi</Form.Label>
                                <Form.Control name="date" type="text" placeholder="" defaultValue={initialFValues.date} onChange={handleInputChange}/>
                            </Form.Group>
                            <Form.Group className="mb-3 col-5" controlId="cost">
                                <Form.Label>Kinh phí</Form.Label>
                                <Form.Control name="cost" type="text" placeholder="" defaultValue={initialFValues.cost} onChange={handleInputChange}/>
                            </Form.Group>
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                {data.MA_SO_CHUYEN !== undefined && <Button className='delBtn' variant="secondary" onClick={deleteChuyen}>
                            Xóa
                        </Button>}
                    <Button variant="primary" onClick={data.MA_SO_CHUYEN === undefined ? addChuyen : editChuyen}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal.Dialog>
        </div>
    );
}


