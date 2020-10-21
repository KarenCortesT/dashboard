import React from 'react';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { withStyles} from "@material-ui/core/styles";
import profile from "./Img/profile.png";
import exit from "./Img/exit.png";
import Lista from './Lista';
import PropTypes from 'prop-types';
import { CONNECTION } from './config';

const useStyles = theme => ({

perfil:{
  fontSize:'25px',
  fontWeight:500,
  color:'#B3B3B3',
  marginLeft:'6%',
  [theme.breakpoints.down('md')]:{
    fontSize:'23px',
  },
  [theme.breakpoints.only('xs')]:{
    fontSize:'20px'
  }
},
usuario:{
  marginLeft:'5%',
   fontSize:'17px',
   color:"#1A1A1A",
   fontWeight:700,
   [theme.breakpoints.down('md')]:{
     fontSize:'15px',
   },
   [theme.breakpoints.only('xs')]:{
     fontSize:'13px'
   }

},
circle:{
  width:'45px',
  height:'45px',
  fill:"#B3B3B3",
  [theme.breakpoints.down('md')]:{
    width:'40px',
    height:'40px',
  },
  [theme.breakpoints.only('xs')]:{
    width:'35px',
    height:'35px'
  }
},
exit:{
  fill:"#B3B3B3",
  width:'12%',
  [theme.breakpoints.down('sm')]:{
    width:'16%',
  },
  [theme.breakpoints.only('xs')]:{
    width:'18%'
  }
},
conexiones:{
  fontSize:'17px',
  fontWeight:700,
  color:"#1A1A1A",
   marginTop:'16%',
  [theme.breakpoints.only('xs')]:{
    fontSize:'15px',
  }
},
evento:{
  padding:'6%',
   width:'90%',
   marginTop:'8%',
},
Eventos:{
  marginTop:theme.spacing(8),
  marginLeft:theme.spacing(-6),
  [theme.breakpoints.only('xs')]:{
    marginTop:theme.spacing(6),
  }
},
perfiles:{
  marginLeft:theme.spacing(-7),

}
});

/*
* LLena el menú derecho de Eventos y perfil, manda a llamar a lista que es quien
pide los datos al servidor
*/
class MenuR extends React.Component{
  render(){
    const {classes, handleDrawer, handleOut, view, nombre} = this.props;
    return(
      <div>
      {view === 0 ?
        <div className={classes.evento}>
          <p style={{display:"flex",alignItems:"center"}}>
            <ChevronLeftIcon style={{fill:"#B3B3B3"}}  onClick={handleDrawer}/>
            <span className={classes.perfil}> Perfil</span>
              <span style={{ textAlign:"right",width:'90%'}}>
                <img src={exit} alt="salida" className={classes.exit} onClick={handleOut} />
              </span>
          </p>
          <div style={{paddingLeft:'11%'}}>
            <p style={{display:"flex", alignItems:"center", marginTop:'15%',}}><img src={profile} alt="perfil" className={classes.circle} />
            <span className={classes.usuario}>{nombre}<br/><span style={{color:"#B3B3B3",fontWeight:500}}>tipo</span></span></p>
            <p className={classes.conexiones}>Últimas conexiones</p>
          </div>
          <div className={classes.perfiles}>
            <Lista path={CONNECTION}/>
          </div>
        </div>

        :
        view === 2 ?
        /*Menu derecho abierto en la vista de VendingMachine  */
        <div className={classes.evento}>
        <ChevronLeftIcon style={{width:'30px'}} onClick={handleDrawer}/>
          <span className={classes.perfil}>Eventos</span>
          <div className={classes.Eventos}>
            <Lista path={CONNECTION}/>
          </div>
        </div>
        :
        null
      }
      </div>



    );
  }
}
MenuR.propTypes={
  handleDrawer:PropTypes.func,
  handleOut: PropTypes.func,
  view :PropTypes.number,
  nombre: PropTypes.string,
}

export default withStyles(useStyles)(MenuR);
