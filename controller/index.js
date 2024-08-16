const Ajv = require('ajv');
const ajv = new Ajv();

const schema = require('./json-schema.json');
const data = require('./json/user.json');

const validate = ajv.compile(schema);
const valid = validate(data);

if (!valid) console.log(validate.errors);
else console.error("JSON data is valid!");
