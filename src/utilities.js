
const substituteValueFromObj = (obj, value) => {
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

const formatDataListToSchema = (schema, data) => {
    let formattedData = [];
    
    data.forEach( entryData => {
        let formattedEntry = {};
        schema.forEach( obj => {
            let calculatedValue = '';
            const attribute = obj.attribute;

            if (typeof attribute === 'string') {
                calculatedValue = entryData[attribute];
            } else if (attribute.hasOwnProperty('concat')) {
                let replcaed = attribute.concat.map( entry => {
                    if (entry.includes('${')) {
                        let attrName = entry.substring(2, entry.length-1);
                        return entryData[attrName];
                    } else {
                        return entry;
                    }
                });
                calculatedValue = replcaed.join('');
            } else if (attribute.hasOwnProperty('calculate')) {
                let substitutedValues = substituteValueFromObj(entryData, attribute.calculate);
                calculatedValue = eval(substitutedValues);
            }
    
            formattedEntry[obj.id] = calculatedValue;
        });
        formattedData.push(formattedEntry);
    });

    return formattedData;
}

export default formatDataListToSchema;