import React from 'react';
import { Route, Router, Routes, BrowserRouter }  from 'react-router-dom';
import Questions from './Questions';
import Results from './Results';
// import logo from './logo.svg';
// import './App.css';

export default class App extends React.Component{
	state = {
		text: null,
		res: null,
		allChecked: false,
	}
	
	componentDidMount(){
		fetch("/data.json")
		.then(response => response.json())
		// .then(text => this.setState({text}));
		.then(text => {
			let res = {
				blocks: new Array(text.blocks.length)
			}
			text.blocks.forEach((block, blockInd) => {
				res.blocks[blockInd] = {
					type: block.title,
					questions: new Array(block.questionBlocks.length),
				}

				for(let questionBlockInd = 0; questionBlockInd < block.questionBlocks.length; questionBlockInd++){
					res.blocks[blockInd].questions[questionBlockInd] = {
						answer: NaN,
						mark: 0
						// answer: 0,
						// mark: text.blocks[i].questionBlocks[j].marks[0]
					}
				}
			});

			this.setState({text, res})
		});
		
		
	}

	answerClicked = (type, question, answer) => {
        // console.log(type, question,': ', answer);
		let res = this.state.res;
		console.log(res);
		res.blocks[type].questions[question].answer = answer;
		res.blocks[type].questions[question].mark = this.state.text.blocks[type].questionBlocks[question].marks[answer];

		let allChecked = this.state.allChecked;
		if(!allChecked)
			allChecked = this.allAnswersChecked(res);

		this.setState({res, allChecked})
    }

	allAnswersChecked = (res) => {
		for(let blockInd = 0; blockInd < res.blocks.length; blockInd++){
			let block = res.blocks[blockInd];
			for(let questionInd = 0; questionInd < block.questions.length; questionInd++){
				let question = block.questions[questionInd];
				if(isNaN(question.answer)){
					return false;
				}
			}
		}
		return true;
	}

	clearAnswers = () => {
		// let res = this.state.res;
		// res.blocks.forEach((block, blockInd) => {
		// 	for(let questionBlockInd = 0; questionBlockInd < block.questions.length; questionBlockInd++){
		// 		res.blocks[blockInd].questions[questionBlockInd] = {
		// 			answer: NaN,
		// 			mark: 0
		// 		}
		// 	}
		// });

		// console.log(res);


		// this.setState({res});
	}


	render(){
		// console.log(this.state.res);
		return (
			<BrowserRouter>
				<Routes>
					{/* <Route exact path='/' element={<Questions text={this.state.text} res={this.state.res} answerClicked={this.answerClicked} />} /> */}
					<Route path='/*' element={<Questions text={this.state.text} res={this.state.res} allChecked={this.state.allChecked} answerClicked={this.answerClicked} clearAnswers={this.clearAnswers} />} />
					{/* <Route path='/res' element={<Results res={this.state.res} />} /> */}
				</Routes>
		  </BrowserRouter>
		);
	}
}

