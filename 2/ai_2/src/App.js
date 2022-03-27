import React from 'react';
import './App.css';
import Salaries from './Salaries.js';
import Matrix from './Matrix.js';
import Chart from './Chart.js';


class App extends React.Component{
	constructor(props){
		super(props);
		this.salaries = [300, 600, 1000, 2000, 4000, 6000];
		this.state = {
			advantages: Array.from(new Array(this.salaries.length), (x, i) => (i<8) ? (9 - i) : 2),
		};
	}
	

	changeAdvantage = (ind) => (e) => {
		let advantages = this.state.advantages;
		advantages[ind] = e.target.value;

		this.setState({advantages});
	}

	calculateAdvantagesMatrix = (advantages) => {
		let length = advantages.length;
        let matrix = Array(length).fill(null).map(() => Array(length));

        //working with predefined last row - filling the last column with values
        matrix[length-1] = advantages.slice(0);
        matrix[length-1][length-1] = 1;//if user has made a mistake
        matrix[length-1].forEach((value, ind) => matrix[ind][length-1] = 1 / value);

        //calculates matrix values
        for(let i = length - 2; i >= 0; i--){
            for(let j = 0; j < i; j++){
                matrix[i][j] = matrix[i+1][j] / matrix[i+1][i];
                matrix[j][i] = 1 / matrix[i][j];
            }
            matrix[i][i] = 1;
        }

		//trancats too long decimal numbers
		for(let i = 0; i < length; i++){
            for(let j = 0; j < length; j++){
				matrix[i][j] = Math.trunc(matrix[i][j]*100)/100;
			}
		}

		return matrix;
	}

	//calculates function of belongings
	calculateBelongingFunctions = (advantagesMatrix) => {
		let length = advantagesMatrix.length;
		let belongingFunctions = Array(length);
		for(let i = 0; i < length; i++){
			belongingFunctions[i] = 0;
			for(let j = 0; j < length; j++)
				belongingFunctions[i] += advantagesMatrix[j][i];
			belongingFunctions[i] = 1 / belongingFunctions[i];
		}

		//trancats too long decimal numbers
		for(let i = 0; i < length; i++){
			belongingFunctions[i] = Math.trunc(belongingFunctions[i]*100)/100;
		}

		return belongingFunctions;
	}


	calculateBelongingFunctionsNormalized = (belongingFunctions) => {
		let length = belongingFunctions.length;
		const belongingFunctionsNormalized = Array(length);

		//finds the maximum value of belonging functions
		let maxFuncVal = -1;
		for(let i = 0; i < length; i++){
			if(maxFuncVal < belongingFunctions[i])
			maxFuncVal = belongingFunctions[i];
		}

		//normalizes belonging functions
		for(let i = 0; i < length; i++){
			belongingFunctionsNormalized[i] = belongingFunctions[i] / maxFuncVal;
			belongingFunctionsNormalized[i] = Math.trunc(belongingFunctionsNormalized[i]*100)/100; //trancats too long decimal numbers
		}

		return belongingFunctionsNormalized;
	}




	render(){
		const salaries = this.salaries;
		const advantages = this.state.advantages;

		let advantagesMatrix = this.calculateAdvantagesMatrix(advantages);
        let belongingFunctions = this.calculateBelongingFunctions(advantagesMatrix);
		let belongingFunctionsNormalized = this.calculateBelongingFunctionsNormalized(belongingFunctions);


		return (
			<div className="container-fluid row mt-5">
				<div className="col-md-2 center">
					<h3 className="header">Зарплата в сфері IT</h3>
					<p className="mb-4 smallText">Зарплата / перевага найбільшого елемента над поточним</p>
					<Salaries salaries={salaries} advantages={advantages} changeAdvantage={this.changeAdvantage}/>
				</div>

				<div className="col-md-5 center">
					<h3 className="header">Матриця парних порівнянь</h3>
					<Matrix salaries={salaries} advantagesMatrix={advantagesMatrix} belongingFunctions={belongingFunctions} belongingFunctionsNormalized={belongingFunctionsNormalized}/>
				</div>

				<div className="col-md-5 center">
					<h3 className="header">Графік функцій належності</h3>
					<Chart salaries={salaries} belongingFunctionsNormalized={belongingFunctionsNormalized} />
				</div>
			</div>
		);
	};
}

export default App;
