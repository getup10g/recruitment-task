import React from "react";
import moment from 'moment';
//import "react-table/react-table.css";

class CategoryRow extends React.Component {
    setSortBy = (e) => {
        this.props.setSortBy(e)
    };

    render() {
        return (
            <tr>
                <th onClick={() => this.setSortBy('id')}>Id</th>
                <th onClick={() => this.setSortBy('firstName')}>First Name</th>
                <th onClick={() => this.setSortBy('lastName')}>Last Name</th>
                <th onClick={() => this.setSortBy('dateOfBirth')}>Date of Birth</th>
                <th onClick={() => this.setSortBy('company')}>Company</th>
                <th onClick={() => this.setSortBy('note')}>Note</th>
            </tr>
        );
    }
}

class EmployerRow extends React.Component {
    render() {
        const employer = this.props.employer;
        const id = employer.id;
        const firstName = employer.firstName;
        const lastName = employer.lastName;
        const dateOfBirth = moment.utc(new Date(employer.dateOfBirth)).format('YYYY/MM/DD');
        const company = employer.company;
        const note = employer.note;
        return (
            <tr>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{dateOfBirth}</td>
                <td>{company}</td>
                <td>{note}</td>

            </tr>
        );
    }
}

class EmployersTable extends React.Component {
    setSortBy = (e) => {
        this.props.setSortBy(e);
    };

    render() {
        const rows = [];
        const wantedLength =this.props.properties.page * this.props.properties.pageSize;
        const length = wantedLength>this.props.employers.length ? this.props.employers.length : wantedLength;
        const minLength = wantedLength - this.props.properties.pageSize;
        for (let i = minLength; i < length; i++) {
                rows.push(
                    <EmployerRow
                        employer={this.props.employers[i]}
                        key={this.props.employers[i].id}
                    />
                );
        }
        return (
            <table>
                <thead>
                <CategoryRow setSortBy={this.setSortBy}/>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}


class Table extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            properties: {
                page: 1,
                pageSize: 5,
                sortBy: "id",
                dir: "asc"
            }
        };
        this.compareBy.bind(this);
        this.sortBy.bind(this);
    }

    setSortBy = (category) => {
        let properties = this.state.properties;
        if (properties.dir === "desc") {
            properties.dir = "asc";
        } else {
            properties.dir = "desc";
        }
        properties.sortBy = category;
        this.setState({properties: properties});
    };


    compareBy(key) {
        if (this.state.properties.dir === "desc") {
            if(key==="dateOfBirth"){
                return function(a,b) {
                    return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
                }
            }
            return function (a, b) {
                return a[key] < b[key] ? 1 : -1;
                /*if (a[key] < b[key]) return 1;
                if (a[key] > b[key]) return -1;
                return 0;*/
            };
        } else {
            if(key==="dateOfBirth"){
                return function(a,b) {
                    return new Date(a.date).getTime() > new Date(b.date).getTime() ? 1 : -1;
                }
            }
            return function (a, b) {
                return a[key] > b[key] ? 1 : -1;
                /*if (a[key] < b[key]) return -1;
                if (a[key] > b[key]) return 1;
                return 0;*/
            };
        }
    }


    sortBy(key) {
        let dataCopy = [...this.props.data];
        dataCopy.sort(this.compareBy(key));
        return dataCopy;
    }


    nextPage = () => {
        let properties = this.state.properties;
        properties.page = this.state.properties.page + 1;
        this.setState({properties: properties});
    };
    prevPage = () => {
        let properties = this.state.properties;
        properties.page = this.state.properties.page - 1;
        this.setState({properties: properties});
    };

    render() {
        let nextPageButton = ((this.state.properties.page * this.state.properties.pageSize) - this.props.data.length) < 0 ?
            <button className={"page-controller"} onClick={this.nextPage}>Next Page</button> : null;
        let prevPageButton = this.state.properties.page !== 1 ?
            <button className={"page-controller"} onClick={this.prevPage}>Prev Page</button> : null;
        let sortedData = this.sortBy(this.state.properties.sortBy);

        return (
            <div>
                <EmployersTable className={"ReactTable"} properties={this.state.properties} employers={sortedData} setSortBy={this.setSortBy}/>
                {nextPageButton}
                {prevPageButton}
            </div>
        )
    }
}


export {Table}

