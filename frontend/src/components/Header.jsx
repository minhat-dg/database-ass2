import React from "react";

export default function Header() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">NHÀ XE BK</a>
                <div className="collapse navbar-collapse" id="navbarText">
                    <ul className="navbar-nav ms-3 me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active"
                                aria-current="page" href="/">Chuyến xe</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="tuyen">Tuyến</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="nhanvien">Nhân viên</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
