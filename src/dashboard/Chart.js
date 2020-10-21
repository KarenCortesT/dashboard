import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import GraficoChart from '../Graficas/GraficoChart';
import GraficoChartSD from '../Graficas/GraficoChartSD';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme => ({
etiqueta:{
  fontSize:'14px',
  marginLeft:'9%',
  [theme.breakpoints.down('md')]:{
  fontSize:'12px'
  }

},
controlLabel:{
  marginRight:'3%',
  marginLeft:'2%',
  [theme.breakpoints.down('sm')]:{
  marginRight:'6%',
},
  [theme.breakpoints.down('xs')]:{
  marginRight:'9%',
  }
},
});

const PurpleSwitch = withStyles(theme =>({
  root: {
    width: 25,
    height: 14,
    padding: 0,
    display: 'flex',
  },
  switchBase: {
   padding: 1,

    '&$checked': {
      transform: 'translateX(10px)',
      color: theme.palette.common.white,
    },
    '&$checked + $track': {
        opacity: 1,
      backgroundColor: '#FFBB28',
    },
  },
  thumb: {
    width: 12,
    height: 12,
    boxShadow: 'none',
  },
  checked: {},
  track: {
    border: '1px solid  theme.palette.grey[500]',
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:'#B3B3B3',

  },
}))(Switch);
const AntSwitch = withStyles(theme => ({
  //Root: configuración de la figura
  root: {
    width: 24,
    height: 14,
    padding: 0,
    display: 'flex',
    [theme.breakpoints.down('md')]:{

    }
  },
  switchBase: {
    padding:1,

    '&$checked': {
      transform: 'translateX(10px)',
      color: theme.palette.common.white,
      '& + $track': {
        opacity: 1,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.main,
      },
    },
  },
  //tamaño del circulo interior
  thumb: {
    width: 12,
    height:12,
    boxShadow: 'none',

  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:"#B3B3B3",
  },
  checked: {},
}))(Switch);

/* Estructura de GraficoChart, es llamado desde Grafico.js */
class Chart extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      monedas:true,
      mipot:true,
      coin: "#FFBB28",
      pot:"#0088FE",
      dot1: true,
      dot2:true,
    };

  }

  componentDidMount(){
      /* Existen datos para mostrar */
    if(this.props.control){
      this.setState({ monedas:true, mipot:true,})
    }
  else{
    this.setState({monedas:false,mipot:false,coin:"#C1C1C1",pot:"#0088FE00",dot1:false,dot2:false})
  }
}


  render(){
    const {classes, data, control} = this.props;
    const { monedas, mipot} = this.state;
    const handleChange = name => event => {
       this.setState({[name]: event.target.checked });

       if (name === 'monedas') {
        if (this.state.monedas){
          this.setState(state =>({coin:"#FFBB2800"}));
           this.setState(state =>({dot1:false}));
        }
        else{
          this.setState(state=>({coin:"#FFBB28"}));
           this.setState(state =>({dot1:true}));
        }

      }
      else{
        if(this.state.mipot){
          this.setState(state =>({pot:"#0088FE00"}));
           this.setState(state =>({dot2:false}));
        }
        else{
          this.setState(state=>({pot:"#0088FE"}));
           this.setState(state =>({dot2:true}));
        }

      }

     };
     if(!this.props.show){
       return(
         <p>Cargando...</p>
       );
     }

else{
    return (
        /* Controla si Chart tiene o no tiene datos para vending machine y dashboard  */
        <div>
          {control ?
         <FormGroup row style={{padding:'0.2%'}}>
           <FormControlLabel className={classes.controlLabel}
             control={
               <PurpleSwitch
                 checked={monedas}
                 onChange={handleChange("monedas")}
                 value="monedas"
                 disabled={this.props.select}

               />
              }
             label={<p className={classes.etiqueta}>Monedas</p>}
           />
           <FormControlLabel
             control={
               <AntSwitch
               color="primary"
                 checked={mipot}
                 onChange={handleChange("mipot")}
                 value="mipot"
                disabled={this.props.select}

               />
             }
             label={<p className={classes.etiqueta}>MiPOT</p>}
           />
              </FormGroup>
           :
           <FormGroup row style={{padding:'0.2%'}}>
           <FormControlLabel className={classes.controlLabel}
             control={
               <PurpleSwitch
                 checked={control}
                 onChange={handleChange("monedas")}
                 value="monedas"
                 disabled={this.props.select}

               />
              }
             label={<p className={classes.etiqueta}>Monedas</p>}
           />
           <FormControlLabel
             control={
               <AntSwitch
               color="primary"
                 checked={control}
                 onChange={handleChange("mipot")}
                 value="mipot"
                disabled={this.props.select}

               />
             }
             label={<p className={classes.etiqueta}>MiPOT</p>}
           />
              </FormGroup>
         }


        {control ?
          <GraficoChart
            data={data}
            coin={this.state.coin}
            pot={this.state.pot}
            dot1={this.state.dot1}
            dot2={this.state.dot2}
            height={this.props.height}
          />
          :
          <GraficoChartSD status={this.props.status} view = {this.props.view}   height={this.props.height}/>
        }
        </div>
    );
  }
  }
}
Chart.propTypes = {
  classes: PropTypes.object.isRequired,
  show:PropTypes.bool,
  status:PropTypes.number,
//  data: PropTypes.array,
  height: PropTypes.number
};

export default withStyles(useStyles)(Chart);
