import React, {Component} from 'react';
import {
  BarChart, Bar,XAxis, YAxis, LabelList,ResponsiveContainer
} from 'recharts';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";
import PropTypes from 'prop-types';


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



class BarChartHorizontal extends Component{
  constructor(props){
    super(props);
    this.state = {
      appear:true,
    }
  }

  render(){

    const { dispositivos, edades, classes } = this.props;
    return(

      <div >
        <div >
        <Typography  component="p" className={classes.datos}>
        Dispositivos
        </Typography>
        {/*Grafica de android-iOs horizontal */}
          <ResponsiveContainer width='100%' height={22} >
            <BarChart

              data={dispositivos}
              layout='vertical'
              margin={{
                top: 15, right:5, left:0, bottom: 0,
              }}


            >

              <XAxis hide={true} type="number" />
              <YAxis  hide={true} type="category" />

              <Bar  dataKey="android" stackId= "a" fill='#FFBB28' radius={[10, 0, 0, 10]} >
            {/*}  //  {dispositivos[0].android === 0 ?
              //   null : */}
              <LabelList position="top" className={classes.android} fill="#B3B3B3" textAnchor="end" >
              Android
              </LabelList>
          {/*}  // } */}
              </Bar>

              <Bar dataKey="ios" stackId= "a" fill="#4caf50"   radius={[0, 10, 10, 0]} >

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
            <ResponsiveContainer width='100%' height={28}>
            <BarChart
              data={edades}
              layout='vertical'
              margin={{
                top: 10, right:5, left:0, bottom:11,
              }}

            >

              <XAxis hide={true} type="number"/>
              <YAxis hide={true} type="category" />

              <Bar  dataKey="juvenil" stackId= "a" fill="#4caf50"  radius={[10, 0, 0, 10]}>

                 <LabelList position="top" className={classes.android} fill="#B3B3B3"  >
                18/25
               </LabelList>

              </Bar>
              <Bar dataKey="joven" stackId= "a" fill="#FFBB28">
              <LabelList position="bottom" className={classes.android} fill="#B3B3B3"  >
              26/35
              </LabelList>
              </Bar>
              <Bar dataKey="adulto" stackId= "a" fill="#0088FE" >
              <LabelList position="top" className={classes.android} fill="#B3B3B3"   >
              36/45
              </LabelList>
              </Bar>

              <Bar dataKey="mayor" stackId= "a" fill="#f48fb1"  radius={[0, 10, 10, 0]}>
              <LabelList position="bottom" className={classes.android} fill="#B3B3B3"     >
              46/99
              </LabelList>
              </Bar>
            </BarChart>
            </ResponsiveContainer>
            </div>

          </div>

);}}
BarChartHorizontal.propTypes = {
  dispositivos: PropTypes.array.isRequired,
  edades: PropTypes.array.isRequired,
};

export default withStyles(useStyles)(BarChartHorizontal);
