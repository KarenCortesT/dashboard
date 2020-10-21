/* eslint-disable no-script-url */
import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import link from '../Img/sin_conexion.png';

const useStyles = theme =>({

  span:{
    color:"#4184fa",
    fontWeight:"bold",
    fontSize:'28px',

  },
  spanSD:{
    color:"#C1C1C1",
    fontWeight:"bold",
    fontSize:'28px',

  },
  total:{
    color:"#1A1A1A",
    fontSize:'32px',
    [theme.breakpoints.down('md')]:{
      fontSize:'25px',
    },
  },
  th:{
    color:'#1A1A1A',
     fontWeight:900,
     fontSize:'15px',
     textAlign:'center',
     [theme.breakpoints.down('md')]:{
       fontSize:'13px',
     },
  },

  datos:{
    color:'#B3B3B3',
     fontWeight:500,
     fontSize:'16px',
      textAlign:'center',
      [theme.breakpoints.down('md')]:{
        fontSize:'14px',
      },
  },
  tablaIngresos:{
    width:'70%',
    margin:'auto',
    cellspacing:0,
    cellpadding:0,

  },
  link:{
    textAlign:'center',
    marginTop:'5%',
    [theme.breakpoints.down('md')]:{
      marginTop:'10%',
    }
  }


});
/*
  * Muestra la tarjeta de "Ingresos de hoy"
*/

class Deposits extends React.Component {

  render(){

    const {classes, data,status, control} = this.props;

    return (
      <React.Fragment >
      {status === 0 ?
          <div className={classes.link}>
            <img src={link} width='30%' alt="Sin conexión" />
            <p style={{color:"#C1C1C1", fontSize:'80%'}}>
              No es posible conectar con <br/>
              el servidor, inténtalo más tarde
            </p>
          </div>

        :
        /* Si no hay datos la variable de control será falsa   */
       !control   ?

      <div>
        <div className="depositContext">
          <p>
            <span className={classes.spanSD}> $ </span>
            <span className={classes.total}>{Number.parseFloat(0).toFixed(2)}</span>
            <span className={classes.spanSD}> mxn </span>
          </p>
        </div>
        <div style={{margin:'auto', width:'70%'}}>
          <table className ={classes.tablaIngresos}  >
          <tbody>
            <tr >
              <th className={classes.th}>Efectivo</th>
              <th className={classes.th}>MiPOT</th>
            </tr>
            <tr >
              <td className={classes.datos}>$ {Number.parseFloat(0).toFixed(2)}</td>
              <td className={classes.datos}>$ {Number.parseFloat(0).toFixed(2)}</td>
            </tr>
            </tbody>
          </table>
        </div>
        </div>
        :
        <div>
          <div className="depositContext">
            <p>
              <span className={classes.span}> $ </span>
              <span className={classes.total}>{data.total}</span>
              <span className={classes.span}> mxn </span>
            </p>
          </div>
          <div style={{margin:'auto', width:'70%'}}>
            <table className ={classes.tablaIngresos}  >
            <tbody>
              <tr >
                <th className={classes.th}>Efectivo</th>
                <th className={classes.th}>MiPOT</th>
              </tr>
              <tr >
                <td className={classes.datos}>$ {Number.parseFloat(data.cash).toFixed(2)}</td>
                <td className={classes.datos}>$ {Number.parseFloat(data.mipot).toFixed(2)}</td>
              </tr>
              </tbody>
            </table>
          </div>
       </div>
      }

      </React.Fragment>
    );
  }

}

/*Deposits.propTypes = {
  //data: PropTypes.string,
}; */


export default withStyles(useStyles)(Deposits);
