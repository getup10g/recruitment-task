import React from "react";
import { render } from "react-dom";
import data from '../data/data'
import moment from 'moment';
import ReactTable from "react-table";
import "react-table/react-table.css";


class Main extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data
        };
    }
    render() {
        const { data } = this.state;
        return (
            <div>
                <ReactTable
                    data={data}
                    columns={[
                        {
                            Header: "Name",
                            columns: [
                                {
                                    Header: "First Name",
                                    accessor: "firstName"
                                },
                                {
                                    Header: "Last Name",
                                    accessor: "lastName",

                                }
                            ]
                        },{
                            Header: "Date",
                            columns: [
                                {
                                    Header: "Date Of Birth",
                                    accessor: "dateOfBirth",
                                    Cell: row => <span>
                   {
                       moment.utc(new Date(row.value)).format('YYYY/MM/DD')
                   }
                     </span>
                                }
                            ]
                        },
                        {
                            Header: "Others",
                            columns: [
                                {
                                    Header: "Company",
                                    accessor: "company"
                                },
                                {
                                    Header: "Note",
                                    accessor: "note"
                                }
                            ]
                        },
                    ]}
                    defaultPageSize={5}
                    className="-striped -highlight"
                />
                <br />
            </div>
        );
    }
}

render(<Main />, document.getElementById("app"));

