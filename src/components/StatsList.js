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
                let cellData = this.calcualteCellData(statObj, column.attribute);
                return <td key={`${column.id}-value`}>{cellData}</td>;
            });
            return <tr key={`statsRow-${index}`}>{cells}</tr>
        })
        return (
            <tbody>
                { rows }
            </tbody>
        );
    }

    substituteValueFromObj(obj, value) {
        let initialValue = value;
        const numAttrs = (initialValue.match(/{/g) || []).length;
        for (let i=0; i<numAttrs; i++) {
            const start = initialValue.indexOf('$');
            const end = initialValue.indexOf('}');
            const attrName = initialValue.substr(start + 2, end - start - 2);
            const replaceStr = initialValue.substr(start, end - start + 1);
            initialValue = initialValue.replace(replaceStr, obj[attrName]);
        }
        return initialValue;
    }

    calcualteCellData(data, attribute) {
        let value = '';

        if (typeof attribute === 'string') {
            value = data[attribute];
        } else if (attribute.hasOwnProperty('concat')) {
            let replcaed = attribute.concat.map( entry => {
                if (entry.includes('${')) {
                    let attrName = entry.substring(2, entry.length-1);
                    return data[attrName];
                } else {
                    return entry;
                }
            });
            value = replcaed.join('');
        } else if (attribute.hasOwnProperty('calculate')) {
            let substitutedValues = this.substituteValueFromObj(data, attribute.calculate);
            return eval(substitutedValues);
        }
            
        return value;
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