import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {ListGroup, ButtonGroup,Alert} from "react-bootstrap";
import './NuevaApuesta.css';

function NuevaApuesta({show, setShow , partidos,jornada ,index,setPartidos}) {

  const [resultados , setResultados] = useState([]);
  const handleClose = () => setShow(index);
  const [showAlert,setShowAlert] = useState(false);
  const [alertMessage,setAlertMessage] = useState("")
  
  const setApuesta=(i, value) =>{
    setResultados (resultados.map((resultado,j)=>{  return (i==j)? value: resultado}));
  }

  useEffect(()=>
    {
        if(show)
            {
                setResultados(Array.from({ length: partidos.length }, () => 0));
            }
    },[show,setShow]);

  const handleValidar=() =>{
    let aux_apuestas_no_realizadas=[];

    if (resultados.length===partidos?.length && ((aux_apuestas_no_realizadas=resultados.filter((resultado)=>{return resultado == 0 })).length===0))
        {
            let aux_partidos = partidos;
            partidos.map((partido,i)=>
                {
                  let apuesta=resultados[i];
                  aux_partidos[i].apuestas[apuesta] = aux_partidos[i].apuestas[apuesta]+1;
                });
            setPartidos(index,aux_partidos);
            setShow(index);

        } 
       else{
        setAlertMessage("Falta por insertar las apuestas " );
        setShowAlert(!showAlert);
        
       } 

  }

  return (
   
      <Modal
        show={show}
        onHide={handleClose}
      >
         
        <Modal.Header closeButton>
          <Modal.Title>Formulario Nueva Apuesta - {jornada}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <ListGroup>
            
        {resultados.map((resultado, resultadoIndex)=>( 
            <ListGroup.Item key={resultadoIndex}><h5>{partidos[resultadoIndex].local} -{partidos[resultadoIndex].visitante}  </h5>
            <ButtonGroup className="me-2" aria-label="First group">
                <Button key={"1"+resultadoIndex} className={resultado=="1"? "selecteButton":"defaultButton"} onClick={e=>setApuesta(resultadoIndex,"1")}>1</Button>
                <Button key={"X"+resultadoIndex}  className={resultado=="X"? "selecteButton":"defaultButton"} onClick={e=>setApuesta(resultadoIndex,"X")}>X</Button>
                <Button key={"2"+resultadoIndex}  className={resultado=="2"? "selecteButton":"defaultButton"} onClick={e=>setApuesta(resultadoIndex,"2")}>2</Button>
            </ButtonGroup>
            </ListGroup.Item>
            ))}
         </ListGroup>
        </Modal.Body>
        <Modal.Footer>
        <Alert  dismissible key="alert1" onClose={()=>setShowAlert(!showAlert)} variant="danger" show={showAlert}>
          {alertMessage}
        </Alert>    
        <Button variant="secondary" onClick={handleValidar}>
            Validar
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
     
      
            
  );
}

export default NuevaApuesta;