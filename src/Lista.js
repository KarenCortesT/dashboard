import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles} from "@material-ui/core/styles";
import Paper from '@material-ui/core/Paper';
import link from './Img/sin_conexion.png';
import {APINAME} from './config'
import {API} from 'aws-amplify';
import PropTypes from 'prop-types';

const useStyles = theme => ({
  date:{
      whiteSpace: 'nowrap',
      width:'48px',
      height:'48px',
      borderRadius:11,
      background:"#F6F4FC",
      boxShadow:'none',
      color:'#B3B3B3',
      textAlign:'center',
    [theme.breakpoints.only('xs')]:{
      width:'40px',
      height:'40px',
      fontSize:'12px'
    }

  },
  /*cambia los valores de listItemText */
  listItemText:{
    fontSize:'20px',
    whiteSpace:'pre-wrap',

  },
eventos:{
  fontSize:'13px',
  color:"#1A1A1A",
  fontWeight:600,
  paddingLeft:'5%'

}
});

//Despliega la lista de eventos o conexiónes

class Lista extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      connection:'',
      show:false,
      status:'',
    };
}
abortController = new AbortController();
  componentDidMount() {
    const signal =this.abortController.signal;
    const apiName = APINAME;
    const path = this.props.path;
    const myInit = {
       Authorization : 'token',
    };

       API.get(apiName, path, myInit,signal)
      .then(response =>{


        this.setState({connection:response.message, status:response.status,show:true})
      })
          .catch(error =>{
            if(error){
            this.setState({status:0,show:true})
          }
          })
  }
  componentWillUnmount(){
    this.abortController.abort()
  }



  render(){

    const { classes} = this.props;
    const { connection, show,status } = this.state;
    if(show === false) {
        return <p style={{textAlign:'center'}} >Cargando..</p>
      }
    else{
      if(status === 0){
        return(
          <div style={{textAlign:'center', marginLeft:'15%',marginTop:'15%',}}>
            <img src={link} width='30%' alt="Sin conexión" />
            <p style={{color:"#C1C1C1", fontSize:'80%'}}>
              No es posible conectar con <br/>
              el servidor, inténtalo más tarde
            </p>
          </div>
        );
      }
    else{
    return(
      <List  selected={true}>
        {connection.map((connection,index) =>(
          <ListItem key={index} style={{marginTop:'-5%'}} >
            <ListItemIcon  >
              <Paper className={classes.date}><p style={{marginTop:'12%'}}>{connection.mes}<br/>{connection.dia}</p></Paper>
            </ListItemIcon>
          <ListItemText  classes={{primary:classes.listItemText}}
                          primary={
                            <p className={classes.eventos}>{connection.principal}<br/>
                              <span style={{color:"#B3B3B3",fontWeight:300}}>{connection.mensaje}</span>
                            </p>
                          }
           />
        </ListItem>
        ))}
      </List>

    );
     }
    }
  }
}
Lista.propTypes = {
  path: PropTypes.string,

};



export default withStyles(useStyles)(Lista);
