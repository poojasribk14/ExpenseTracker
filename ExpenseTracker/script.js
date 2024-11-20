// Select DOM elements
const descriptionInput = document.getElementById('expense-description');
const amountInput = document.getElementById('expense-amount');
const addExpenseButton = document.getElementById('add-expense');
const expenseList = document.getElementById('expense-list');
const totalExpenseElement = document.getElementById('total-expense');

let expenses = []; // Array to store expense objects

// Add expense
addExpenseButton.addEventListener('click', () => {
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);

  if (!description || isNaN(amount) || amount <= 0) {
    alert('Please enter valid description and amount.');
    return;
  }

  // Create an expense object and add it to the array
  const expense = { id: Date.now(), description, amount };
  expenses.push(expense);

  // Update the UI
  renderExpenses();
  calculateTotal();

  // Clear input fields
  descriptionInput.value = '';
  amountInput.value = '';
});

// Render expenses on the UI
function renderExpenses() {
  expenseList.innerHTML = ''; // Clear the list
  expenses.forEach(expense => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      ${expense.description} - ₹${expense.amount.toFixed(2)}
      <span class="delete-btn" onclick="deleteExpense(${expense.id})">❌</span>
    `;
    expenseList.appendChild(listItem);
  });
}

// Calculate and display total expense
function calculateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalExpenseElement.textContent = total.toFixed(2);
}

// Delete an expense
function deleteExpense(id) {
  expenses = expenses.filter(expense => expense.id !== id);
  renderExpenses();
  calculateTotal();
}
