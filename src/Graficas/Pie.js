import React, { Component } from 'react';
import {
  PieChart, Pie, Cell, Label, ResponsiveContainer
} from 'recharts';
import Grid from '@material-ui/core/Grid';
import { withStyles } from "@material-ui/core/styles";
import link from '../Img/sin_conexion.png';


const useStyles = theme =>({

  amount:{
    color:"#1A1A1A",
    fontSize:'28px',
    [theme.breakpoints.down('md')]:{
      fontSize:'25px',
    },
  },


  datos:{
    color:'#B3B3B3',
     fontWeight:500,
     fontSize:'14px',
      textAlign:'center',
    transform:'translateX(0%)',
      [theme.breakpoints.down('md')]:{
        fontSize:'12px',
      },
      [theme.breakpoints.down('xs')]:{
        fontSize:'10px',


      },
  },

  monedas:{
    color:"#1A1A1A",
    fontWeight:700,
    fontSize:'14px',
    [theme.breakpoints.down('md')]:{
      fontSize:'12px',
    },
    [theme.breakpoints.down('md')]:{
      fontSize:'10px',
    },
  },

  gridPie:{
    height:'170px',
    margin:'auto',

    [theme.breakpoints.down('xs')]:{
      height:'130px',

    },
  },

  link:{
    textAlign:'center',
    marginTop:'5%',
    [theme.breakpoints.down('md')]:{
      marginTop:'10%',
    }
  }


});

const COLORS = ['#FFBB28', '#4184fa']; //amarillo

const COLORSME = ['#C1C1C1','#C1C1C1'];

function createData(name, value){
  return{name, value};
}


const cero =[
  {name: "coins", value: 1},
  {name:"mipot", value:0},
];

 class GraficaPie extends Component {

  constructor(props){
    super(props);
    this.state = {
      data:'',
      coins:0,
      mipot:0,
      total:0,
    };

  }



  Porcentaje(data){

  let arrayData = [];
  let coins, mipot;
  let total =0;
  for(var i=0; i < data.length;i++){
    arrayData = arrayData.concat(createData(data[i].name,data[i].value))
    total = total + data[i].value
  }
  coins = ((data[0].value)*100)/total
  mipot = ((data[1].value)*100)/total
  this.setState({
    data:arrayData,
    coins:coins,
    mipot:mipot,
    total:total,
  });
}

componentDidMount(){
  if(!this.props.control){
      this.Porcentaje(cero)
    }
    else{
    this.Porcentaje(this.props.data);
  }


}


  render() {
    const { classes, control,status, view } = this.props;
    const {total,coins, mipot } =this.state;
    /* Condicional para saber si estamos en la vista de dashboard    */
    if(status === 0 && view === 1){
      return ( <div className={classes.link}>
          <img src={link} width='30%' alt="Sin conexión" />
          <p style={{color:"#C1C1C1", fontSize:'80%'}}>
            No es posible conectar con <br/>
            el servidor, inténtalo más tarde
          </p>
        </div>
      );
    }
    else{
      /* Si la variable control es falsa, significa que no hay datos */
    if(!control)
    {
      return (
        <Grid
          spacing={1} style={{}}  container
          justify="center"
          alignItems="center"
        >
          <Grid container item xs={this.props.xsp} sm={6} md={6} lg={6}alignItems="center"  className={classes.gridPie}>
              <ResponsiveContainer >
                <PieChart width={this.props.width} height={this.props.height}  onMouseEnter={this.onPieEnter} >
                  <Pie
                    data={cero}
                    cx={this.props.width / 2}
                    cy={this.props.height /2 }
                    innerRadius='90%'
                    outerRadius='100%'

                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >

                  <Label value="Transacciones " position="centerBottom" className='label-bottom'   style={{ fill: 'rgba(158, 158,158, 0.87)' }}   />


                  <Label value={0} position="centerTop"  className='label-top' />

                  {
                      cero.map((entry, index) => <Cell key={`cell-${index}`}
                       fill={COLORSME[index % COLORSME.length]} />)

                  }

                  </Pie>

                </PieChart>
              </ResponsiveContainer>

            </Grid>

            <Grid item xs={this.props.xs} sm={5} md={6} lg={6} style={{}}  >
                <table   style={{ width:'90%',textAlign:'right'}}>
                  <tbody >
                      <tr >
                        <td ><span className="dot" style={{backgroundColor:"#C1C1C1"}}></span></td>
                        <td className={classes.datos}>Efectivo</td>
                        <td  className={classes.monedas}>{Number.parseFloat(0).toFixed(2)}%</td>
                      </tr>
                      <tr>
                        <td ><span className="dot" style={{backgroundColor:"#C1C1C1"}}></span></td>
                        <td className={classes.datos}>MiPOT VM</td>
                        <td className={classes.monedas}>{Number.parseFloat(0).toFixed(2)}%</td>
                      </tr>
                  </tbody>
                </table>

            </Grid>
        </Grid>
    );
  }
  else{
    /* Si hay datos para mostrar */
    return (
      <Grid
        spacing={1} style={{}}  container
        justify="center"
        alignItems="center"
      >
        <Grid container item xs={this.props.xsp} sm={6} md={6} lg={6}alignItems="center"  className={classes.gridPie}>
            <ResponsiveContainer >
              <PieChart width={this.props.width} height={this.props.height}  onMouseEnter={this.onPieEnter} >
                <Pie
                  data={this.props.data}
                  cx={this.props.width / 2}
                  cy={this.props.height /2 }
                  innerRadius='90%'
                  outerRadius='100%'

                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  <Label value="Transacciones" position="centerBottom" className='label-bottom'   style={{ fill: 'rgba(158, 158,158, 0.87)' }}   />
                  <Label value={total} position="centerTop"  className='label-top' />

                {
                    this.props.data.map((entry, index) => <Cell key={`cell-${index}`}
                     fill={COLORS[index % COLORS.length]} />)

                }

                </Pie>

              </PieChart>
            </ResponsiveContainer>

          </Grid>

          <Grid item xs={this.props.xs} sm={5} md={6} lg={6} style={{}}  >

              <table   style={{ width:'90%',textAlign:'right'}}>
                <tbody >
              <tr>
                <td ><span className="dot" style={{backgroundColor:"#FFBB28"}}></span></td>
                <td className={classes.datos}>Efectivo</td>
                <td  className={classes.monedas}>{Number.parseFloat(coins).toFixed(2)}%</td>
              </tr>
              <tr>
                <td><span className="dot" style={{backgroundColor: '#4184fa'}}></span></td>
                <td className={classes.datos}>MiPOT VM</td>
                <td className={classes.monedas}>{Number.parseFloat(mipot).toFixed(2)}%</td>
              </tr>
              </tbody>
            </table>

          </Grid>
      </Grid>


    );
  }
}}}

export default withStyles(useStyles)(GraficaPie);
