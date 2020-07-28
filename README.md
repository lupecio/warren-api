# Warren Test
Backend using node to create the warren test features.

I had implantation:

* Statement
* Deposit
* Bill
* Withdraw
* Register
* Login

I think I could have done more resources:

* Filter by date
* Investments

## Installation

```sh
yarn
```
or

```sh
npm install
```

Copy .env.example to .env

Create a new database and update .env file

```sh
yarn typeorm migration:run
```

## Usage

```sh
yarn start
```
or

```sh
npm start
```

## Tests

Create a new database and update .env.test file

```sh
yarn test
```
