import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, YAxis, CartesianGrid,ResponsiveContainer,
} from 'recharts';
import PropTypes from 'prop-types';

const colors = ['#4caf50','#FFBB28','#0088FE','#f48fb1'];

class BarChartjs extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
    const {horario, height,  } =this.props;
    return (
        <div>
            <ResponsiveContainer width='100%' height={height}>
              <BarChart
                data={horario}
                barCategoryGap={10}
                style={{marginTop:'8%'}}  >
                <CartesianGrid  strokeDasharray="5"  vertical={false} />
                <YAxis stroke="#fff"  tick={{fontSize:'7px',fill:"#B3B3B3"}}  interval={1}  width={12}   />

                <Bar dataKey="number" fill="#82ca9d" radius={[10, 10, 10, 10]}  >
                {
                  horario.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={colors[index % 20]} />
                  ))
                }
              </Bar>
              </BarChart>
          </ResponsiveContainer>
          <ul  style={{marginTop:'10px', color:"#B3B3B3", transform:"translateY(16%)"}}>
            <li  className="madrugada">Madrugada</li>
            <li className="mañana">Mañana</li>
            <li className="tarde">Tarde</li>
            <li className="noche">Noche</li>
          </ul>

      </div>

);
}
}
BarChartjs.propTypes = {
  horario: PropTypes.array.isRequired,
  height: PropTypes.number.isRequired,
};
export default (BarChartjs);
