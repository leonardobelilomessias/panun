import Image from "next/image";
import { Button, Modal } from "react-bootstrap";

export function ModalDelete({show,handleClose,item, deleteHouse}){
    
    return(
<Modal style={{padding:24}} show={show} onHide={handleClose}>
<Modal.Header closeButton style={{padding:24}}>
  <Modal.Title>Deletar Imóvel</Modal.Title>
</Modal.Header>
<Modal.Body>
    <div style={{display:"flex"}}>
    <Image style={{marginRight:20}} width={100} height={80} src={item?.cover?item.cover:'/img/no-image/no_image.jpg'}/>
   <div>
        <span style={{fontWeight:'bold'}}>{item.title}</span>
        <p>{item.description}</p>
        id:{item.id}
   </div>
    </div>
    Tem Certeza que deseja apagar esse imovel cadastrado?
    </Modal.Body>
<Modal.Footer>
  <Button variant="secondary" onClick={handleClose}>
    Cancelar
  </Button>
  <Button variant="danger" onClick={deleteHouse}>
    Apagar
  </Button>
</Modal.Footer>
</Modal>
    )
}