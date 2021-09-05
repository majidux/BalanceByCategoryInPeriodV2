const transactions = [
  {
    id: "2498e871-0552-4172-9fde-7660410e0c17",
    sourceAccount: "my_account",
    targetAccount: "restaurant",
    amount: -2100,
    currency: "EUR",
    category: "eating_out",
    time: "2021-02-05T01:06:58.198Z",
  },
  {
    id: "bcaee2ae-6915-4b19-8a42-ac13b910292b",
    sourceAccount: "my_account",
    targetAccount: "bowling_alley",
    amount: -5900,
    currency: "EUR",
    category: "sports",
    time: "2021-02-13T18:29:19.035Z",
  },
  {
    id: "51f5f7ad-0d09-49d6-a3e7-d4c795c98a4e",
    sourceAccount: "my_account",
    targetAccount: "restaurant",
    amount: -1200,
    currency: "EUR",
    time: "2021-03-22T09:10:06.391Z",
  },
];

class CategorizeSimilarTransactions {
  constructor() {
    this.transactions = [];
    this.withCategory = [];
    this.smallest = [];
  }

  findSimilarTransactions = (item) => {
    return this.smallest.find(
      (innerItem) =>
        innerItem.targetAccount === item.targetAccount &&
        this.handleMakeAbsoluteNumber(item.amount - innerItem.amount) < 1000
    );
  };

  handleMakeAbsoluteNumber = (number) => {
    return Math.abs(number);
  };

  handleFindSmallestTransactions = () => {
    return this.transactions
      .filter(({ category }) => category)
      .sort(
        (lhs, rhs) =>
          this.handleMakeAbsoluteNumber(lhs.amount) -
          this.handleMakeAbsoluteNumber(rhs.amount)
      )
      .reduce((total, next) => {
        if (!total.map((i) => i.targetAccount).includes(next.targetAccount)) {
          return [...total, next];
        }
        return total;
      }, []);
  };

  categorizeSimilarTransactions = (transactions = []) => {
    this.transactions = transactions;
    this.withCategory = transactions.filter(({ category }) => category);
    this.smallest = this.handleFindSmallestTransactions();
    return this.transactions.map((item) => {
      const similarTransaction = this.findSimilarTransactions(item) || {};
      if (!item.category) {
        return {
          ...item,
          ...(similarTransaction.category && {
            category: similarTransaction.category,
          }),
        };
      }
      return item;
    });
  };
}

const categorizeSimilarTransactions =
  new CategorizeSimilarTransactions().categorizeSimilarTransactions(
    transactions
  );

console.log(categorizeSimilarTransactions);
