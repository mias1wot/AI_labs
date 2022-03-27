import React from 'react';
import "./Salaries.css"

export default class Salaries extends React.Component{
	render(){
        const advantageOptions = Array(9).fill(null).map((el, ind) => {
			let val = ind + 1;
			return <option value={val} key={ind}>{val}</option>;
		});

		return (
            <div>
                {this.props.salaries.map((salary, salaryInd) => {
                    return(
                    <div className="bigElements mb-3" key={salaryInd}>
                        <label className="me-3">{salary}</label>
                        {
                            salaryInd == (this.props.salaries.length - 1)//the last element
                            ?
                            <select disabled>
                                <option value="1">1</option>
                            </select>
                            :
                            <select value={this.props.advantages[salaryInd]} onChange={this.props.changeAdvantage(salaryInd)}>
                                {advantageOptions}
                            </select>
                        }
                    </div>)
                })}
            </div>
		);
	};
}
