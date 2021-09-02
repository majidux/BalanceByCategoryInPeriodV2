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

const start = new Date("2021-04-05");
const end = new Date("2021-04-07");

const handleFilterByTime = ({ mainArr = [], start, end }) => {
  return mainArr.filter((item) => {
    const date = new Date(item.time);
    return date >= start && date <= end;
  });
};

console.log(handleFilterByTime({ mainArr: transactions, start, end }));

const handleConvertArrayToObject = ({ arr = [] }) => {
  return Object.assign({}, ...arr.map((object) => object));
};

const handleFilterArrayBasedOnAnotherArray = ({
  mainArr = [],
  key,
  calculator,
}) => mainArr.filter((i) => i[calculator] === key);

const handleFilterArrayByKey = ({ mainArr = [], key, calculator }) => {
  return {
    [key]: mainArr
      .map((mainItem) => mainItem[calculator])
      .reduce((accumulator, currentValue) => accumulator + currentValue, 0),
  };
};

const handleIterate = ({ mainArr = [], secondArr, calculator }) => {
  return handleConvertArrayToObject({
    arr: mainArr.map((item) =>
      handleFilterArrayByKey({
        mainArr: handleFilterArrayBasedOnAnotherArray({
          mainArr: secondArr,
          key: item,
          calculator: "category",
        }),
        calculator: calculator,
        key: item,
      })
    ),
  });
};

const getBalanceByCategoryInPeriod = (
  transactions = [],
  categories = [],
  start,
  end
) => {
  return handleIterate({
    calculator: "amount",
    mainArr: categories,
    secondArr: handleFilterByTime({ mainArr: transactions, start, end }),
  });
};

const res = getBalanceByCategoryInPeriod(
  transactions,
  ["sports", "entertainment"],
  start,
  end
);

console.log(res);
