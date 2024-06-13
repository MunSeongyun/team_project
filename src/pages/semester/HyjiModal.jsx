import React from 'react'
import { Button, Modal } from 'react-bootstrap'

const HyjiModal = ({ show, handleClose, title, bodyText, buttonText }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {bodyText}
      </Modal.Body>
      <Modal.Footer>
        {/* 취소 버튼 */}
        <Button variant="secondary" onClick={handleClose}>
          {buttonText}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default HyjiModal