import React from "react"
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";



const data=[
  { id: 1, nombre: "Juan Alberto", apellido: "Alcantara", telefono:"5515123712", correo:"alberto.blue.19@gmail.com",edad:28,estado:"Nuevo" },
  { id: 2, nombre: "Eduardo", apellido: "Hernandez", telefono:"5515123712", correo:"alberto.blue.19@gmail.com",edad:28,estado:"No interesado" },
  { id: 3, nombre: "Cesar villaluz", apellido: "Naruto", telefono:"5515123712", correo:"alberto.blue.19@gmail.com",edad:28,estado:"Información equivocada" },
  
];

const url="http://127.0.0.1:5000"

class App extends React.Component {

  

  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      id: "",
      nombre: "",
      apellido: "",
      telefono: "",
      correo: "",
      edad: "",
    },
  };
  peticionPut=async (data)=>{
    console.log("El id que recibo es: ",data.id);
    await axios.put(url+'/update/'+data.id, this.state.form).then(response=>{
      console.log(response);
      this.peticionGet();
      this.setState({ modalActualizar: false})
    })
  }

  peticionPost=async()=>{
    delete this.state.form.id;
    console.log("Lo que recibo es: ",this.state.form)
   await axios.post(url+'/add',this.state.form).then(response=>{
     console.log("La respuesta al añadir un usuario es: ",response);
      this.setState({
        modalInsertar: false,
      });
      this.peticionGet();
     
    }).catch(error=>{
      this.setState({
        modalInsertar: false,
      });
      window.alert("Error con los datos ingresados");
      
      console.log(error.message);
    })
  }


  peticionDelete=(id)=>{
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+id);

    if(opcion){
      axios.delete(url+'/delete/'+id, this.state.form).then(response=>{
        console.log(response);
        this.peticionGet();
      })

    }
    
  }

  peticionGet=()=>{
    axios.get(url+'/users').then(response=>{
      console.log(response.data);
      this.setState({data: response.data.users});
    }).catch(error=>{
      console.log(error.message);
    })
    }

    componentDidMount() {
      this.peticionGet();
    }

  
  

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };



  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container>
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Telefono</th>
                <th>Correo</th>
                <th>Edad</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.apellido}</td>
                  <td>{dato.telefono}</td>
                  <td>{dato.correo}</td>
                  <td>{dato.edad}</td>
                  <td>{dato.estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.peticionDelete(dato.id)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar</h3></div>
          </ModalHeader>

          <ModalBody>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                required
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.nombre}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Apellido: 
              </label>
              <input
                required
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.apellido}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Telefono: 
              </label>
              <input
                required
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.telefono}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Correo: 
              </label>
              <input
                required
                className="form-control"
                name="correo"
                type="email"
                onChange={this.handleChange}
                value={this.state.form.correo}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Edad: 
              </label>
              <input
                required
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.edad}
              />
            </FormGroup>


            <FormGroup>

            <select  name="estado" onChange={this.handleChange} >
                  <option defaultValue={"Nuevo"} >Selecciona un estado</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="No interesado">No interesado</option>
                  <option value="Número equivocado">Número equivocado</option>
                  <option value="Información equivocada">Información equivocada</option>
                  <option value="Alto potencial">Alto potencial</option>
                  <option value="Bajo potencial">Bajo potencial</option>
           </select>


            </FormGroup>
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.peticionPut(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Insertar</h3></div>
          </ModalHeader>

          <ModalBody>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                required
                className="form-control"
                name="nombre"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                
                Apellido: 
              </label>
              <input
                required
                className="form-control"
                name="apellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                 
               Telefono: 
              </label>
              <input
                required
                className="form-control"
                name="telefono"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
               Correo: 
              </label>
              <input
                required
                className="form-control"
                name="correo"
                type="email"
                onChange={this.handleChange}
              />
            </FormGroup>


            <FormGroup>
              <label>
               Edad: 
              </label>
              <input
                required
                className="form-control"
                name="edad"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>

          

            <FormGroup>

            <select  name="estado" onChange={this.handleChange} >
                  <option defaultValue={"Nuevo"} >Selecciona un estado</option>
                  <option value="Nuevo">Nuevo</option>
                  <option value="No interesado">No interesado</option>
                  <option value="Número equivocado">Número equivocado</option>
                  <option value="Información equivocada">Información equivocada</option>
                  <option value="Alto potencial">Alto potencial</option>
                  <option value="Bajo potencial">Bajo potencial</option>
           </select>
      
      
            </FormGroup>




          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.peticionPost()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;
