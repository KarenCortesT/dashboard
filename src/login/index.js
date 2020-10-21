import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { withStyles } from "@material-ui/core/styles";
import imagen from './Img/bg.png';
import logo from './Img/logo.png';
import mit from './Img/mit_logo.png';
import {Redirect} from 'react-router';
import aws_exports from './aws-exports';
import { Auth, Hub } from 'aws-amplify';
import Container from '@material-ui/core/Container';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import swal from 'sweetalert';
import aprobado from "./Img/approved.png";
import Amplify from 'aws-amplify';
Amplify.configure(aws_exports);

const useStyles = theme => ({
  root: {
     height: '100vh',
    [theme.breakpoints.only('md')]:{
      height:'100vh',
      width:'100vh',
    }
   },
   //Imagen de fondo-nubes
   image: {

     width:'auto',
     height:'auto',
     backgroundColor:'white',
     backgroundImage:'url('+imagen+')',
     backgroundRepeat: 'no-repeat',
     backgroundSize: '93% 95%',
     backgroundPosition: '70px 0px',



   },
   paper: {
     margin: theme.spacing(8, 4),
     display: 'flex',
     flexDirection: 'column',

   },
   //Imagen MiPOT
   avatar: {
     //arriba izquierda abajo derecha
     margin: theme.spacing(6,0,12,0),
     maxWidth:'100%',
     width:'40%',
     [theme.breakpoints.down('md')]:{
      width:'25%',
      margin: theme.spacing(0,0,12,0),
    },
    [theme.breakpoints.down('xs')]:{
     margin: theme.spacing(8,0,8,0),
    }


   },
   //Obtencion de datos
   form: {
     width: '100%', // Fix IE 11 issue.
     marginTop: theme.spacing(1),
     marginLeft:theme.spacing(0),

   },

   //Inicio de sesión
   loggin:{
     margin:theme.spacing(2,3,0,0),
     fontSize:'23px',
     fontWeight:'bold',
     [theme.breakpoints.down('md')]:{
       margin:theme.spacing(0,0,0,0),
     },
    [theme.breakpoints.only('xs')]:{

    },
   },

   container:{
     textAlign:'left',
     marginLeft:'25%',

     [theme.breakpoints.down('md')]:{
      paddingTop:'5%',
       width:'75%',

     }
   },
   //Campos: nombre de usuario
   //arriba , izq, abajo,derecha
   campo:{
     margin:theme.spacing(2.5,0,0,0),
     width:'100%',
     [theme.breakpoints.down('md')]:{
       margin:theme.spacing(2.5,0,2,0),
      width:'100%',
     }

   },

   campo2:{
     //arriba izq abajo der
     margin:theme.spacing(1,0,0,0),
     width:'100%',
     [theme.breakpoints.down('md')]:{
       margin:theme.spacing(2.5,0,2,0),
       width:'100%',
     }
   },
   //Mantener mi sesión activa
   sesion:{
     margin:theme.spacing(3,0,0,0),

   },
   labelCheck:{
     fontSize:'11px',
    [theme.breakpoints.only('xs')]:{
      fontSize:'9px',
    }
   },
   checkBox:{
     fontSize:12,
     verticalAlign:'middle',
    [theme.breakpoints.only('xs')]:{
      fontSize:10,
    }
   },

   //boton- iniciar sesión
   submit: {
     textAlign:'center',
     margin: theme.spacing(5,0, 0,0),
     width:'35%',
     [theme.breakpoints.down('md')]:{
       width:'20%',
     },
     [theme.breakpoints.only('xs')]:{
       width:'45%'
     }

   },
   olvidaste:{
     fontSize:'12px',
     cursor:'help',
     [theme.breakpoints.only('xs')]:{
       fontSize:'10px',
     }
   },
   //Más rápido
   cuenta:{
     margin:theme.spacing(10,0,0,22),
     fontSize:'45px',

   },
   message:{
  fontSize:'15px',
  marginTop:theme.spacing(0),
  textAlign: 'right',
   },
logoMIT:{
  width:"9%",
  verticalAlign:'middle',
  [theme.breakpoints.down('md')]:{
    width:'5%',
  },
[theme.breakpoints.down('xs')]:{
  width:'9%'
}
},
textField:{
  width:'50%',
[theme.breakpoints.only('xs')]:{
  width:'75%'
}
},
cuentaProtegida:{
  marginTop:'16%',
  marginLeft:'8%',
[theme.breakpoints.down('md')]:{
  marginTop:'8%',
  marginBottom:'5%'
},
[theme.breakpoints.down('xs')]:{
  marginBottom:'10%',
  marginLeft:'4%',
}

},
//contraseña incorrecta
incorrecto:{
  color:'red',
  [theme.breakpoints.only('xs')]:{
    fontSize:'8px'
  }
},
tipografiaProtegida:{
  fontSize:'12px',
  [theme.breakpoints.only('xs')]:{
    fontSize:'9px',
  }
},
check:{
  width:'50%',

},
divCheck:{
    transform:"translate(-3px, 8px)",
    [theme.breakpoints.down('md')]:{
      transform:"translate(-12px, 8px)",
    }
}

});

function Copyright(props) {
  return (
    <Typography variant="body2" color="textSecondary" align="left" className={props.tipografiaProtegida}>
      Cuenta protegida por <img src={mit} alt="Imagen no disponible" maxwidth='100%' className={props.logoMIT} />
    </Typography>
  );
}

function setWithExpiry(key, value,ttl){
  const now = new Date()

  const item ={
    value:value,
    expiry: now.getTime() + ttl
  }
    localStorage.setItem(key, JSON.stringify(item))
}




class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      signedIn: '',
      vistaLogin:true,
      error:true,
      keep:false, //Mantener sesión activa
      loading:false,
      check:false,

    };
    this.handleChange = this.handleChange.bind(this);
    this.changeKeep = this.changeKeep.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signIn = this.signIn.bind(this);
    this.confirmSignIn = this.confirmSignIn.bind(this);
    this.handleback = this.handleback.bind(this);

    }

    componentDidMount(){
      if (!navigator.onLine){
        swal("Sin conexión","Intenta más tarde mas tarde","warning");
      }
      if(localStorage.getItem('open') && this.state.keep){

        let updateUser = async authState =>{
          try {
            let user = await Auth.currentAuthenticatedUser()
            this.setState({user:user})
            //console.log("user:" + JSON.stringify(this.state.user))
          }
          catch{
              this.setState({user:null})
            //  console.log("null:" + this.state.user)
          }
      }
      Hub.listen('auth', updateUser) // listen for login/signup events
     updateUser() // check manually the first time because we won't get a Hub event
     return () => Hub.remove('auth', updateUser) // cleanup
     }else{
        localStorage.clear()
        this.handleOut()
      }

        }

    async handleOut(){
       try{
         await Auth.signOut();
         this.setState({login:false, user:null})
        // console.log('handleOut')

       }catch (error){
      //   console.log('error signing out:', error);
       }
     }


    signIn() {

      const { username, password } = this.state;
      Auth.signIn({
          username: username,
          password: password,
      })
      .then(() => this.setState(  {signedIn: true, loading:false}),

            )
      .catch((err) =>
          {if(err){
            this.setState({error:false, loading:false})

          }}

    )


  }

  confirmSignIn() {
      const { username } = this.state;
      Auth.confirmSignIn(username)
      .then(() => console.log('successfully confirmed signed in'))
      .catch((err) => console.log(`Error confirming sign up - ${ err }`)
  )
  }

  handleSubmit(e) {
      e.preventDefault();
      this.signIn();
      this.setState({
          username:this.state.username,
          password: '',
          loading:true,
      });
       document.getElementById('password').value=""

  }

  handleChange(e) {
    const regex = /^(([^<>()[\].,;:\s@”]+(\.[^<>()[\].,;:\s@”]+)*)|(”.+”))@(([^<>()[\].,;:\s@”]+\.)+[^<>()[\].,;:\s@”]{2,})$/
      if (e.target.id === 'username') {
        if(regex.test(e.target.value)){
          this.setState({check:true,error:true})
        }

        this.setState({
            username: e.target.value
        });
      } else if (e.target.id === 'password') {
        this.setState({
            password: e.target.value
        });
      }
  }
  changeKeep(){

    this.setState({keep:!this.state.keep})

  }


  handleback(){

    this.setState({vistaLogin:true});

  }




  render(){
    const { classes } = this.props;
    const { signedIn } = this.state;
    setWithExpiry('keep',this.state.keep,24*60*60*1000) //expirar la variable keep

    if(signedIn){
      sessionStorage.setItem('on',true)
      return(
        <div>
            <Redirect from ="/login" to="/dashboard"/>
        </div>
      );
     } else{

    return (
      <div >
      <Grid container   className={classes.root}>


        <Grid item xs={12} sm={12} md={12} lg={4} component={Paper} >

        <Container maxWidth="md" className={classes.container} >

            <img src={logo} className={classes.avatar} alt="LogoMiPOT"  />

            <Typography component="h1" variant="h1" color="primary" className={classes.loggin}>
              Inicio de sesión
            </Typography>

              <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
              <div className={classes.campo} style={{display:'flex',alignItems:"center"}}>

                <TextField
                  required
                  label="Nombre de usuario"
                  InputLabelProps={{
                    style:{
                      fontSize:"11px",
                      color:"#B3B3B3",

                    }
                  }}
                  id="username"
                  name="username"
                  type="email"
                  className={classes.textField}
                  onChange = {this.handleChange}
                />
                {this.state.check ?
                 <div className={classes.divCheck}>
                  <img className={classes.check} src={aprobado} alt="aprobado" />
                </div>
                : null
              }
              </div>
              <div className={classes.campo2}>
                <TextField
                  required
                  name="password"
                  type="password"
                  id="password"
                  label="Contraseña"
                  InputLabelProps={{
                    style:{
                      fontSize:"11px",
                      color:"#B3B3B3",

                    }
                  }}

                  className={classes.textField}
                  onChange={this.handleChange}
                />
              </div>
              { this.state.loading ?
                <p style={{color:"#4184fa"}}>Cargando ...</p> :
                this.state.error ? null : <p className={classes.incorrecto}>La contraseña y/o el usuario son incorrectos</p>}
              <FormControlLabel
                control={
                  <Checkbox
                  name="checkedB"
                   color="primary"
                   onChange={this.changeKeep}
                   icon={<CheckBoxOutlineBlankIcon className={classes.checkBox} />}
                   checkedIcon={<CheckBoxIcon className={classes.checkBox}/>}
                  />}
                label={<Typography variant="body2" color="textSecondary"
                className={classes.labelCheck} >Mantener mi sesión activa</Typography>}
                className={classes.sesion}

              />
              <div>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  style={{borderRadius:'16px', fontSize:'8px'}}
                >
                  Iniciar sesión
                </Button>
              </div>
              <div style={{marginTop:'10%'}}>
                <a  href="mailto:soporte@atomicthings.com?subject=Contraseña olvidada" className={classes.olvidaste}>
                  ¿Olvidaste tu contraseña?.¡Contáctanos!
                </a>
              </div>
              <Box className={classes.cuentaProtegida}>
                <Copyright logoMIT={classes.logoMIT} tipografiaProtegida={classes.tipografiaProtegida} />
              </Box>
            </form>


          </Container>

        </Grid>


        <Hidden only = {['xs','sm', 'md']}>
          <Grid item  lg={8} className={classes.image}  >
            <Typography variant='h3' className={classes.cuenta}>
            Más rápido, más fácil<br/>
            <span style={{lineHeight:'1.2'}}> Así es MiPOT</span> <span className='marca' style={{fontSize:'55%', float:'bottom'}}>® </span>
            </Typography>
          </Grid>
        </Hidden>
      </Grid>
      </div>
    );
  }}
}

  export default withStyles(useStyles)(Login);
