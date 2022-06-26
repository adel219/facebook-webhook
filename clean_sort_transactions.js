

const transactions = [
  {
    "id": 3,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:34:30.000Z"
  },
  {
    "id": 1,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:00.000Z"
  },
  {
    "id": 6,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:05.000Z"
  },
  {
    "id": 4,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:36:00.000Z"
  },
  {
    "id": 2,
    "sourceAccount": "A",
    "targetAccount": "B",
    "amount": 100,
    "category": "eating_out",
    "time": "2018-03-02T10:33:50.000Z"
  },
  {
    "id": 5,
    "sourceAccount": "A",
    "targetAccount": "C",
    "amount": 250,
    "category": "other",
    "time": "2018-03-02T10:33:00.000Z"
  }
]

const findDuplicateTransactions = async (transactions = []) => {
  try {

    const categories = []
    transactions.map(tran => !categories.find(cat => cat.category === tran.category) ? categories.push({ category: tran.category, items: [] }) : false)
    
    categories.map(cat => cat.items.push(...transactions.filter(tran => cat.category === tran.category)))
    
    categories.map(cat => cat.items.sort( (a,b) => { return new Date(a.time) - new Date(b.time)} ))

    const sortedTransactions = []
    categories.map(cat => sortedTransactions.push(cat.items))
    
    return sortedTransactions
  } catch (err) {
    console.log(err);
  }
};

findDuplicateTransactions(transactions);