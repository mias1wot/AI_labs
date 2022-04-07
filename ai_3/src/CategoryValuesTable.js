import React from 'react';

/*takes:
 headers 
 rowHeaders
 values as [rows][columns]
 colors - for each row (null if not needed)
 */
export default function CategoryValuesTable(props){
    return (
        <div>
            <table className="table table-striped table-bordered table-hover text-center" style={{"fontWeight": "bold", "fontSize": "large"}}>
                <thead className="thead-dark">
                    <tr>
                        <th>Професія</th>
                        {props.headers.map((header, headerInd) => {
                            return <th key={headerInd}>{header}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.values.map((rowArr, arrInd) => {
                        return (
                        <tr key={arrInd} bgcolor={props.colors?props.colors[arrInd]:null}>
                            <th>{props.rowHeaders[arrInd]}</th>

                            {rowArr.map((rowData, rowDataInd) => {
                                return <td key={rowDataInd}>{rowData}</td>
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
        </div>
    );
}
