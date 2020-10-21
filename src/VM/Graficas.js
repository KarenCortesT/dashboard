import React from 'react';
import Grid from '@material-ui/core/Grid';
//import Map from './Map';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Pie from '../Graficas/Pie';
import BarChartjs from '../Graficas/BarChartjs';
import BarChartHorizontal from '../Graficas/BarChartHorizontal';
import GraficaSD from './GraficaSD';
import { BRANCH,APINAME} from '../config';
import {API} from 'aws-amplify';
import link from '../Img/sin_conexion.png';

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

class Graficas extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      ingresos:[],
      dispositivos:[],
      edades:[],
      horario:[],
      fecha:'1',
      income:'',
      donut:[],
      show:false,
      status:'',
      control:false,

    };
  }

abortController = new AbortController();
  componentDidMount(){
    const signal =this.abortController.signal;
    const apiName = APINAME;
    const path = BRANCH;
    const myInit = {
      Authorization : 'token',
      queryStringParameters:{
        date:this.state.fecha,
        id:this.props.id,
      }
    };


    API.get(apiName, path, myInit, signal)
   .then(response =>{
      if(response.message.length === 0 || Object.keys(response.message).length === 0 ){
        this.setState({control:false,
                       status:response.status,
                       show:true,
                       select:true,
                      })
      }
      else{
       this.setState({edades:response.message[0].age,
                      dispositivos:response.message[0].device,
                      horario:response.message[0].time,
                      status:response.status,
                      donut:response.message[0].donut,
                      income:response.message[0].income,
                      show:true,
                      select:false,
                      control:true,
                     })
      }

    })
       .catch(error =>{
         if(error){
         this.setState({status:0,show:true, control:false, select:true})
       }
       })
  }

  componentDidUpdate(prevProps,prevState){
    if(prevState.fecha !== this.state.fecha){
    const signal =this.abortController.signal;
    const apiName = APINAME;
    const path = BRANCH;
    const myInit = {
      Authorization : 'token',
      queryStringParameters:{
        date:this.state.fecha,
        id:this.props.id,
      }
    };


    API.get(apiName, path, myInit, signal)
   .then(response =>{
      if(response.message.length === 0 || Object.keys(response.message).length === 0 ){
        this.setState({control:false,
                       status:response.status,
                       show:true,
                       select:false,
                      })
      }
      else{
       this.setState({edades:response.message[0].age,
                      dispositivos:response.message[0].device,
                      horario:response.message[0].time,
                      status:response.status,
                      donut:response.message[0].donut,
                      income:response.message[0].income,
                      show:true,
                      select:false,
                      control:true,
                     })
      }

    })
       .catch(error =>{
         if(error){
         this.setState({status:0,show:true, control:false, select:false})
       }
       })
     }
  }

  componentWillUnmount(){
    this.abortController.abort()
  }



  render(){
      const { classes } = this.props;
      const { status, fecha, control,edades, dispositivos,donut , horario, income, show} = this.state;
      const handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
      };
      if(!show){
        return  <p>Cargando...</p>
      }
      else{
        /* ----hubo un error con la conexión al servidor ----- */
        if(status === 0){
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
                     value={fecha}
                     onChange={handleChange('fecha')}
                     inputProps={{
                       name: 'fecha',
                       id: 'fecha-native-label-placeholder',

                     }}
                        disabled ={true}
                   >
                     <option value={1}>Hoy</option>

                   </Select>
                 </FormControl>
              </Grid>
              </Grid>

             <div className={classes.link}>
                <img src={link} width='25%' alt="Sin conexión" />
                <p style={{color:"#C1C1C1", fontSize:'80%'}}>
                  No es posible conectar con <br/>
                  el servido, inténtalo más tarde
                </p>
              </div>
            </div>
            );
        }
        else{
        if(control){
            return (

              <div className={classes.root}>
              <Grid container spacing = {1} style={{width:'98%'}} >
                <Grid item xs={9} >
                <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.brand}>
                  {this.props.branch}
                </Typography>
                </Grid>
              <Grid item xs={3} >
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
                        disabled ={this.props.select}
                   >
                     <option value={1}>Hoy</option>
                     <option value={2}>Esta semana</option>
                     <option value={3}>Todo el mes</option>
                   </Select>
                 </FormControl>
              </Grid>
              </Grid>
              {/*Parte de gráficos  */}
              <Grid container spacing={2} style={{width:'98%'}} >
                <Grid item xs={6} sm={4} md={3} lg={3} style={{paddingLeft:'3%'}}>
                  <Typography className={classes.ingresos_t}>
                    Ingresos totales
                  </Typography>
                  <Typography className={classes.total}>
                    ${Number.parseFloat(income).toFixed(2)}
                  </Typography>
                  <Typography className={classes.horarios}>
                    % de horarios
                  </Typography>
                  {/*Grafica de hora de compras horizontal */}
                  <div className={classes.BarChartJS}>
                    <BarChartjs horario={horario} status={status} height={75}/>
                  </div>
                </Grid>

                <Grid item xs={6} sm={7} md={8} lg={8} className={classes.gridPie}  >
                  <div className={classes.pie}>
                    <Pie data = {donut} status={status} control={control} xsp={12} xs={12} view={0} />
                  </div>
                  <div className={classes.bar}>
                    <BarChartHorizontal status={status} dispositivos={dispositivos} edades={edades} />
                  </div>
                </Grid>
              </Grid>
            </div>
            );
             }
        else{
       return <GraficaSD />
        }
      }
   }
 }}




export default withStyles(useStyles)(Graficas);
