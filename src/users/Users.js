import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import UserTable from '../users/UserTable';
import { withStyles } from "@material-ui/core/styles";
import clsx from 'clsx';
import Grafico from '../Grafico';
import {MAN, WOMAN, NOS,} from '../config';


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
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
      borderRadius:'20px',
  },
  fixedHeight: {
    height: 250,
      width:'100%',
    borderRadius:'20px',
  },
});

function Genero (props){
    return(

        <Grid item xs={12} sm={6} md={4} lg={4}>
          <Paper className={props.fixedHeightPaper}>
            <Grafico titulo={props.titulo} vista="Genero" url={props.url}/>
          </Paper>
        </Grid>

    );

}

function Tabla (props){
    return(
      <Grid item xs={12}>
        <Paper className={props.className}>
          <UserTable  limit={props.limit}/>

        </Paper>
      </Grid>
    );
}



class Users extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      data:[],
      tabla:true,
      show:false,
    };

  }


  componentDidMount(){


  }


  render(){
    const { classes } = this.props;
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
    return(

            <div className={classes.root}>
            <main className={classes.content}>
              <Container maxWidth="lg" className={classes.container}>
                <Grid container spacing={5}>
                  {/*Grafica de masculino*/}
                  <Genero fixedHeightPaper={fixedHeightPaper} titulo="Hombre" url={MAN}/>
                  {/*Grafica de femenino */}
                 <Genero fixedHeightPaper={fixedHeightPaper} titulo="Mujer" url={WOMAN} />
                  {/*Grafica sin definir */}
                  <Genero fixedHeightPaper={fixedHeightPaper} titulo="No binario" url={NOS} />
                  {/* Recent Orders */}
                  <Tabla className={classes.paper} />

                </Grid>
              </Container>
            </main>
            </div>
    );
  }

}


export default withStyles(useStyles)(Users);
