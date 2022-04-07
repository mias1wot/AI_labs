import React from "react";
import './CandidateProfessionChart.css'
import {  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label, ResponsiveContainer,   AreaChart,ReferenceLine, Area } from 'recharts';


export default class CandidateProfessionChart extends React.Component{
    render(){
        let {professions, candidates, candidateProfession} = this.props;

        //prepares data object for the chart
        let data = [];
        for(let candidateInd = 0; candidateInd < candidates.length; candidateInd++){
            data[candidateInd] = {
                professionBF: [],//belonging function
                candidateName: candidates[candidateInd],
            }
            for(let profInd = 0; profInd < professions.length; profInd++){//profession index
                data[candidateInd].professionBF[profInd] = candidateProfession[profInd][candidateInd];//cause the array has professions at rows and candidates at columns
            }
        }

        return (
            <div className="middle full-sized">
                <ResponsiveContainer width="100%" height="80%">
                    <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        left: 100,
                        bottom: 20
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="candidateName" />
                        <YAxis domain={[0,1]} label={{ value: 'Функція належності',  position: 'top' }} />
                        {/* <YAxis  /> */}
                        <Tooltip />
                        {data.map((candidate, candidateInd) => {
                            // return <Bar key={candidateInd} dataKey={dataCandidate => dataCandidate.professionBF[candidateInd]} fill={'#' + colors[candidateInd].toString(16)} />
                            return <Bar key={candidateInd} dataKey={dataCandidate => dataCandidate.professionBF[candidateInd]} fill={this.props.colors[candidateInd]} />
                        })}
                    </BarChart>
                </ResponsiveContainer>
            </div>
        );  
    }
}