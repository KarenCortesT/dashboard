import React, {Component} from 'react';
import {
  BarChart, Bar,XAxis, YAxis, LabelList,ResponsiveContainer
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const useStyles = theme =>({
  datos:{
  fontWeight:'500',
   fontSize:'14px',
    marginTop:'3%',
    color:"#B3B3B3",
    transform:'translateY(17%)',
      [theme.breakpoints.down('md')]:{
        fontSize:'12px',
        transform:'translateY(13%)',
      },
      [theme.breakpoints.only('xs')]:{
        fontSize:'10px',
      }
  },
  android:{
    fontSize:'7px',
    [theme.breakpoints.down('md')]:{
      fontSize:'5px',
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
//datos para las gráficas que aún no tienen datos

const dataSD = [{name:"Dispositivo", android:2,iOs: 2}]
const data2SD = [{name:"users", "18/25":25,"26/35":25,"36/45":25,"46/99":25}]


class BarChartHorizontalSD extends Component{
  constructor(props){
    super(props);
    this.state = {
      appear:true,
    }
  }

  render(){

    const {  classes } = this.props;
    return(

      <div >

          <div>
            <Typography  component="p" className={classes.datos}>
            Dispositivos
            </Typography>
            {/*Grafica de android-iOs horizontal */}
              <ResponsiveContainer width='90%' height={22} style={{border:'1px solid red'}}>
                <BarChart

                  data={dataSD}
                  layout='vertical'
                  margin={{
                    top: 15, right:0, left:0, bottom: 0,
                  }}
                >

                  <XAxis hide={true} type="number" />
                  <YAxis  hide={true} type="category" />

                  <Bar dataKey="android" stackId= "a" fill='#C1C1C1' radius={[10, 0, 0, 10]} >
                  <LabelList position="top" className={classes.android} fill="#B3B3B3" textAnchor="end" >
                  Android
                  </LabelList>
                  </Bar>
                  <Bar dataKey="iOs" stackId= "a" fill="#C1C1C1"   radius={[0, 10, 10, 0]} >
                  <LabelList position="top" className={classes.android} fill="#B3B3B3" textAnchor="start" >
                  iOs
                  </LabelList>
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <Typography  component="p" className={classes.datos} >
              Edad
              </Typography>
                {/*Edades horizontal*/}
                <ResponsiveContainer width='89%' height={20}>
                <BarChart
                  data={data2SD}
                  layout='vertical'
                  margin={{
                    top: 15, right:0, left:0, bottom: 0,
                  }}
                >

                  <XAxis hide={true} type="number"/>
                  <YAxis hide={true} type="category" />

                  <Bar  dataKey="18/25" stackId= "a" fill="#C1C1C1"  radius={[10, 0, 0, 10]}>
                   {this.state.appear && <LabelList position="top" className={classes.android} fill="#B3B3B3"   >
                    18/25
                   </LabelList>}
                  </Bar>
                  <Bar dataKey="26/35" stackId= "a" fill="#C1C1C1">
                  <LabelList position="bottom" className={classes.android} fill="#B3B3B3"   >
                  26/35
                  </LabelList>
                  </Bar>
                  <Bar dataKey="36/45" stackId= "a" fill="#C1C1C1" >
                  <LabelList position="top" className={classes.android} fill="#B3B3B3"  >
                  36/45
                  </LabelList>
                  </Bar>
                  <Bar dataKey="46/99" stackId= "a" fill="#C1C1C1"  radius={[0, 10, 10, 0]}>
                  <LabelList position="bottom" className={classes.android} fill="#B3B3B3"   >
                  46/99
                  </LabelList>
                  </Bar>
                </BarChart>
                </ResponsiveContainer>
                </div>

          </div>

);}}



export default withStyles(useStyles)(BarChartHorizontalSD);
