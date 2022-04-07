import logo from './logo.svg';
import './App.css';
import React from 'react';
import ProfessionMatrix from './ProfessionMatrix';
import CandidateMatrix from './CandidateMatrix';
import CandidateProfessionMatrix from './CandidateProfessionMatrix';
import CandidateProfessionChart from './CandidateProfessionChart';

class App extends React.Component{
	constructor(props){
		super(props);
		this.professions = ["менеджер", "програміст", "шофер", "референт", "перекладач"];
		this.categories = ["швидкість та гнучкість мислення", "вміння швидко приймати рішення", "стійкість та концентрація уваги", "зорова память", "швидкість реакції", "рухлива пам'ять", "фізична виносливість", "координація рухів", "емоційно-вольова стійкість", "відповідальність"];
		this.candidates = Array.from(new Array(5), (x, i) => `Кандидат ${i + 1}`);
		this.colors = ['orange', 'green', '#89CFF0', '#FFE4C4', '#A2A2D0'];//Professions in table and corresponding chart bars will be these colors

		this.state = {
			//rows are professions
			//columns are categories
			professionBelongingFunc: [
				[0.9, 0.9, 0.8,	0.4, 0.5, 0.3, 0.6, 0.2, 0.9, 0.8],
				[0.8, 0.5, 0.9, 0.3, 0.1, 0.2, 0.2, 0.2, 0.5, 0.5],
				[0.3, 0.9, 0.6, 0.5, 0.9, 0.8, 0.9, 0.8, 0.6, 0.3],
				[0.5, 0.4, 0.5, 0.5, 0.2, 0.2, 0.3, 0.3, 0.9, 0.8],
				[0.7, 0.8, 0.8, 0.2, 0.6, 0.2, 0.2, 0.3, 0.3, 0.2]
			],

			//rows are candidates
			//columns are categories
			candidateBelongingFunc: [
				[0.9, 0.6, 0.5, 0.5, 1, 0.4, 0.5, 0.5, 0.8, 0.3],
				[0.8, 0.4, 0.2, 0.9, 0.6, 0.5, 0.8, 0.6, 1, 0.5],
				[0.7, 0.8, 0.3, 0.5, 0.5, 1, 0.9, 0.7, 0.2, 0.9],
				[0.9, 0.5, 0.5, 0.5, 0.7, 0.7, 0.5, 0.6, 0.5, 0.6],
				[1, 0.6, 0.9, 0.2, 0.4, 0.8, 0.4, 0.5, 0.6, 0.8]
			]
		};
	}


	calculateCandidateProfession = () => {
		//rows are professions
		//columns are candidates
		let candidateProfession = Array(this.professions.length);
		for(let i = 0; i < this.candidates.length; i++){
			candidateProfession[i] = Array(this.candidates.length);
		}


		//BF - belonging function
		let professionBF;
		let candidateBF;
		let min, max;
		for(let candidateInd = 0; candidateInd < this.candidates.length; candidateInd++){
			for(let i = 0; i < this.professions.length; i++){
				max = 0;
				for(let j = 0; j < this.categories.length; j++){
					professionBF = this.state.professionBelongingFunc[i][j];
					candidateBF = this.state.candidateBelongingFunc[candidateInd][j];
					min = this.min(professionBF, candidateBF);
					max = this.max(max, min);//max-min for candidate
				}
				candidateProfession[i][candidateInd] = max;
			}
		}

		return candidateProfession;

		// console.log(candidateProfession);
	}

	min = (a, b) => a<b?a:b;
	max = (a, b) => a>b?a:b;
	
	render(){
		let candidateProfession = this.calculateCandidateProfession();

		return (
			<div className="container-fluid row mt-5">
			{/* <div className="row mt-4"> */}
				{/* <div className="col-md-2 center"> */}
				<div className="center">
					<section>
						<h3 className="header">Нечітке відношення професій</h3>
						<p className="mb-4 smallText">(Містить функції належностей)</p>
						<ProfessionMatrix professions={this.professions} categories={this.categories} professionBelongingFunc={this.state.professionBelongingFunc} />
					</section>

					<section className="mt-4">
						<h3 className="header">Нечітке відношення кандидатів</h3>
						<p className="mb-4 smallText">(Містить функції належностей)</p>
						<CandidateMatrix candidates={this.candidates} categories={this.categories} candidateBelongingFunc={this.state.candidateBelongingFunc} />
					</section>

					<section className="mt-4">
						<h3 className="header">Оцінки вибору професій для кандидатів</h3>
						<p className="mb-4 smallText">(Містить функції належностей)</p>
						<CandidateProfessionMatrix professions={this.professions} candidates={this.candidates} candidateProfession={candidateProfession} colors={this.colors} />
					</section>

					<section className="mt-4">
						<h3 className="header">Графік оцінок вибору професій для кандидатів</h3>
						<CandidateProfessionChart professions={this.professions} candidates={this.candidates} candidateProfession={candidateProfession} colors={this.colors} />
					</section>
				</div>
			</div>
		);
	}
}

export default App;
