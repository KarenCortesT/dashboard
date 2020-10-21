import React, {Component} from 'react';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import {Link, styled} from '@material-ui/core';
import Dashboard from './dashboard/Dashboard'
import Users from './users/Users'
import VendingMachine from './VM/VendingMachine';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import { withStyles} from "@material-ui/core/styles";
import profile from "./Img/profile.png";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import icon from './Img/icon.png';
import logo from './Img/logo.png';
import dashboard_off from './Img/dashboard_off.png';
import dashboard from './Img/dashboard.png';
import usuario_off from './Img/usuarios_off.png';
import usuario from './Img/usuarios.png';
import vending_off from './Img/vending_off.png';
import vending from './Img/vending.png';
import chat from './Img/chat.png';
import Amplify from 'aws-amplify';
import awsconfig from './login/aws-exports';
import { Auth, Hub } from 'aws-amplify';
import {Redirect} from 'react-router';
import MenuR from './MenuR';
import swal from 'sweetalert';
Amplify.configure(awsconfig);

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.atomicthings.com/">
        AtomicThings
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function titulo (vista){
      if(vista === 0){
      return'Dashboard'
      }
      else if(vista === 1){
       return'Usuarios MiPOT'
      }
    /*  else if(vista === 2){
       return'MiPOT'
     } */
      else{
          return'Vending Machine'
      }
    }

const drawerWidth = 220; //tamaño del drawer derecho abierto

const StyledTab = styled(({ className, ...other }) => {
  return (
    <Tab
      {...other}
      classes={{
        root: className,
        wrapper:'wrapper',
      }}
    />
  );
})({
  "& .wrapper": {
    flexDirection: "row",
    fontSize:'17px',
    textTransform: 'capitalize',
    justifyContent:'left',
    wordWarp:'break-word',
    width:'80%',
  },

});

const useStyles = theme => ({

  avatar:{
    fill:"#B3B3B3",
    width:'40px',
    height:'30px',
     verticalAlign:'middle',
     paddingLeft:'8%',
     [theme.breakpoints.down('md')]:{
       width:'35px',
       height:'25px',
     }
  },

  appBarShift: {
    marginLeft: drawerWidth,
    boxShadow:0,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100%',
    overflow: 'auto',


  },

  drawerPaper: {

    width: 220,
      overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    [theme.breakpoints.only('xs')]:{
        width:150,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
    }),
  }
  },
  drawer: {
    width: 220,
    overflowX: 'hidden',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    [theme.breakpoints.only('xs')]:{
        width:150,
    }
  },

  drawerPaperRight: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    border:'0px',
    width: 400,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  [theme.breakpoints.down('md')]:{
    width:350,
  },
  [theme.breakpoints.down('sm')]:{
    width:250,
  },
  [theme.breakpoints.down('xs')]:{
    width:200,
  },
  },

  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(11)  , //tamaño del drawer cerrado
    [theme.breakpoints.down('md')]: {
      width: theme.spacing(9) ,
    },
  },
  drawerPaperCloseR: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  //AppBart
  container:{
    paddingTop:theme.spacing(2),
  },

  iconButton:{
    borderRadius:'2px',

  },

  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  root: {
    display: 'flex',
    backgroundColor:"#F6F4FC"
  },

  title: {
      paddingTop:theme.spacing(0),
      height:'5vh',
      fontSize:'17px',
      fontWeight:'bold',
      [theme.breakpoints.down('md')]:{
        fontSize:'15px',
      }
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
    border:'1px solid',

  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '28px 30px',
    ...theme.mixins.toolbar,
  },
  toolbarList:{
    alignItems: 'center',

    padding: '30px 28px',
    ...theme.mixins.toolbar,
  },


firstIcon: {
    width:'18px !important',
    marginRight:'20%',
    [theme.breakpoints.only('xs')]:{
      width:'14px'
    }
 },
 vM:{
   width:'18px !important',
   [theme.breakpoints.only('xs')]:{
     width:'18px',
   }
 },


iconLabelWrapper: {
  flexDirection: "row",
  fontSize:'17px',
  textTransform: 'capitalize',
  justifyContent:'left',
  wordWarp:'break-word',
  width:'80%',
  [theme.breakpoints.only('xs')]:{
    fontSize:'14px',
  }
},
flecha:{
  width:'80%',
  [theme.breakpoints.only('xs')]:{
    width:'70%'
  }
},
MiPOT:{
  width:'50%',
  [theme.breakpoints.only('xs')]:{
    width:'40%'
  }
},
chat:{
  float:'right',
  marginTop:'-1%',
  cursor:'help',

  [theme.breakpoints.down('md')]:{
    marginTop:'0%',
    marginLeft:'0%'
  },
  [theme.breakpoints.only ('sm')]:{
    marginTop:'-3%',
    marginLeft:'0%'
  },

}

});

function getWithExpiry(key){
  const itemStr = localStorage.getItem(key)

  if(!itemStr){
    return null
  }

  const item = JSON.parse(itemStr)
  const now = new Date()

  if(now.getTime() > item.expiry){
    localStorage.removeItem(key)
    return null
  }
  return item.value
}





class App extends Component  {


  constructor(props){
    super(props);
    this._isMounted =false;
    this.state = {
      open:false,
      openR:false,
      view:0,
      user:'',
      login:true,
      name:'',

    };

   this.handleOut = this.handleOut.bind(this);


  }

 componentDidMount(){
    this._isMounted = true;
    document.title = "Dashboard MiPOT " ;
   //Comprueba si hay conexión
   if (!navigator.onLine){
     swal("Sin conexión","Intenta más tarde","warning");
   }

   localStorage.setItem('open',true)
   if(this._isMounted){
    let updateUser = async authState =>{
      try {
        let user = await Auth.currentAuthenticatedUser()
        this.setState({user:user, name:user.attributes.name})
      //  console.log("user:" + JSON.stringify(this.state.user))
      }
      catch{
          this.setState({user:null})
    //      console.log("null:" + this.state.user)
      }
    }
    Hub.listen('auth', updateUser) // listen for login/signup events
  updateUser() // check manually the first time because we won't get a Hub event
  return () => Hub.remove('auth', updateUser) // cleanup
}
}

componentWillUnmount(){
  this._isMounted =false;
}

//Cierra la sesión
 async handleOut(){
   if(this._isMounted){
    try{
      await Auth.signOut();
      this.setState({login:false, user:null})

    }catch (error){
    //  console.log('error signing out:', error);
    }
  }
  }

//Cambia la vista
  handleChange = (event, view) => {
     this.setState({ view, openR:false });
   };

  render(){
  //  console.log(localStorage.getItem('open'))
    const { classes } = this.props;

    //Abre el menú izquierdo
    const handleDrawerOpen = () => {
      this.setState(state => ({open:true}));
    };
    const handleDrawerClose = () => {
      this.setState(state => ({open:false}));
    };
    //Abre y cierra el menu derecho
    const handleDrawer = () => {
      this.setState(state => ({openR:!this.state.openR}));
    };


 const { login, name,user } = this.state;
   //Indica que la sesion fue abierta
 const session = sessionStorage.getItem('on');
//Ayuda a saber la sesion se mantendra abierta
  const keep = getWithExpiry('keep');
//console.log("que pasa",session, keep,user)

  if( session === null && !keep){
      this.handleOut()
    }

 if(user != null){
   if(!login){

     return(
       <div>
           <Redirect from ="/dashboard" to="/login"/>
       </div>
     );
   } else{

      return (
        <div className={classes.root} style={{ height:'100vh'}}>
        <CssBaseline />
      {/*  //-------------------Menú derecho ------------------------------*/}
        {this.state.view === 0 || this.state.view === 2 ?
        <Drawer
           variant="persistent"
          anchor='right'
          classes={{
            paper: clsx(classes.drawerPaperRight, !this.state.openR && classes.drawerPaperCloseR),
          }}
          open={this.state.openR}
        >
        {/*Menu derecho abierto en la vista de dashboard  */}
            <MenuR handleDrawer={handleDrawer} handleOut = {this.handleOut} view={this.state.view} nombre={name} />


        </Drawer>
        :
        null
      }

    {/*-------------------Menú izquierdo ------------------------------*/}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
             [classes.drawerPaper]: this.state.open,
             [classes.drawerPaperClose]: !this.state.open,
           })}
           classes={{
             paper: clsx({
               [classes.drawerPaper]: this.state.open,
               [classes.drawerPaperClose]: !this.state.open,
             }),
           }}
        >
        <div className={classes.toolbarIcon}>
          {this.state.open ?
            <IconButton className={classes.iconButton} onClick={handleDrawerClose}>
              <img src={logo} alt="MiPOT" className={classes.MiPOT} style={{position:'relative',}} />
            </IconButton> :
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={classes.iconButton}

            >
            {/* Flecha */}
            <img src={icon} alt="MiPOT" className={classes.flecha} />
          </IconButton>
        }

        </div>

        <Divider />

            <Tabs
              value={this.state.view}
               onChange={this.handleChange}
               indicatorColor="primary"
               textColor="primary"
               orientation='vertical'>

                  <StyledTab
                     icon={
                             this.state.view === 0 ?
                             <img src={dashboard} alt="Dashboard" className={classes.firstIcon}/> :
                             <img src={dashboard_off} alt="Dashboard" className={classes.firstIcon}/>
                           }

                     label = {this.state.open ? "Dashboard" : null}
                       >
                  </StyledTab>

                  <StyledTab
                     icon={this.state.view === 1 ?
                       <img src={usuario} alt="Usuarios" className={classes.firstIcon}/> :
                       <img src={usuario_off} alt="Usuarios" className={classes.firstIcon}/>
                      }

                      label ={this.state.open ? "Usuarios" : null}
                    >
                    </StyledTab>

                     <StyledTab
                      icon={this.state.view === 2 ?
                         <img src={vending} alt="VendingMachine" className={classes.vM}/> :
                         <img src={vending_off} alt="VendingMachine" className={classes.vM}/>
                        }

                       label ={this.state.open ? <span style={{marginRight:'5%',}}> Vending Machine</span> : null}
                       >
                     </StyledTab>

            </Tabs>


        </Drawer>



        <main className={classes.content}>
        <Container maxWidth="lg" className={classes.container} >
        <p  style={{color:"#4184fa",verticalAlign:'middle'}}   className={classes.title}>

          {titulo(this.state.view)}

          {this.state.view === 0 ?
          <span style={{float:'right', color:'black', marginTop:'-0.5%', }}>
            <span style={{}}>Hola,{name}</span>
            <img src={profile} alt="Perfil" className={classes.avatar} onClick={handleDrawer}/>
          </span> : this.state.view === 2 ?
          <span onClick={handleDrawer} style={{float:'right', color:'#4184fa'}}>
          Eventos
          </span> : null
         }

        </p>

        </Container>
        <div className={classes.title}>
          {this.state.view === 0 ? <Dashboard/> : null}
          {this.state.view === 1 ? <Users/> : null}
          {/*this.state.view === 2 ? <MiPOT/> : null*/}
          {this.state.view === 2 ? <VendingMachine/> : null}
          <div  className={classes.chat} >
          <a href="mailto:soporte@atomicthings.com?subject=Soporte Dashboard&body=¿En qué podemos ayudarte?%0D">
            <img src={chat} alt="Chat" width='40%'  />
          </a>
          </div>
          <Copyright  />
       </div>
        </main>
        </div>

      );
    }//cierre de else
  } else{
    return(
      <div>
          <Redirect from ="/dashboard" to="/login"/>
      </div>
    );
  }
}
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(useStyles)(App);
