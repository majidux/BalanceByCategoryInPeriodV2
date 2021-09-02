class BalanceCalculator {
  constructor(transactions, categories, start, end) {
    this.transactions = transactions;
    this.categories = categories;
    this.start = start;
    this.end = end;
  }

  handleFilterByTime = () => {
    return this.transactions.filter((item) => {
      const date = new Date(item.time);
      start.setUTCHours(0, 0, 0);
      date.setUTCHours(0, 0, 0);
      end.setUTCHours(23, 59, 59);
      return (
        date.getUTCDate() >= start.getUTCDate() &&
        date.getUTCDate() <= end.getUTCDate()
      );
    });
  };

  handleConvertArrayToObject = ({ arr = [] }) => {
    return Object.assign({}, ...arr.map((object) => object));
  };

  handleFilterArrayBasedOnAnotherArray = ({ key, calculator }) =>
    this.handleFilterByTime().filter((i) => i[calculator] === key);

  handleFilterArrayByKey = ({ mainArr = [], key, calculator }) => {
    return {
      [key]: mainArr
        .map((mainItem) => mainItem[calculator])
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
    };
  };

  handleIterate = ({ calculator }) => {
    return this.handleConvertArrayToObject({
      arr: this.categories.map((item) =>
        this.handleFilterArrayByKey({
          mainArr: this.handleFilterArrayBasedOnAnotherArray({
            key: item,
            calculator: "category",
          }),
          calculator: calculator,
          key: item,
        })
      ),
    });
  };

  getBalanceByCategoryInPeriod = () => {
    return this.handleIterate({
      calculator: "amount",
    });
  };
}

const start = new Date("2021-04-05");
const end = new Date("2021-04-09");
const transactions = [
  {
    id: "11ff73b5-e771-441c-886a-498d93b5093d",
    sourceAccount: "my_account",
    targetAccount: "book_store",
    amount: -9600,
    currency: "EUR",
    category: "entertainment",
    time: "2021-04-08T05:15:56.905Z",
  },
  {
    id: "8c3ec38d-1821-4d49-aef1-2385cb3c2b1b",
    sourceAccount: "my_account",
    targetAccount: "cinema",
    amount: -5700,
    currency: "EUR",
    category: "sports7",
    time: "2021-04-07T01:16:57.819Z",
  },
  {
    id: "d1c77d7c-ccda-453c-ac01-444e9d5abca3",
    sourceAccount: "my_account",
    targetAccount: "book_store",
    amount: -7300,
    currency: "EUR",
    category: "entertainment",
    time: "2021-04-07T22:46:44.071Z",
  },
  {
    id: "837127ab-f523-4b11-bed3-ae488be4545d",
    sourceAccount: "my_account",
    targetAccount: "fitness_club",
    amount: -9200,
    currency: "EUR",
    category: "sports",
    time: "2021-04-05T01:55:16.646Z",
  },
];

const obj = new BalanceCalculator(
  transactions,
  ["sports", "entertainment"],
  start,
  end
);

const res = obj.getBalanceByCategoryInPeriod();

console.log(res);
