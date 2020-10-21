import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Grafico from '../Grafico';
import { withStyles } from "@material-ui/core/styles";
import {PAYMENT,TIMELINE,MIPOT, INCOMES} from '../config.js';

const useStyles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    textAlign:'center',
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    textAlign:'center',
  },
  fixedHeight: {
    height:250 ,
    width:'100%',
    borderRadius:'20px',

  },
  fixedHeightChart:{
    height:370,
    borderRadius:'20px',
  },
  formControl:{
    width:"30%",
    marginLeft:"65%",
    display:"inline-block"
  }
});




function Resume (props){

    return(
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Paper className={props.fixedHeightPaper}>
          <Grafico titulo="Ingresos" url={INCOMES} vista="deposits"/>
        </Paper>
      </Grid>
    );
}

function Donut (props){
    return(
      <Grid item xs={12} sm={6} md={4} lg={4}>
      <Paper className={props.fixedHeightPaper}>
        <Grafico titulo="% Por método de pago" url={PAYMENT} vista="pie" view={1}/>
        </Paper>
      </Grid>
    );
}

function Purchase (props){
    return(
      <Grid item xs={12} sm={6} md={4} lg={4}>
        <Paper className={props.fixedHeightPaper}>
          <Grafico titulo="MiPOT VM" url={MIPOT} vista="mipot"/>
        </Paper>
      </Grid>
    );

}

function Charts (props){
    return(
      <Grid item xs={12} md={12} lg={12}>
      <Paper className={props.fixedHeightPaper}>
        <Grafico titulo="Ventas totales" url={TIMELINE} vista="chart" height={230} view={1}/>
      </Paper>
      </Grid>

    );
}

/*Contenedor de las vista de Dasboard, contiene las 4 gráficas que son llamadas
desde la clase Grafico */

class Dashboard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      rol:'A' ,
      resume:false,
      donut:false,
      purchase:false,
      chart: false,

    };
  }

componentDidMount(){
  if (this.state.rol === 'A'){
    return this.setState( { resume : true, donut:true, purchase: true, chart:true  } )
  //  {console.log('segundo estado' + this.state.resume)}
  }

}

  render(){
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    const fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);

    return (
      <div className={classes.root}>
      <main className={classes.content}>

        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={5} >
            {/* Ingresos totales */}

              {this.state.resume && <Resume fixedHeightPaper={fixedHeightPaper}/>}
            {/* Pie */}
              {this.state.donut && <Donut fixedHeightPaper={fixedHeightPaper} />}

            {/* Datos */}
              {this.state.purchase && <Purchase fixedHeightPaper={fixedHeightPaper}/> }

            {/* Chart */}
              {this.state.chart && <Charts fixedHeightPaper={fixedHeightPaperChart}/> }
            </Grid>
        </Container>
      </main>
      </div>
    );

  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(Dashboard);
