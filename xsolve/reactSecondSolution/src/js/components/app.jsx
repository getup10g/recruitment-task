import React from "react";
import data from '../../data/data'
import {Table} from './table.jsx'
class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data,

        };
    }
    render() {
        return (<div>
            <Table data={this.state.data}/>
            </div>
        )
    }
}
export {App}



