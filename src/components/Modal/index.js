import React from 'react'
import { Modal, Button } from "react-bootstrap";

import "./style.scss"

export default ({ show, handleClose, handleChoice }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Избери група</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="primary" onClick={() => handleChoice("bpleven")}>
                    Биология - МУ Плевен
          </Button>
                <Button variant="primary" onClick={() => handleChoice("hpleven")}>
                    Химия - МУ Плевен
          </Button>
                <Button variant="success" onClick={() => handleChoice("bplovdiv")}>
                    Биология - МУ Пловдив
          </Button>
                <Button variant="success" onClick={() => handleChoice("hplovdiv")}>
                    Химия - МУ Пловдив
          </Button>
            </Modal.Footer>
        </Modal>
    )
}
