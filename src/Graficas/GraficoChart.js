import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer,CartesianGrid } from 'recharts';
import PropTypes from 'prop-types';

/*
*Muestra los datos de la grafica de Ventas totales
*/
 class GraficoChart extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    const { height, data, coin,pot,dot1, dot2} = this.props;
    return (
/* ------------------------------ con datos --------------------------------------------- */
          <div>
            <ResponsiveContainer width='100%' height={height}>
                <LineChart
                    data={data}
                    margin={{
                      top: 16,
                      right: 0,
                      bottom: 0,
                      left: -9,
                    }}
                  >
                   <CartesianGrid strokeDasharray="3 3" vertical={false} y={3}    tick={{fill:'#1A1A1A'}}/>
                    <XAxis
                      dataKey="date"
                      stroke="#B3B3B3"
                      tick={{fontSize:'10px',fill:'#1A1A1A'}}
                      interval="preserveStart"

                      angle={0}
                      strokeDasharray="3 3"
                      padding={{left: 30, right: 30}}
                    />
                    <YAxis stroke="#fff"
                    tick={{fontSize:'14px',fill:"#B3B3B3"}}
                    interval={0}

                    >
                      <Label angle={270} position="left" style={{ textAnchor: 'middle' }}/>

                    </YAxis>
                    <Line
                      type="monotone"
                     dataKey='coins'
                     stroke={coin}
                     style={{strokeDasharray:"5"}}
                     strokeWidth="2"
                     dot={dot1}
                     fill="#FFBB28"
                      padding={{bottom: 10}}
                    />
                    <Line
                      type="monotone"
                      dataKey="mipot"
                      stroke={pot}
                      style={{strokeDasharray:"5"}}
                      strokeWidth="2"
                      dot={dot2}
                      fill="#0088FE"
                      padding={{bottom: 10}}
                      />
                </LineChart>
              </ResponsiveContainer>
            </div>

    );
  }
}

GraficoChart.propTypes = {
  data: PropTypes.array,
  coin : PropTypes.string,
  pot : PropTypes.string,
  dot1 : PropTypes.bool.isRequired,
  dot2 : PropTypes.bool.isRequired,
};

export default (GraficoChart);
