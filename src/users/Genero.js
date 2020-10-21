import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import BarChartjs from '../Graficas/BarChartjs';
import BarChartHorizontal from '../Graficas/BarChartHorizontal';
import BarChartjsSD from '../Graficas/BarChartjsSD';
import BarChartHorizontalSD from '../Graficas/BarChartHorizontalSD';
import PropTypes from 'prop-types';

import link from '../Img/sin_conexion.png';

const useStyles = theme =>({

  subtitulo:{
    fontSize:'14px',
    color:"#B3B3B3",
    marginTop:'7%',
    [theme.breakpoints.down('md')]:{
      fontSize:'12px',
    },
  },

  monedas:{
    color:"#1A1A1A",
    fontWeight:700,
    fontSize:'16px',
    [theme.breakpoints.down('md')]:{
      fontSize:'14px',
    }
  },

  link:{
    textAlign:'center',
    marginTop:'5%',
    [theme.breakpoints.down('md')]:{
      marginTop:'10%',
    }
  }



});

 class Genero extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/30763kr7/';


  render() {
    const { classes,data, status,control } = this.props;
  if(status === 0){
    /* Error de conexión con el servidor */
    return(
    <div className={classes.link}>
        <img src={link} width='30%' alt="Sin conexión" />
        <p style={{color:"#C1C1C1", fontSize:'80%'}}>
          No es posible conectar con <br/>
          el servidor, inténtalo más tarde
        </p>
    </div>
  );

  }
/* Si hay datos para mostrar la variable control será verdadera*/
  else if(control){
    return (
      <div >
        <Grid container spacing = {0} style={{marginLeft:'0.5%'}}>
          <Grid item xs={7} md={7} lg={7} style={{margin:"auto"}}>
            <Typography  component="p" className={classes.subtitulo}>
              Uso de MiPOT
            </Typography>
            <Typography  component="h1" style={{fontWeight:'bold', fontSize:'30px', marginTop:'-2%'}}>
              {data.use}
            </Typography>
            <BarChartHorizontal dispositivos={data.device} edades={data.age} />
          </Grid>
          <Grid item xs={5} sm={5} md={5} lg={5} style={{paddingRight:'10px'}} >
            <BarChartjs horario={data.time} height={70} status={status}   />
          </Grid>
        </Grid>
    </div >
  );
  }

  else{
    /* No hay datos para mostrar */
      return (
            <div >
              <Grid container spacing = {0} style={{marginLeft:'0.5%'}}>
                <Grid item xs={7} md={7} lg={7} style={{margin:"auto"}}>
                  <Typography  component="p" className={classes.subtitulo}>
                    Transacciones de MiPOT
                  </Typography>
                  <Typography  component="h1" style={{fontWeight:'bold', fontSize:'30px', marginTop:'-2%'}}>
                    0
                  </Typography>
                  <BarChartHorizontalSD />
                </Grid>
                {/*Grafica lado derecho  */}
              <Grid item xs={5} sm={5} md={5} lg={5} style={{paddingRight:'10px'}} >
                <BarChartjsSD  height={70}   />
              </Grid>
              </Grid>
            </div >

      );
    }}
  }

  Genero.propTypes = {
    status: PropTypes.number,
    control : PropTypes.bool,
    //data: PropTypes.array,
  };




export default withStyles(useStyles)(Genero);
