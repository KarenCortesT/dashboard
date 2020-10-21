import React from 'react'
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import empty_data from '../Img/empty_data.png'
import { LIST, APINAME } from '../config';
import {API} from 'aws-amplify';
import link from '../Img/sin_conexion.png';
import sinUsuario from '../Img/users.png';

import { withStyles } from "@material-ui/core/styles";


const useStyles = theme => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  root:{
    borderBottom:"none",

  },
  formControl: {
    marginRight: theme.spacing(1),

  },
select:{
  height:20,
  borderRadius:5,
  fontSize:'12px',
  color:"#B3B3B3",

},
link:{
  textAlign:'center',
  marginTop:'5%',
},
sinUsuario:{
  width:'60%',
}

});

/*
  * Muestra la Lista de usuarios de la segunda vista "USUARIOS MiPOT" contiene las peticiones
*/
class UserTable extends React.Component{


  constructor(props){
    super(props);
    this.state = {
      data:'',
      usuarios:0,
      dispositivos:0,
      tiempo:0,
      edad:0,
      show:false,
      select:false,
      control:false,
      peticion:true,
      status:'',
    };

  }


abortController = new AbortController();
  componentDidMount(){
    const signal =this.abortController.signal;
    const apiName = APINAME;
    const path = LIST;
    const myInit = {
       Authorization : 'token',
       queryStringParameters:{
         user:this.state.usuarios,
         age:this.state.edad,
         device:this.state.dispositivos,
         time:this.state.tiempo,
       }
    };

       API.get(apiName, path, myInit,signal)
      .then(response =>{
        if(response.message.length === 0 ||  Object.keys(response.message).length === 0)
        {
          this.setState({data:response.message,status:response.status,show:true,select:false,control:false,})
        }
        else{
            this.setState({data:response.message,status:response.status,show:true,select:false,control:true})

        }
      })
          .catch(error =>{
             /* Imprimero el error en caso de tener problemas*/
             //console.log(error)
             if(error){
             this.setState({status:0,show:true,select:true, control:false})
           }
          })

  }


  componentDidUpdate(prevProps,prevState){

    if(prevState.usuarios !== this.state.usuarios ||
        prevState.edad !== this.state.edad ||
        prevState.dispositivos !== this.state.dispositivos ||
        prevState.tiempo !== this.state.tiempo

    ){

    const signal =this.abortController.signal;
    const myInit = {
      Authorization : 'token',
      queryStringParameters:{
        user:this.state.usuarios,
        age:this.state.edad,
        device:this.state.dispositivos,
        time:this.state.tiempo,
      }
    };
       API.get(APINAME, this.props.url,myInit,signal)

      .then(response =>{
        if(response.message.length === 0 ||  Object.keys(response.message).length === 0)
        {

        this.setState({data:response.message, status:response.status,show:true,select:false,control:false, peticion:true})
      }
      else{
          this.setState({data:response.message, status:response.status,show:true,select:false,control:true})

      }
      })
          .catch(error =>{
            /* Imprimero el error en caso de tener problemas */
            //console.log(error)
            if(error){
            this.setState({status:0,show:true,select:true})
          }
        })
      //  this.setState({ status:1,show:true,select:false,control:false, peticion:false})
}
       }

   componentWillUnmount(){
     this.abortController.abort()
   }






  render(){

    const handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });

    };

    const {classes} = this.props;
    const {control, select, edad,usuarios, dispositivos,dias, status, peticion} =this.state;

    if(this.state.show === false) {
      return  <p>Cargando...</p>
    }
    else{
    return (
      <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={3}>
        <Typography component="h3" variant="h6"  gutterBottom className="tipografia">
          Lista de usuarios
        </Typography>
        </Grid>
        <Grid item xs={9}  style={{ textAlign:'right'}}>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <Select
            className={classes.select}
             native
             value={edad}
             onChange={handleChange('edad')}
             inputProps={{
               name: 'edad',
               id: 'age-native-label-placeholder',

             }}
                disabled ={select}
           >
             <option value={0}>Todas las edades</option>
             <option value={1}>18-25</option>
             <option value={2}>26-35</option>
             <option value={3}>36-45</option>
             <option value={4}>46-99</option>
           </Select>
         </FormControl>
         <FormControl margin='dense' variant="outlined" className={classes.formControl}>
           <Select
             className={classes.select}
              native
              value={usuarios}
              onChange={handleChange('usuarios')}
              inputProps={{
                name: 'usuarios',
                id: 'usuarios-native-label-placeholder',

              }}
                 disabled ={select}
            >
              <option value={0}>Todos los usuarios</option>
              <option value={1}>Masculino</option>
              <option value={2}>Femenino</option>
              <option value={3}>No binario</option>
            </Select>
          </FormControl>
          <FormControl margin='dense' variant="outlined" className={classes.formControl}>
            <Select
              className={classes.select}
               native
               value={dispositivos}
               onChange={handleChange('dispositivos')}
               inputProps={{
                 name: 'dispositivos',
                 id: 'dispositivos-native-label-placeholder',

               }}
                  disabled ={select}
             >
               <option value={0}>Todos los dispositivos</option>
               <option value={1}>Android</option>
               <option value={2}>iOs</option>
             </Select>
           </FormControl>
           <FormControl margin='dense' variant="outlined" className={classes.formControl}>
             <Select
               className={classes.select}
                native
                value={dias}
                onChange={handleChange('tiempo')}
                inputProps={{
                  name: 'tiempo',
                  id: 'tiempo-native-label-placeholder',

                }}
                   disabled ={select}
              >
                <option value={0}>Todo el día</option>
                <option value={1}>Madrugada</option>
                <option value={2}>Mañana</option>
                <option value={3}>Tarde</option>
                <option value={2}>Noche</option>
              </Select>
            </FormControl>
        </Grid>
        </Grid>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell style={{ color:"#B3B3B3",}}>ID Usuario</TableCell>
              <TableCell style={{ color:"#B3B3B3",}}>Género</TableCell>
              <TableCell style={{ color:"#B3B3B3",}}>Edad</TableCell>
              <TableCell style={{ color:"#B3B3B3",}}>Dispositivo</TableCell>
              <TableCell style={{ color:"#B3B3B3",}}>No.de transacciones</TableCell>
              <TableCell align="right" style={{  color:"#B3B3B3",}}>Monto total (MXN)</TableCell>
            </TableRow>
          </TableHead>
          {/* Hubo problemas con la conexión al servidor  */}
          {status === 0 ?
            <TableBody >
              <TableRow>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell style={{width:'25%'}}>
                  <div className={classes.link}>
                      <img src={link} width='50%' alt="Sin conexión" />
                      <p style={{color:"#C1C1C1", fontSize:'90%'}}>
                        No es posible conectar con <br/>
                        el servidor, inténtalo más tarde
                      </p>
                    </div>
                </TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
              </TableRow>
            </TableBody>

              :
              /* Hay datos para mostrar */
              control ?
          <TableBody >
            {this.state.data.map((row,index) => (
              <TableRow key={row.idUser} style={{ padding: '5px 20px', height: 25 }}>
                <TableCell className={classes.root}># {row.idUser}</TableCell>
                <TableCell className={classes.root}>{row.gender}</TableCell>
                <TableCell className={classes.root}>{row.age}</TableCell>
                <TableCell className={classes.root}>{row.device}</TableCell>
                <TableCell className={classes.root}># {row.transaction}</TableCell>
                <TableCell align="right" className={classes.root}>{'$'+Number(row.amount).toFixed(2)}</TableCell>
              </TableRow>
            ))}

          </TableBody>
          :
          /*  */

          !control && peticion ?
          <TableBody >
              <TableRow>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
                <TableCell style={{marginLeft:'0%',padding:'2% 0%',width:'10%'}}>
                  <div style={{textAlign:'center'}}>
                    <div>
                      <img src={sinUsuario} alt="Sin datos" className={classes.sinUsuario} />
                    </div>
                    <p style={{color:'#C1C1C1',fontSize:'12px',}}> No hay usuarios para <br/> mostrar en esta búsqueda</p>
                  </div>
                </TableCell>
                <TableCell ></TableCell>
                <TableCell ></TableCell>
              </TableRow>
          </TableBody>
          :
          /* No hay datos que mostrar */
          <TableBody >
            <TableRow>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
              <TableCell style={{marginLeft:'20%',padding:'3% 0%'}}>
                <div style={{textAlign:'center'}}>
                  <img src={empty_data} alt="Sin datos" width='40%' />
                    <p style={{color:'#C1C1C1',fontSize:'16px',}}> Sin datos</p>
                </div>
              </TableCell>
              <TableCell ></TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableBody>
        }
        </Table>

      </React.Fragment>
    );
  }

  }
}

UserTable.propTypes = {
  classes: PropTypes.object.isRequired,
  data:PropTypes.object,
};

export default withStyles(useStyles)(UserTable);
