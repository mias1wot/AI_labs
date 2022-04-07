import React from 'react';
import CategoryValuesTable from './CategoryValuesTable';

export default class ProfessionMatrix extends React.Component{	
	render(){
		return (
            <CategoryValuesTable headers={this.props.categories} rowHeaders={this.props.professions} values={this.props.professionBelongingFunc} />
		);
	}
}
