import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';

class StatsList extends PureComponent {
    buildHeader() {
        const { schema } = this.props;
        let columns = schema.map( column => <th key={column.id}>{column.display}</th> );

        return (
            <thead>
                <tr>
                    { columns }
                </tr>
            </thead>
        );
    }

    buildBody() {
        const { schema, stats } = this.props;

        let rows = stats.map( (statObj, index) => {
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
    stats: PropTypes.array
}

StatsList.defaultProps = {
    stats: []
};

export default StatsList;