import React from 'react';
import Grid from '@material-ui/core/Grid';
//import Map from './Map';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pie from '../Graficas/Pie';
import BarChartjsSD from '../Graficas/BarChartjsSD';
import BarChartHorizontalSD from '../Graficas/BarChartHorizontalSD';

const useStyles = theme => ({
  root:{
    flexGrow:1,
     marginLeft:theme.spacing(2),
     marginTop:theme.spacing(1),
  },
  formControl: {
    marginTop: theme.spacing(0),
    marginRight: theme.spacing(3),
  [theme.breakpoints.down('md')]:{
    marginRight:theme.spacing(0),
  }

  },
select:{
  borderRadius:8,
  height:25,
  width:'110%',
  autoWidth:true,
  color:"#B3B3B3",
  fontSize:'11px',
  [theme.breakpoints.only('xs')]:{
    fontSize:'9px',
  }


},
ingresos_t:{
  fontSize:'14px',
  fontWeight:500 ,
  color:'#B3B3B3',
   marginTop:theme.spacing(2),
   [theme.breakpoints.down('md')]:{
     fontSize:'12px'
   },
   [theme.breakpoints.down('xs')]:{
     fontSize:'10px',
        marginTop:theme.spacing(3),
   },
 },
 total:{
    marginTop:'-2%',
    fontWeight:900,
    fontSize:'30px',
    [theme.breakpoints.down('md')]:{
      fontSize:'24px'
    },
    [theme.breakpoints.down('md')]:{
      fontSize:'22px'
    },
 },
 horarios:{
   fontSize:'14px',
   fontWeight:500 ,
   color:'#B3B3B3',
    marginTop:'1.5%',
    [theme.breakpoints.down('md')]:{
      fontSize:'12px'
    },
    [theme.breakpoints.down('md')]:{
      fontSize:'10px'
    },
 },
 pie:{
    width:'95%',
    marginLeft:'0%',
    marginTop:theme.spacing(3),
    [theme.breakpoints.only('md')]:{

    },
    [theme.breakpoints.down('sm')]:{
      width:'95%',
    },
    [theme.breakpoints.only('xs')]:{

    },
 },
 bar:{
   marginLeft:'0%',
   width:'95%',
   marginTop:theme.spacing(-2),
   [theme.breakpoints.only('xs')]:{
     width:'125%',

 marginTop:theme.spacing(0),
   }
 },
 brand:{
   fontWeight:900,
   marginLeft:'2%',
   fontSize:'18px',
    transform:'translateY(-20%)',
   [theme.breakpoints.only('xs')]:{
     fontSize:'14px',
     transform:'translateY(20%)',
   }

 },
 BarChartJS:{
   width:'90%',
   transform:'translateX(7%)',
[theme.breakpoints.only('sm')]:{
  width:'70%'
},
[theme.breakpoints.only('xs')]:{

}
}
,

gridPie:{
  marginTop:'-3%',
  transform:'translateX(15%)',
  [theme.breakpoints.down('md')]:{
    transform:'translateX(10%)',
  },
  [theme.breakpoints.only('xs')]:{
    transform:'translate(2%)',
marginTop:'-15%',
  }
},
link:{
  textAlign:'center',
  marginTop:'5%',
  [theme.breakpoints.down('md')]:{
    marginTop:'10%'
  }
}

}
);

class GraficasSD extends React.Component {

  constructor(props){
    super(props);
    this.state = {


    };
  }


  render(){
      const { classes } = this.props;
          return(
            <div className={classes.root}>
            <Grid container spacing = {1} style={{width:'98%'}} >
              <Grid item xs={9} >
              <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.brand}>
                Sin datos
              </Typography>
            </Grid>
            <Grid item xs={3} >
              <FormControl margin='dense' variant="outlined" className={classes.formControl}>
                <Select
                  className={classes.select}
                   native
                   inputProps={{
                     name: 'date',
                     id: 'date-native-label-placeholder',

                   }}
                      disabled ={true}
                 >
                   <option value={1}>Hoy</option>
                 </Select>
               </FormControl>
            </Grid>
            </Grid>
          {/*Parte de gráficos  */}
                <Grid container spacing={2} style={{width:'98%'}} >
                  <Grid item xs={6} sm={4} md={3} lg={3} style={{paddingLeft:'3%'}}>
                    <Typography className={classes.ingresos_t}> Ingresos totales</Typography>

                    <Typography className={classes.total}>0</Typography>

                  <Typography className={classes.horarios}>
                  % de horarios
                  </Typography>
                    {/*Grafica de hora de compras horizontal */}
                    <div className={classes.BarChartJS}>
                      <BarChartjsSD height={75}/>
                    </div>


                  </Grid>

                  <Grid item xs={6} sm={7} md={8} lg={8} className={classes.gridPie}  >
                    <div className={classes.pie}>
                      <Pie data = {[]} status={1} xsp={12} xs={12} view={0} />
                    </div>
                      <div className={classes.bar}>
                        <BarChartHorizontalSD  />

                    </div>
                  </Grid>
                </Grid>
            </div>
          );
        }
}




export default withStyles(useStyles)(GraficasSD);
