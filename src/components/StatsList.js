import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

import style from '../../res/styles/styles.scss';

class StatsList extends Component {
    constructor(props) {
        super(props);

        this.sort = this.sort.bind(this);
        this.buildHeader = this.buildHeader.bind(this);

        this.state = {
            data: [],
            sortedCol: "",
            decending: true
        };
    }

    componentDidMount() {
        let { 
            stats,
            sortBy
        } = this.props;

        this.setState({
            data: stats,
            sortedCol: sortBy
        });
    }

    sort(columnId) {
        let { 
            data, 
            decending,
            sortedCol
        } = this.state;
        let newOrder = sortedCol === columnId ? !decending : true
        let sortedData = data.sort( (a, b) => {
            if (a[columnId] > b[columnId]) {
                return newOrder ? 1 : -1;
            } else if (a[columnId] < b[columnId]) {
                return newOrder ? -1 : 1;
            } else {
                return 0;
            }
        });

        this.setState({
            data: sortedData,
            sortedCol: columnId,
            decending: newOrder
        })
    }

    buildHeader() {
        const { 
            schema,
            sortable
        } = this.props;
        const { 
            decending,
            sortedCol
        } = this.state;

        const columns = schema.map( column => {
            if (sortable) {
                let sortClass = "";
                if (column.id === sortedCol) {
                    sortClass = decending ? style.decendingSort : style.ascendingSort;
                }
                return (
                    <th key={column.id} onClick={() => this.sort(column.id)}>
                        <span className={style.sortable}>{column.display}<i className={sortClass} /></span>
                    </th>);
            } else {
                return <th key={column.id}>{column.display}</th>
            }
        });

        return (
            <thead>
                <tr>
                    { columns }
                </tr>
            </thead>
        );
    }

    buildBody() {
        const { schema } = this.props;
        let { data } = this.state;

        let rows = data.map( (statObj, index) => {
            let cells = schema.map( column => {
                return <td key={`${column.id}-value`}>{statObj[column.id]}</td>;
            });
            return <tr key={`statsRow-${index}`}>{cells}</tr>
        })
        return (
            <tbody>
                { rows }
            </tbody>
        );
    }

    render() {
        return (
            <Table striped bordered hover>
                { this.buildHeader() }
                { this.buildBody() }
           </Table>
        );
    }
}

StatsList.propTypes = {
    schema: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        attribute: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.shape({
                concat: PropTypes.arrayOf(PropTypes.string)
            })
        ]).isRequired,
        display: PropTypes.string
    })).isRequired,
    stats: PropTypes.array,
    sortable: PropTypes.bool,
    sortBy: PropTypes.string
}

StatsList.defaultProps = {
    stats: [],
    sortable: false,
    sortBy: ""
};

export default StatsList;