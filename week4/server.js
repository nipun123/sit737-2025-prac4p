const express = require('express');
const app = express();
const winston = require('winston');

app.use(express.json());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'calculator-microservice' },
  transports: [
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
    new winston.transports.File({ filename: 'logs/error.log', level:
          'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
  ], });

app.get('/add', (req, res) => {
  const { num1, num2 } = req.query;
  const operation = "add";

  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both num1 and num2 are required." });
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  logger.log({
    level: 'info',
    message: `New ${operation} operation requested: ${num1} ${operation}
 ${num2}`,
  });

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Invalid numbers." });
  }

  const result = n1 + n2;
  res.json({ result });
});


app.get('/subtract', (req, res) => {
  const { num1, num2 } = req.query;

  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both num1 and num2 are required." });
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Invalid numbers." });
  }

  const result = n1 - n2;
  res.json({ result });
});


app.get('/multiply', (req, res) => {
  const { num1, num2 } = req.query;

  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both num1 and num2 are required." });
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Invalid numbers." });
  }

  const result = n1 * n2;
  res.json({ result });
});


app.get('/divide', (req, res) => {
  const { num1, num2 } = req.query;

  if (!num1 || !num2) {
    return res.status(400).json({ error: "Both num1 and num2 are required." });
  }

  const n1 = parseFloat(num1);
  const n2 = parseFloat(num2);

  if (isNaN(n1) || isNaN(n2)) {
    return res.status(400).json({ error: "Invalid numbers." });
  }

  if (n2 === 0) {
    return res.status(400).json({ error: "Cannot divide by zero." });
  }

  const result = n1 / n2;
  res.json({ result });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});