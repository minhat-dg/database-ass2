import React from "react";
import { FaTwitter, FaFacebook, FaYoutube } from 'react-icons/fa';

export default function Footer() {
    return (
        <div className="container-fluid text-center bg-dark text-light p-5">
            <div className="row justify-content-center">
                <p>Copyright Group NoName</p>
                <p>Follow Us</p>
                <div className="col-1">
                    <h3><FaFacebook/></h3>
                </div>
                <div className="col-1">
                    <h3><FaYoutube/></h3>
                </div>
                <div className="col-1">
                    <h3><FaTwitter/></h3>
                </div>
            </div>
        </div>
    );
}