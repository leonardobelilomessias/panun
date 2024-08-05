import Image from "next/image";
import { Button, Modal } from "react-bootstrap";

export function ModalSelectImage({show,handleClose,messageModal}){
    
    return(
<Modal style={{padding:24}} show={show} onHide={handleClose}>
<Modal.Header closeButton style={{padding:24}}>
  <Modal.Title>Deletar Imóvel</Modal.Title>
</Modal.Header>
<Modal.Body>

    {messageModal}
    </Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Cancelar
  </Button>
  <Button variant="primary" onClick={handleClose}>
    OK
  </Button>
</Modal.Footer>
</Modal>
    )
}