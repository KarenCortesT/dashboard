import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Deposits from './Graficas/Deposits';
import Pie from './Graficas/Pie';
import DepositsMiPOT from './Graficas/DepositsMiPOT';
import Genero from './users/Genero';
import Chart from './dashboard/Chart'
import PropTypes from 'prop-types';
import {APINAME} from './config'
import {API} from 'aws-amplify';

const useStyles = theme => ({
  root:{
    flexGrow:1,
  },
  formControl: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(3),

  },
select:{
  borderRadius:8,
  fontSize:'11px',
  width:'110%',
  autoWidth:true,
  height:25,
  color:"#B3B3B3",
  [theme.breakpoints.down('md')]:{
    fontSize:'9px',
  }

},
title:{
  fontWeight:900,
  fontSize:'17px',
  textAlign:'left',
  marginLeft:'2%',
  [theme.breakpoints.down('md')]:{
    fontSize:'14px',
  }
}

});



/*
* Es la base para las gráficas, tiene el select, y hace las peticiones
*/



class Grafico extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fecha:'1',
      data:[],
      status:'',
      show:false,
      select:true,
      control:false,
    };
}


abortController = new AbortController();
componentDidMount() {
  const apiName = APINAME;
  const signal =this.abortController.signal;
  let path = this.props.url;
  const myInit = {
     Authorization : 'token',
     queryStringParameters:{
       date:this.state.fecha
     }
  };

     API.get(apiName, path, myInit,signal)
    .then(response =>{
          if(response.message.length === 0 ||  Object.keys(response.message).length === 0)
          {
            this.setState({data:response.message,status:response.status,show:true,select:false,control:false})
          }
          else{
              this.setState({data:response.message,status:response.status,show:true,select:false,control:true})

          }

    })
        .catch(error =>{
          /*
          * Imprimero el error en caso de tener problemas
          */
          //console.log(error)

              if(error){
              this.setState({status:0,show:true,select:true, control:false})
            }
        })

}

componentDidUpdate(prevProps,prevState){

  if(prevState.fecha !== this.state.fecha ){
    const signal =this.abortController.signal;
     API.get(APINAME, this.props.url, {
       Authorization : 'token',
       queryStringParameters:{
         date:this.state.fecha
       }},signal)

    .then(response =>{
      if(response.message.length === 0 ||  Object.keys(response.message).length === 0)
      {
          this.setState({data:response.message, status:response.status,select:false,show:true, control:false,})
      }
      else{
          this.setState({data:response.message, status:response.status,select:false,show:true, control:true,})
      }


    })
        .catch(error =>{
          /* Imprimero el error en caso de tener problemas*/
          //console.log(error)
          if(error ){
          this.setState({status:0,show:true,select:true,control:false})
        }
        })
      }

     }
  componentWillUnmount(){
    this.abortController.abort()
  }


showGraph (vista){

 if(vista === 'deposits'){
  return  <Deposits data = {this.state.data} status={this.state.status} control={this.state.control} />
 }
 else if (vista==='pie'){
  return <Pie data = {this.state.data} status={this.state.status} view={this.props.view} xsp={7} xs={5} control={this.state.control}/>
 }
 else if (vista === 'mipot'){
   return <DepositsMiPOT data={this.state.data} status={this.state.status} control={this.state.control}  />
 }
   else if (vista === 'chart'){
     return <Chart data={this.state.data} show={this.state.show} select={this.state.select} height={this.props.height} status={this.state.status} view={this.props.view} control={this.state.control} />
   }
 else {
   return <Genero data={this.state.data} status={this.state.status } control={this.state.control}/ >

 }

}





render(){

  const {classes } = this.props;
 const handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });

 };


  return (
    <div className= {classes.root}>
      <Grid container spacing = {2} >
        <Grid item xs={7} style={{transform:'translateY(5%)'}} >
        {this.props.titulo === "Ventas totales" || this.props.titulo === "Ingresos" ?
          this.state.fecha === "1" ?
         <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {this.props.titulo + " de hoy"}
        </Typography>
        :
        this.state.fecha === "2" ?
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {this.props.titulo + " de la semana"}
        </Typography>
        :
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {this.props.titulo + " del mes"}
        </Typography>
        :
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {this.props.titulo }
        </Typography>
      }
      </Grid>
      <Grid item xs={5} style={{textAlign:"right", transform:'translateY(5%)'}}>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <Select
            className={classes.select}
             native
             value={this.state.fecha}
             onChange={handleChange('fecha')}
             inputProps={{
               name: 'fecha',
               id: 'fecha-native-label-placeholder',

             }}
               disabled={this.state.select}

           >
             <option value={1}>Hoy</option>
             <option value={2}>Esta semana</option>
             <option value={3}>Todo el mes</option>
           </Select>
         </FormControl>
      </Grid>
      </Grid>
      <Grid item lg={12}>

        {this.state.show ?
          this.showGraph(this.props.vista):
          <p>Cargando...</p>
        }

      </Grid>
    </div>

  );
}}

Grafico.propTypes = {
  /*Titulo de la tarjeta*/
  titulo: PropTypes.string.isRequired,
  /*URL para pedir datos */
  url : PropTypes.string.isRequired,
  /* Que gráfica utilizara */
  vista:PropTypes.string.isRequired,
};

export default withStyles(useStyles)(Grafico);
