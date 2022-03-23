import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, ComposedChart, Area} from 'recharts';
// import logo from './logo.svg';
// import './App.css';

export default class Results extends React.Component{
    CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
            <div className="custom-tooltip">
                <p className="label">{`question: ${label}`}</p>
                <p className="label">{`mark: ${payload[0].value}`}</p>
            </div>
            );
        }
        return null;
    }

	render(){
        var res = this.props.res;
        console.log(res);
        if(res == null)
            return null;

        const blocksData = [];
        const summarizedRes = [];

        res.blocks.forEach((block, blockInd) => {
            blocksData[blockInd] = [];
            var summerizedMark = 0;
            block.questions.forEach((question, questionInd) => {
                blocksData[blockInd][questionInd] = {
                    answer: question.answer,
                    index: questionInd,
                    mark: question.mark,
                }

                summerizedMark += question.mark;
            });

            summarizedRes[blockInd] = {
                type: block.type,
                mark: summerizedMark
            };
        });
        
        const data = [
            {
              name: 'Page A',
              uv: 590,
              pv: 800,
              amt: 1400,
            },
            {
              name: 'Page B',
              uv: 868,
              pv: 967,
              amt: 1506,
            },
            {
              name: 'Page C',
              uv: 1397,
              pv: 1098,
              amt: 989,
            },
            {
              name: 'Page D',
              uv: 1480,
              pv: 1200,
              amt: 1228,
            },
            {
              name: 'Page E',
              uv: 1520,
              pv: 1108,
              amt: 1100,
            },
            {
              name: 'Page F',
              uv: 1400,
              pv: 680,
              amt: 1700,
            },
          ];

		return (
			<div className="ms-1" >
                {0==0?null:blocksData.map((blockData, blockDataInd) => {
                    return <BarChart
                    key={blockDataInd}
                    width={500}
                    height={300}
                    data={blockData}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="index" />
                        <YAxis />
                        <Tooltip content={<this.CustomTooltip />} />
                        {/* <Tooltip /> */}
                        <Legend />
                        <Bar dataKey="mark" barSize={20} fill="#8884d8" />
                    </BarChart>;
                })}

                    <BarChart
                    layout="vertical"
                    width={800}
                    height={500}
                    data={summarizedRes}
                    margin={{
                        top: 50,
                        right: 30,
                        left: 80,
                        bottom: 5,
                    }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis dataKey="type" type="category" />
                        {/* <Tooltip content={<this.CustomTooltip />} /> */}
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="mark" barSize={20} fill="#413ea0" />
                    </BarChart>;


            </div>
		);
	}
}

