import React from 'react';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { withStyles } from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Chart from '../dashboard/Chart'
import PropTypes from 'prop-types';
import {APINAME} from '../config'
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
    borderRadius:9,
    height:25,
    width:'100%',
    autoWidth:true,
    color:"#B3B3B3",
    fontSize:'11px',
    [theme.breakpoints.only('xs')]:{
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
* Es la base para las gráficas tiene un select y hace petición
*/



class ChartCall extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      fecha:'1',
      data:[],
      status:'',
      show:false,
      select:true,
      controlChart:false,
    };
}
abortController = new AbortController();
componentDidMount() {
  const signal =this.abortController.signal;
  const apiName = APINAME;
  const path = this.props.url;
  const myInit = {
     Authorization : 'token',
     queryStringParameters:{
       date:this.state.fecha,
       id:this.props.id,
     }
  };

     API.get(apiName, path, myInit,signal)
    .then(response =>{
    //  console.log(response.message)
      if(response.message.length === 0 || Object.keys(response.message).length === 0)
      {
        this.setState({status:response.status,show:true,select:false, controlChart:false})
      }
      else{
          this.setState({data:response.message,status:response.status,show:true,select:false, controlChart:true,})
          }
    })
        .catch(error =>{
          /* Imprimero el error en caso de tener problemas*/
          //console.log(error)
              if(error){

              this.setState({status:0,show:true,select:true,controlChart:false})
            }
        })
}

componentDidUpdate(prevProps,prevState){
    const signal =this.abortController.signal;
    const myInit = {
       Authorization : 'token',
       queryStringParameters:{
         date:this.state.fecha,
         id:this.props.id,
       }
    };

  if(prevState.fecha !== this.state.fecha ){
     API.get(APINAME, this.props.url, myInit,signal)

    .then(response =>{
      if(response.message.length === 0 || Object.keys(response.message).length === 0)
      {
        this.setState({data:response.message,status:response.status,show:true,select:false,controlChart:false})

       }
       else{
         this.setState({data:response.message,status:response.status,show:true,select:false,controlChart:true})

       }



    })
        .catch(error =>{
          if(error){
            //  console.log(error)
          this.setState({status:0,show:true,select:false,controlChart:false})
        }
        })
      }

     }
componentWillUnmount(){
  this.abortController.abort()
  }




render(){

  const {classes, titulo , control} = this.props;
  const { fecha, select, show, controlChart } = this.state;

 const handleChange = name => event => {
   this.setState({
     [name]: event.target.value,
   });

 };
  return (
    <div className= {classes.root}>
      <Grid container spacing = {2} >
        <Grid item xs={7} style={{transform:'translateY(5%)'}} >
        {titulo === "Ventas totales" || titulo ==="Ingresos de" ?
          fecha === "1" ?
         <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {titulo + " hoy"}
        </Typography>
        :
        fecha === "2" ?
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {titulo + " de la semana"}
        </Typography>
        :
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {titulo + " del mes"}
        </Typography>
        :
        <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.title}>
          {titulo }
        </Typography>
      }
      </Grid>
      <Grid item xs={5} style={{textAlign:"right", transform:'translateY(5%)'}}>
        <FormControl margin='dense' variant="outlined" className={classes.formControl}>
          <Select
            className={classes.select}
             native
             value={fecha}
             onChange={handleChange('fecha')}
             inputProps={{
               name: 'fecha',
               id: 'fecha-native-label-placeholder',

             }}
               disabled={select}

           >
             <option value={1}>Hoy</option>
             <option value={2}>Esta semana</option>
             <option value={3}>Todo el mes</option>
           </Select>
         </FormControl>
      </Grid>
      </Grid>
      <Grid item lg={12}>
        {show ?
          control ?
          <Chart data={this.state.data} control={this.state.controlChart} show={this.state.show} height={this.props.height} status={this.state.status}  select={this.state.select} />
          :
          <Chart control={false} show={this.state.show} height={this.props.height} status={this.state.status}  select={true} />
          :
          <p>Cargando...</p>
        }

      </Grid>
    </div>

  );
}}

ChartCall.propTypes = {
  /*Titulo de la tarjeta*/
  titulo: PropTypes.string.isRequired,
  /*URL para pedir datos */
  url : PropTypes.string.isRequired,
  id : PropTypes.number,
};

export default withStyles(useStyles)(ChartCall);
