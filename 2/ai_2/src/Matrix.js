import React from "react";
import './Matrix.css';

export default class Matrix extends React.Component{
    render(){
        let {advantagesMatrix, belongingFunctions, belongingFunctionsNormalized} = this.props;

        // console.log(advantagesMatrix);
        // console.log(belongingFunctions);

        return (
            <div>
                {/* Matrix column headers */}
                <div className="matrixHeaderPanel">
                    {this.props.salaries.map((salary, salaryInd) => {
                        return <span className="matrixColumn matrixHeaderColumn matrixHeader" key={salaryInd}>{salary}</span>
                    })}
                </div>

                {/* Matrix elements with rows headers */}
                {advantagesMatrix.map((arr, arrInd) => {
                    return (
                    <div className="matrixRow" key={arrInd}>
                        <span className="matrixColumn matrixRowHeader matrixHeader">{this.props.salaries[arrInd]}</span>
                        {arr.map((advantage, advantageInd) => {
                            return <span className="matrixColumn" key={advantageInd}>{advantage}</span>
                        })}
                    </div>)
                })}

                {/* Belonging functions */}
                <div>
                    <span className="matrixColumn matrixRowHeader matrixHeader textDescriptionRowHeader">ф-ція належн.</span>
                    {belongingFunctions.map((belongingFunction, belongingFunctionsInd) => {
                        return <span className="matrixColumn belongingFunction" key={belongingFunctionsInd}>{belongingFunction}</span>
                    })}
                </div>

                {/* Normalized belonging functions */}
                <div>
                    <span className="matrixColumn matrixRowHeader matrixHeader textDescriptionRowHeader">Норм. ф-ція належн.</span>
                    {belongingFunctionsNormalized.map((belongingFunctionNormalized, belongingFunctionNormalizedInd) => {
                        return <span className="matrixColumn belongingFunction" key={belongingFunctionNormalizedInd}>{belongingFunctionNormalized}</span>
                    })}
                </div>
            </div>
        );
    }
}