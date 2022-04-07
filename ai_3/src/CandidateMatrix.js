import React from 'react';
import CategoryValuesTable from './CategoryValuesTable';

export default class CandidateMatrix extends React.Component{	
	render(){
		return (
            <CategoryValuesTable headers={this.props.categories} rowHeaders={this.props.candidates} values={this.props.candidateBelongingFunc} />
		);
	}
}
