const budgetForm = document.getElementById('budget-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const typeInput = document.getElementById('type');
const transactionList = document.getElementById('transaction-list');
const totalIncomeElement = document.getElementById('total-income');
const totalExpensesElement = document.getElementById('total-expenses');
const balanceElement = document.getElementById('balance');

let transactions = [];

budgetForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const description = descriptionInput.value;
    const amount = parseFloat(amountInput.value);
    const type = typeInput.value;

    if (description && !isNaN(amount)) {
        transactions.push({ description, amount, type });
        updateTransactions();
        updateSummary();
        clearForm();
    }
});

function updateTransactions() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${transaction.description}</span>
            <span>$${transaction.amount}</span>
            <span>${transaction.type}</span>
        `;
        transactionList.appendChild(listItem);
    });
}

function updateSummary() {
    const totalIncome = transactions
        .filter(transaction => transaction.type === 'income')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const totalExpenses = transactions
        .filter(transaction => transaction.type === 'expense')
        .reduce((total, transaction) => total + transaction.amount, 0);

    const balance = totalIncome - totalExpenses;

    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpensesElement.textContent = totalExpenses.toFixed(2);
    balanceElement.textContent = balance.toFixed(2);
}

function clearForm() {
    descriptionInput.value = '';
    amountInput.value = '';
    typeInput.value = 'income';
}

updateTransactions();
updateSummary();
