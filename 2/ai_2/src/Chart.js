import React from "react";
import './Chart.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer,   AreaChart,ReferenceLine, Area } from 'recharts';


export default class Chart extends React.Component{
    render(){
        let {salaries, belongingFunctionsNormalized} = this.props;

        //prepares data object for the chart
        let data = [];
        for(let i = 0; i < salaries.length; i++){
            data[i] = {
                salary: salaries[i],
                belongingFunction: belongingFunctionsNormalized[i],
            }
        }

        return (
            <div className="middle full-sized">
                <ResponsiveContainer width="100%" height="80%">
                    <LineChart
                    data={data}
                    margin={{
                        top: 20,
                        left: 100,
                        bottom: 20
                    }}
                    >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="salary" type="number">
                        <Label value="Зарплата" offset={0} position="bottom" />
                    </XAxis>
                    <YAxis domain={[0,1]} label={{ value: 'Нормалізована функція належності',  position: 'top' }} />
                    <Tooltip />
                    <Line animationDuration={500} type="monotone" dataKey="belongingFunction" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth="3" dot={{  strokeWidth: 8}} />
                    {/* <Line animationDuration={500} type="" dataKey="belongingFunction" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth="3" dot={{  strokeWidth: 8}} /> */}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );  
    }
}