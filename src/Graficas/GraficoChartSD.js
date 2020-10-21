import React, { PureComponent } from 'react';
import { LineChart, Line, YAxis, Label, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import link from '../Img/sin_conexion.png';
import { withStyles } from "@material-ui/core/styles";


const useStyles = theme =>({
  link:{
    textAlign:'center',
    marginTop:'5%',
    [theme.breakpoints.down('md')]:{
      marginTop:'10%',
    }
  }


});

export function getCurrentDate(dia){
var fecha = new Date();

var newDate = new Date(fecha.getTime() + dia)

let date = newDate.getDate() ;
let month = newDate.getMonth() + 1;
let year = newDate.getFullYear();

return `${date}/${month<10?`0${month}`:`${month}`}/${year}`
}

const data = [
  {date:getCurrentDate(0), coins: 0,},
  {date:getCurrentDate(24*60*60*1000), coins: 50},
  {date:getCurrentDate(24*60*60*1000*2), coins: 20},
  {date:getCurrentDate(24*60*60*1000*3), coins: 80},
  {date:getCurrentDate(24*60*60*1000*4), coins: 60},

]

/*
*Muestra los datos de la grafica de Ventas totales
*/
 class GraficoChartSD extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    const { height, classes, view, status} = this.props;
    return (
        <div>
        {status === 0 && view=== 1 ?
          <div className={classes.link}>
            <img src={link} width='10%' alt="Sin conexión" />
            <p style={{color:"#C1C1C1", fontSize:'80%'}}>
              No es posible conectar con <br/>
              el servidor, inténtalo más tarde
            </p>
          </div>
          :
          <div>
          <ResponsiveContainer width='100%' height={height}>

              <LineChart

                  data={data}
                  margin={{
                    top: 16,
                    right: 0,
                    bottom: 10,
                    left: -9,
                  }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" vertical={false}     tick={{fill:'#1A1A1A'}}/>*/}

                  <YAxis stroke="#fff"
                  tick={{fontSize:'14px',fill:"#B3B3B3"}}
                  interval={0}

                  >
                    <Label angle={270} position="left" style={{ textAnchor: 'middle' }}/>

                  </YAxis>
                  <Line
                    type="monotone"
                   dataKey='coins'
                   stroke="#C1C1C1"
                   strokeDasharray="5"
                   strokeWidth="2"
                   fill="#C1C1C1"
                    padding={{bottom: 10}}
                  />

              </LineChart>
            </ResponsiveContainer>
            </div>

            }
          </div>


    );
  }
}
GraficoChartSD.propTypes = {
  view: PropTypes.number,
  status : PropTypes.number,
  height: PropTypes.number,
};



export default withStyles(useStyles)(GraficoChartSD);
