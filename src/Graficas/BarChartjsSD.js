import React, { PureComponent } from 'react';
import {
  BarChart, Bar, Cell, YAxis, CartesianGrid,ResponsiveContainer,
} from 'recharts';


const colorsSD = ['#C1C1C1','#C1C1C1','#C1C1C1','#C1C1C1'];
const sinDatos = [{name: "Mañana", number : 20},{name: "Tarde", number : 15},{name: "Noche", number : 10},{name: "Madrugada", number : 5}]




class BarChartjsSD extends PureComponent {
  static jsfiddleUrl = 'https://jsfiddle.net/alidingling/xqjtetw0/';

  render() {
      const { height,} =this.props;
    return (
        <div>
          <ResponsiveContainer width='100%' height={height}>
            <BarChart  data={sinDatos} barCategoryGap={10} style={{marginTop:'8%'}}  >
              <CartesianGrid  strokeDasharray="5"  vertical={false} />
              <YAxis stroke="#fff"  tick={{fontSize:'7px',fill:"#B3B3B3"}}  interval={1}  width={12}   />

              <Bar dataKey="number" fill="#82ca9d" radius={[10, 10, 10, 10]}  >
              {
                sinDatos.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorsSD[index % 20]} />
                ))
              }
            </Bar>
            </BarChart>
        </ResponsiveContainer>
        <ul  style={{marginTop:'10px', color:"#B3B3B3", transform:"translateY(16%)"}}>
          <li  className="madrugadaSD">Madrugada</li>
          <li className="mañanaSD">Mañana</li>
          <li className="tardeSD">Tarde</li>
          <li className="nocheSD">Noche</li>
        </ul>
      </div>

);
}
}

export default (BarChartjsSD);
