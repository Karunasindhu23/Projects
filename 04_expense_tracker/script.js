document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

  let totalPrice = calculateTotalAmount();

  renderExpences();
  updateTotal()

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount,
      };
      expenses.push(newExpense);
      saveExpenseTolocal();
      renderExpences();
      updateTotal();

      //clear Input
      expenseNameInput.value = ''
      expenseAmountInput.value = ''
    }
  });

  function renderExpences() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
            ${expense.name} - ₹${expense.amount}
            <button data-id ="${expense.id}">Delete</button>
            `;
      expenseList.appendChild(li);
    });
  }

  function saveExpenseTolocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }

  function calculateTotalAmount() {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  function updateTotal() {
    totalPrice = calculateTotalAmount();

    totalAmountDisplay.textContent = totalPrice.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const expenseId = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== expenseId);
      saveExpenseTolocal();
      renderExpences();
      updateTotal();
    }
  });
});