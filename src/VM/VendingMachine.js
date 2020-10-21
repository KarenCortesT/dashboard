import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import ChartCall from './ChartCall'
import Pagination from './Pagination';
import Graficas from './Graficas';
import GraficaSD from './GraficaSD';
import Map from './Map';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";
import { TIME_LINE, ALL,APINAME} from '../config';
import {API} from 'aws-amplify';
import link from '../Img/sin_conexion.png';
import noActivas from '../Img/noActivas.png';

const mapURL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&key='+ process.env.REACT_APP_MAP_KEY;



const useStyles = theme => ({
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',
  },
  //
  button:{
      textAlign: 'left',
      border:'none',
      outline:'none',
      background:'white',
      width:'100%',


      "&:hover":{

       backgroundColor: "rgba(193, 193, 193, 0.3)",
       borderRadius:'25px',

      },

  },
  // contenedor de las vistas
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),


  },
  paper: {
    padding: theme.spacing(1),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
      borderRadius:9,
  },
  paperLocal: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height:'42px',
    width:'96%',
    background:'white',
    border:'1px solid #C1C1C1',
    borderRadius:7,
    fontSize:'14px',
    outline:'none',
    [theme.breakpoints.down('sm')]:{
      fontSize:'12px',
    },
    [theme.breakpoints.down('xs')]:{
      fontSize:'9px',
    },
    "&:focus":{
      background:'#4184fa',
      color:'white',

    },
    "&:hover":{
     backgroundColor: "rgba(193, 193, 193, 0.5)"
    },
  },

  //vendings activas
  fixedHeight: {
    width:'89%',
    height: 350,
    [theme.breakpoints.down('md')]:{
    width:'100%',
    }

  },

  //sucursal
  fixedHeight2: {
    height: 350,
    width:'111%',
    [theme.breakpoints.down('md')]:{
      width:'100%'
    }

  },
  fixedHeightLarge:{
    height:700,
    width:'89%',
  },


  sucursal:{
    marginLeft:'-5%',
    [theme.breakpoints.down('md')]:{
      marginLeft:'0%',
    }
  },


  fixedHeightChart:{
    height:245,
  },
  fixedHeightChartLarge:{
    height:335,
      width:'111%',
  },
  formControl: {
    marginTop: theme.spacing(0),
  },
  tituloVending:{
    fontWeight:900,
    marginLeft:'4%',
    fontSize:'18px',
    [theme.breakpoints.only('xs')]:{
      fontSize:'14px'
    }
  },
  select:{
    fontSize:'11px',
    [theme.breakpoints.only('xs')]:{
      fontSize:'9px',
    }

  },
  tableTotal:{
    width:'100%',
    color:'#1A1A1A',
    fontWeight:300,
    fontSize:'14px',
    [theme.breakpoints.down('md')]:{
      fontSize:'12px',
    }
  },
  link:{
    textAlign:'center',
    marginTop:'5%',
    [theme.breakpoints.down('md')]:{
      marginLeft:'5%'
    },
    [theme.breakpoints.only('sm')]:{
      marginLeft:'10%'
    },
    [theme.breakpoints.only('xs')]:{
      marginLeft:'0%'
    }
  }

});


class SelectZone extends React.Component{

render(){
  return(

    <FormControl margin='dense' variant="outlined" >
      <Select

         native
         value={this.props.zona}
         onChange={this.props.handleChange('zona')}
         inputProps={{
           name: 'zona',
           id: 'zona-native-label-placeholder',

         }}
         style={{height:'25px',
         borderRadius:7,
         width:'110%',
         autoWidth:true,

           color:"#B3B3B3",
       }}
       className={this.props.select}
       disabled ={this.props.selected}
       >
         <option value={1}>CDMX (Centro)</option>
         <option value={2}>CDMX (Norte)</option>
         <option value={3}>CDMX (Sur)</option>
         <option value={4}>CDMX (Oriente)</option>
         <option value={5}>Todas las zonas</option>
       </Select>
     </FormControl>
  );
}

}

class SearchBar extends React.Component{
  constructor(props){
    super(props);
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);

  }
  handleFilterTextChange(e){
    this.props.onFilterTextChange(e.target.value);
  }
  render(){
    return(
      <form>
        <input
          type="text"
          placeholder="Search"
          value={this.props.filterText}
          onChange={this.handleFilterTextChange}
          style={{background:"#F6F4FC",
                  borderRadius:8,
                  width:'110%',
                  height:'25px',
                   border:'none',
                  marginLeft:'10%',
                   marginTop:'2%',
                   outline:'none'

                }}

        />
      </form>
    );
  }
}




class VendingMachine extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      zona:1,
      ancho:12,
      place:false,
      value:0,
      filterText:'',
      page:0,
      rowsPerPage:8,
      local:[],
      select:false,
      index:'',
      vendings:[],
      show:false,
      selected:false,
      status:0,
      control: false,
    };
    this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
    this.setPage = this.setPage.bind(this);
    this.setRowsPerPage = this.setRowsPerPage.bind(this);

     }

    handleFilterTextChange(filterText) {
     this.setState({
       filterText: filterText
     });
   }

   handleChangePlace = (event, value ) => {
     this.setState({value});
   };
   handleView = (event, index) => {
    //  console.log("event",event)
     this.setState({local:event, select:true,index:index})


   }

   setPage(event){
     this.setState(state => ({page:event}));

   }

   setRowsPerPage(event){
     this.setState(state => ({rowsPerParge:event}));
   }


abortController = new AbortController();
  componentDidMount(){
    const signal =this.abortController.signal;
    const apiName = APINAME;
    const path = ALL;
    const myInit = {
       Authorization : 'token',
       queryStringParameters:{
         zone:this.state.zona
       }
    };

   API.get(apiName, path, myInit,signal)
  .then(response =>{

    if(response.message.length === 0 || Object.keys(response.message).length === 0 ){
          this.setState({vendings:response.message, status:response.status,
                         show:true,selected:true, control:false
                        })
      }
      else{

          this.setState({vendings:response.message, local:response.message[0].name,
                         index:response.message[0].id,status:response.status,
                         show:true,selected:false, control: true ,
                        })
          }


    })
      .catch(error =>{
        /* Imprimero el error en caso de tener problemas*/
        //console.log(error)
        if(error){

          this.setState({status:0,show:true,selected:true, control:false})
        }
      })
  }




  componentDidUpdate(prevProps,prevState){
    if(prevState.zona !== this.state.zona ){
        const signal =this.abortController.signal;
      const myInit = {
         Authorization : 'token',
         queryStringParameters:{
           zone:this.state.zona
         }
      };
      if(this.state.zona === '5'){
        this.setState({place:true, value:0})
      }
      else{
        this.setState({place:false})
      }
     API.get(APINAME, ALL, myInit,signal)
        .then(response =>{
            if(response.message.length === 0 || Object.keys(response.message).length === 0 ){
                this.setState({status:response.status, show:true, control:false,selected:false})
            }
           else{
             this.setState({vendings:response.message,
                            status:response.status,
                           show:true, control:true,selected:false
                           })
                }

            })
        .catch(error =>{
          if(error){
            this.setState({status:0,show:true, control:false,selected: false})
           }
        })
        //this.setState({status:1, show:true, control:false,selected:false})
    }
  }

  componentWillUnmount(){
    this.abortController.abort()
  }







  render(){

    const handleChangeRowsPerPage = event => {
      this.setRowsPerPage(+event.target.value);
      this.setPage(0);
    };

    const handleChange = name => event => {
      this.setState({
        [name]: event.target.value,
      });
    };
    const { classes } = this.props;
    const { vendings,place,control, status, selected, page, rowsPerPage, local,index, value} = this.state;
    //vendings activas
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    //sucursales
    const fixedHeightPaper2 = clsx(classes.paper, classes.fixedHeight2);
    //gráfica
    const fixedHeightPaperChart = clsx(classes.paper, classes.fixedHeightChart);
    const fixedHeightPaperLarge = clsx(classes.paper, classes.fixedHeightLarge);
    const fixedHeightPaperChartLarge = clsx(classes.paper, classes.fixedHeightChartLarge)
    const handleChangePage = (event, newPage) => {
            this.setPage(newPage)
          };
          /*
          * Muestra todas las ubicaciones de VM y realiza la búsqueda pedida
          */
    if(this.state.show === true){
      const rows = [];
      vendings.forEach((vending, index) =>{
        if(vending.name.indexOf(this.state.filterText) === -1){
          return;
        }
         if(vending.name === this.state.local ){
          rows.push(
                  <tr  key={vending.id} id={vending.id} onClick={() => this.handleView(vending.name,vending.id)} className={classes.button} style={{background:'#4184fa'}}  >
                    <td >#{vending.id}</td>
                    <td>{vending.name}</td>
                  </tr>
                );
        }
        else{
          rows.push(
                  <tr  key={vending.id} id={vending.id} onClick={() => this.handleView(vending.name,vending.id)} className={classes.button}   >
                    <td >#{vending.id}</td>
                    <td>{vending.name}</td>
                  </tr>
                );
          }

      });

    return (
      <div className={classes.root}>
        <main className={classes.content}>
            {/*Vista de las opciones 1-4 */}
          {!place ?
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={5} >

                {/* vendings activas */}
                <Grid item xs={12} md={8} lg={6}>
                   <Paper  className={fixedHeightPaper} >
                      <Grid container spacing = {1} >
                        <Grid item xs={7} sm={8} md={8} lg={8}>
                          <Typography component="h3" variant="h6" color="primary" gutterBottom className={classes.tituloVending}>
                            Vendings activas
                          </Typography>
                        </Grid>
                        <Grid item xs={4}sm={4} md={4} lg={4} style={{float:'right'}} >
                            {/*Selector */}
                         <SelectZone handleChange={handleChange} zona={this.state.zona} selected={this.state.selected} select={classes.select} />
                        </Grid >
                      </Grid>
                      <div style={{height:220,marginTop:'5%' }}>
                        <div className='container mt-5' style={{ width:'96%', textAlign:'right', margin:'auto', height:'100%', position:'relative'}}>
                          <div style={{position:'absolute',width:'100%'}}>
                            <Grid container spacing={2} style={{ textAlign:'center'}} >

                              {/* Muestra las VM por zona*/}
                              {/*--------Hubo error con la conexión al servidor-------------*/}
                              {
                                status === 0 ?
                                  <div className={classes.link}>
                                    <img src={link} width='25%' alt="Sin conexión" />
                                    <p style={{color:"#C1C1C1", fontSize:'80%'}}>
                                      No es posible conectar con <br/>
                                      el servidor, inténtalo más tarde
                                    </p>
                                  </div>
                                :
                                /*------no hay vendings activas -----*/
                                status === 1 && control === false ?
                                  <div className={classes.link}>
                                     <img src={noActivas} width='25%' alt="Vendigns no activas" />
                                     <p style={{color:"#C1C1C1", fontSize:'80%'}}>
                                       No hay ninguna Vending <br/>
                                       Machine activa
                                     </p>
                                  </div>
                              :
                             /*-----------------------------------------Vendings activas para mostrar------------------------------------------------------------------------*/
                            this.state.vendings.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((branch,index) => {
                               return (
                                 <Grid item xs={6} style={{marginBottom:'-0.4%',}} key={branch.id}>
                                     {
                                       this.state.local === branch.name ?
                                         <div key={branch.id} >
                                            <button index={branch} style={{background:'#4184fa', color:'white'}} className={classes.paperLocal}  onClick={() => this.handleView(branch.name,branch.id)}>{this.state.local}</button>
                                         </div>
                                       :
                                       <div key={branch} >
                                           <button index={branch} className={classes.paperLocal}  onClick={() => this.handleView(branch.name,branch.id)}>{branch.name}</button>
                                        </div>
                                      }
                                 </Grid>
                               );
                              })
                            }


                            </Grid>
                          </div>
                          <Pagination
                            handleChangeRowsPerPage={handleChangeRowsPerPage}
                            rowsPerPage={rowsPerPage}
                            length = {vendings.length}
                            page={page}
                            handleChangePage = {handleChangePage}
                          />
                        </div>
                      </div>
                  </Paper>
                </Grid>
                {/* Información en gráficas de la sucursal */}
                <Grid item xs={12} md={8} lg={6} className={classes.sucursal} >
                  <Paper className={fixedHeightPaper2}>
                    {/* Hubo un problema con el servidor y no se obtuvieron las vending activas o no hay vendingas activas */}
                     { !control  ?
                         <GraficaSD />
                      :

                        <Graficas branch={local} id={index} />
                     }
                  </Paper >
                </Grid>

                {/*Chart de la sucursal elegida  */}

                   <Grid item xs={12} >
                     <Paper className={fixedHeightPaperChart}>
                         <ChartCall titulo="Ventas totales" url={TIME_LINE} id={index} control={control} height={130}/>
                     </Paper>
                   </Grid>

              </Grid>
            </Container>
            :
            /*------------------------------------------------------------------------------------------------Vista de las opciones 5 -----------------------------------------------------------------------------------*/
            <Container maxWidth="lg" className={classes.container}>
              <Grid container spacing={5} >
                  {/* Ingresos totales */}
                  <Grid item xs={12} md={8} lg={6} style={{}}>
                     <Paper  className={fixedHeightPaperLarge} >
                        <Grid container spacing = {1} style={{marginTop:'0.5%'}}>
                        {/*Titulo  */}
                          <Grid item xs={8}>
                            <div style={{display:"flex", alignItems:"center"}}>
                              <SearchBar
                                filterText={this.state.filterText}
                                onFilterTextChange={this.handleFilterTextChange}
                                />
                              <SearchOutlinedIcon style={{fill:"#B3B3B3"}}/>
                            </div>
                          </Grid>
                          {/*----------------------------------------vending activas -----------------------------------------------------------------*/}
                          <Grid item xs={4} >
                            <SelectZone handleChange={handleChange} zona={this.state.zona} status={this.state.status}  select={classes.select}  />
                          </Grid>
                        </Grid>
                        <div style={{marginTop:'6%'}}>
                          <Tabs
                           value={this.state.value}
                           onChange={this.handleChangePlace}
                           textColor="secondary"
                           style={{width:'94%',
                                   borderRadius:9,
                                   minHeight:'15px',
                                   border:'1px solid #B3B3B3',
                                   margin:'auto',}}
                                   TabIndicatorProps={{
                                     style:{
                                       height:'100%',
                                        backgroundColor: "rgba(65,131, 250, 0.5)",
                                    }
                                  }}
                           >
                             <Tab label="Ver por zona" style={{ margin:'auto', width:'50%', fontSize:'9px',minHeight:'14px',}}/>
                             <Tab label="Ver por mapa" style={{margin:'auto',width:'50%', fontSize:'9px',minHeight:'14px',}}/>
                          </Tabs>
                         </div>
                        <div className='container mt-5' style={{ width:'90%', textAlign:'right', marginTop:'15px', height:'80%',display:'flex', margin:'auto',}}>
                          <Grid container spacing={2} style={{margin:'auto',transform:'translateY(3%)', height:'100%'}} >
                          {/*--------Muestra todas las vendings activas o el mapa dependiendo el valor de value --------  */}
                            {value === 0 ?
                                <table cellSpacing='10' cellPadding="10"  className={classes.tableTotal} >
                                  <thead >
                                    <tr style={{ padding: '5px 0px', height: 25,textAlign:'left', borderBottom:'1px solid #C1C1C1'}}>
                                       <th style={{color:"#B3B3B3"}}>ID Vending</th>
                                       <th style={{color:"#B3B3B3",}}>Nombre</th>
                                       <th style={{color:"#B3B3B3"}}>Zona</th>
                                    </tr>
                                  </thead>
                                  <tbody >{rows}</tbody>
                                </table>
                              :

                              <div  style={{marginTop:'10px'}}>
                                  <Map
                                    googleMapURL={mapURL}
                                    containerElement= {<div style={{height:'500px',width:'465px',transform:'translateY(2%)',}} />}
                                    mapElement={<div style={{height:'100%', width:'100%'}} />}
                                    loadingElement={<p>Cargando...</p>}
                                   />
                              </div>
                              }
                          </Grid>
                        </div>

                    </Paper>
                  </Grid>
                  {/* Pie */}
                  <Grid item xs={12} md={8} lg={6} className={classes.sucursal} >
                  <Paper className={fixedHeightPaper2}>
                    <Graficas branch={local} id={index} />
                  </Paper >
                  <Paper className={fixedHeightPaperChartLarge} style={{marginTop:'20px'}}>
                    <ChartCall titulo="Ventas totales" url={TIME_LINE} id={index} control={control} height={130}/>
                  </Paper>
                  </Grid>
              </Grid>
            </Container> }
        </main>
      </div>
    );
  }
    else{
      return (
        <div style={{textAlign:'center'}}>
          <p>Cargando...</p>
        </div>
      );
    }

  }
}

VendingMachine.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(useStyles)(VendingMachine);
