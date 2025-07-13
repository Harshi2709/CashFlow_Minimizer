# 💰 Cashflow Minimizer

An interactive web application to generate and optimize cashflow networks between multiple entities using the **Ford-Fulkerson algorithm**. This project visualizes the original and minimized cashflow through directed graphs.

---

## 📌 Overview

The **Cashflow Minimizer** allows users to:
- Generate a random directed graph representing cash transactions.
- Visualize initial debts between multiple individuals.
- Minimize the total number of transactions required to settle all debts.
- View optimized results using graph theory.

This project combines **data structures**, **graph algorithms**, and **web development** to create an educational and practical tool for understanding cashflow minimization.

---

## 🎯 Features

- 🔀 Random directed graph generation
- 🧠 Cashflow optimization using the Ford-Fulkerson algorithm
- 📊 Graph visualization using [vis.js](https://visjs.org/)
- 💻 Responsive, user-friendly interface
- 🎨 Stylish frontend with HTML, CSS, and Bootstrap

---

## ⚙️ Technologies Used

- **HTML5** – Structure of the web app  
- **CSS3** & **Bootstrap** – Styling and layout  
- **JavaScript** – Logic for graph generation and algorithm implementation  
- **vis.js** – Visualization of graphs

---

## 🧠 Algorithm: Ford-Fulkerson

The application uses the **Ford-Fulkerson method** to find the maximum flow (which corresponds to minimum cashflow transactions). It:
- Calculates net amount owed by each person
- Minimizes the number of transactions to settle all balances
- Outputs an optimized graph

---

## 🚀 How to Run Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Harshi2709/CashFlow_Minimizer.git

