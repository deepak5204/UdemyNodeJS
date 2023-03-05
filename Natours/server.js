const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

const x = 26;
x=66;