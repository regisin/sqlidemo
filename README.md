# sqlidemo
Simple web app for SQL injection demonstration.

## Installation

1. Requirements  
Install NodeJS + NPM from [https://nodejs.org/en/](https://nodejs.org/en/).

2. Download source-code  
`git clone https://github.com/regisin/sqlidemo`

3. Install dependencies  
```
cd sqlidemo
npm i
```

## Usage

Open a terminal window and `cd` into the `sqlidemo` folder and run the app `node app.js`. This is a simple webapp, so the terminal won't give you any feedback. Wait a few seconds and open a web browser and navigate to `localhost:3000`.

The app has 2 endpoints:
1. `/`: with a search form
2. `/login`: with a simple login form

Each time you submit a form, the console will log the form data and the formatted query that it will execute.

## Example

In the search form, submit the following search terms to check the different results that the SQL injection yields:

    broom

    broom'; -- 

    broom' UNION SELECT * FROM products; --

## Credits
Code adapted from [https://www.codingame.com/playgrounds/154/sql-injection-demo/sql-injection](https://www.codingame.com/playgrounds/154/sql-injection-demo/sql-injection).