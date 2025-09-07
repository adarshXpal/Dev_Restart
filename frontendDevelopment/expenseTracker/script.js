const balanceEl=document.getElementById("current-balance");
const incomeAmountEl=document.getElementById("income-amount");
const expenseAmountEl=document.getElementById("expense-amount");
const transactionListEl=document.getElementById("transaction-list");
const transactionFormEl=document.getElementById("transaction-form");
const descriptionEl=document.getElementById("description");
const amountEl=document.getElementById("amount");

let transactions=JSON.parse(localStorage.getItem("transactions")) || [];

transactionFormEl.addEventListener("submit",addTransaction);

function addTransaction(e){
    e.preventDefault();
    const description=descriptionEl.value.trim();
    const amount = parseFloat(amountEl.value);
    transactions.push({
        id:Date.now(),
        description,
        amount
    })
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
    descriptionEl.value="";
    amountEl.value="";
}

function updateTransactionList(){
    transactionListEl.innerHTML="";
    const sortedTransactions = [...transactions].reverse();
    sortedTransactions.forEach((transaction)=>{
        const transactionEl=createTransactionElement(transaction);
        transactionListEl.appendChild(transactionEl);
    })
}

function createTransactionElement(transaction){
    const li=document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount>0 ?"income":"expense");
    li.innerHTML=`
        <span>${transaction.description}</span>
        <span>
        ${transaction.amount}
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button> 
        </span>
    `;
    return li;
}
function updateSummary(){
    let balance=0;
    let income=0,expense=0;

    for(let a=0;a<transactions.length;a++){
        // balance+=Array.from(transactions)[a].amount;
        balance+= transactions[a].amount;
        if(transactions[a].amount>0){
            income+=transactions[a].amount;
        }else{
            expense+=transactions[a].amount;
        }
    }
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2,
    });
    balanceEl.textContent = formatter.format(balance);
    incomeAmountEl.textContent = formatter.format(income);
    expenseAmountEl.textContent = formatter.format(-(expense));
}
function removeTransaction(id){
    transactions=transactions.filter(transaction => transaction.id !==id);
    localStorage.setItem("transactions",JSON.stringify(transactions));
    updateTransactionList();
    updateSummary();
}
updateSummary();
updateTransactionList();
