export function renderTemplate(templateAsString, data) {
    const pattern = /{{(.+?)}}/gm;
    return templateAsString.replace(pattern, (match, propName)=> {
        return data[propName];
    })
}