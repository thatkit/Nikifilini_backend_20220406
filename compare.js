const validProps = Object.keys(require('./valid'))
const invalidProps = Object.keys(require('./invalid'))

const commonProps = []
const validOnlyProps = []

validProps.forEach(prop => {
    invalidProps.includes(prop)
        ? commonProps.push(prop)
        : validOnlyProps.push(prop)
})

console.log('commonProps:', commonProps)
console.log('validOnlyProps:', validOnlyProps)