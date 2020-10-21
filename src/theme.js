import {createMuiTheme} from '@material-ui/core/styles';
import { esES } from '@material-ui/core/locale';

const theme = createMuiTheme({
  typography:{
  fontFamily:'Avenir',
  h1:{
    fontSize:'1.5vw',
    fontWeight:'bold',
  },
  h3:{
  color:'white',
  fontWeight:'bold',
},
  h6:{
    fontWeight:'900',
  },
  p:{
    fontWeight:'bold',
    fontSize:0.2,
  }

},
  palette:{
    //azul
    primary:{
        main:"#4184fa"

    },
    //verde
    secondary:{
      main:"#000",
    },
    //azul
    warning:{
      main:"#0088FE",
    },
    //amarillo
    error:{
        main:"#FFBB28",
    },
  },

},
esES);

export default theme;
