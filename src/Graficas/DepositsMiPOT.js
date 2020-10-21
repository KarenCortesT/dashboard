/* eslint-disable no-script-url */
import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import link from '../Img/sin_conexion.png';

const useStyles = theme =>({
  usoApp: {
    flex: 1,
    color:'#B3B3B3',
    fontWeight:500,
    fontSize:'18px',
    textAlign:'center',
    transform:'translateY(52%)',
    [theme.breakpoints.down('md')]:{
      fontSize:'9px'
    }
  },

  table:{
    width:'70%',
    cellspacing:0,
    cellpadding:0,
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
  cantidad:{
    transform:'translateX(-22%)'
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
* Muestra la tarjeta para MiPOT en la primera vista (Dashboard)
*/
class DepositsMiPOT extends React.Component {

  render(){

    const {classes, data, control, status } = this.props;

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
          /* Si no hay datos la variable control será falsa  */
         !control?

        <div>
          <div className="depositContext">
            <p>
              <span className={classes.usoApp}> Uso de app </span>
              <br/>
              <span className={classes.cantidad} >
                0
              </span>
            </p>
          </div>
          <div style={{margin:'auto', width:'70%'}}>
            <table className ={classes.tablaIngresos}  >
            <tbody>
              <tr >
                <th className={classes.th}>Compras</th>
                <th className={classes.th}>Errores</th>
              </tr>
              <tr >
                <td className={classes.datos}>$ {Number.parseFloat(0).toFixed(2)}</td>
                <td className={classes.datos}>${Number.parseFloat(0).toFixed(2)}</td>
              </tr>
              </tbody>
            </table>
          </div>
        </div>
        :
        <div>
          <div className="depositContext">
            <p>
              <span className={classes.usoApp}> Uso de app </span>
              <br/>
              <span className={classes.cantidad} >
                {data.app}
              </span>
            </p>
          </div>
          <div style={{margin:'auto', width:'70%'}}>
            <table className ={classes.tablaIngresos}  >
            <tbody>
              <tr >
                <th className={classes.th}>Compras</th>
                <th className={classes.th}>Errores</th>
              </tr>
              <tr >
              {/* Los errores hacen referencia a los errores de la app, porque si alguien no pudo hacer
                una compra por alguna razón  */}
                <td className={classes.datos}>$ {Number.parseFloat(data.payments).toFixed(2)}</td>
                <td className={classes.datos}>$ {Number.parseFloat(data.errors).toFixed(2)}</td>
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

//DepositsMiPOT.propTypes = {
  //  data: PropTypes.object.isRequired
//};


export default withStyles(useStyles)(DepositsMiPOT);
