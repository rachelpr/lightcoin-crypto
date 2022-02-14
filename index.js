//let balance = 500.00;

class Account {
  constructor(username) {
    this.username = username
    //this.balance = 0;
    this.transactions = []
  }
  get balance() {
    //Calculate the balance using the transaction objects
    let balance = 0;
    for (let activity of this.transactions) {
      balance += activity.value
    }
    return balance
  }

  addTransaction(transation) {
    this.transactions.push(transation)
  }
}

class Transaction {
  constructor(amount, account) {
    this.amount = amount;
    this.account = account
  }
  commit() {
    //this.account.balance += this.value
    if (!this.isAllowed()) {
      return false;
    } else {
      //Keep track of the time of the transaction
      this.time = new Date();

      //Add the transaction to the account
      this.account.addTransaction(this);
      return true;
    }
  }
}

class Desposit extends Transaction {
  get value() {
    return this.amount
  }
  isAllowed() {
    //Desposits should always be allowed
    return true;
  }
}

class Withdrawal extends Transaction {

  get value() {
    return -this.amount;
  }
  //Checking is withdrawal is allowed based on balance amount
  isAllowed() {
    if (this.account.balance - this.amount >= 0) {
      return true;
    }
  }
}




// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("rachelpr");
console.log("Starting balance:", myAccount.balance)

const t2 = new Withdrawal(50.25, myAccount);
console.log("Commit result:", t2.commit())

console.log("Account balance:", myAccount.balance)
const t1 = new Desposit(120.00, myAccount);
console.log("Commit result:", t1.commit())
console.log("Account balance:", myAccount.balance)

const t3 = new Withdrawal(9.99, myAccount);
console.log("Commit result:", t3.commit())

console.log("Final balance:", myAccount.balance);
