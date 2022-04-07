import React from 'react';
import CategoryValuesTable from './CategoryValuesTable';

export default class CandidateProfessionMatrix extends React.Component{	
	render(){
		return (
            <CategoryValuesTable headers={this.props.candidates} rowHeaders={this.props.professions} values={this.props.candidateProfession} colors={this.props.colors}/>
		);
	}
}
