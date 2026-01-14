
# Rules Debugging UI

A modern **React-based rules debugging and transaction analysis dashboard** designed to help teams **inspect, evaluate, and understand rule execution** on transactional data.
The application provides a clear, interactive interface to explore transactions, feature vectors, rule outcomes, and severity-based alerts in real time.


## 🚀 Features

### 🔍 Rule Evaluation & Debugging

* Evaluate complex business rules against transactions
* View pass/fail outcomes per rule
* Expand rules to inspect conditions, thresholds, and logic
* Filter rules by **severity** and **search keywords**

### 💳 Transaction Exploration

* Paginated transaction list with smooth navigation
* Quick selection to inspect transaction details
* Scroll-to-top behavior on page change
* Direct page number input for fast navigation
* Clear visibility of **record ranges (X–Y of Z)**

### 📊 Visual Analytics

* Charts showing:

* Transactions grouped by type
* Rule outcome distributions
* Instant updates based on selected transaction and rules

### 🧠 Feature Vector Inspection

* Inspect feature vectors associated with each transaction
* Understand why a rule passed or failed
* Transparent debugging for decision logic

### 🧩 Modular Architecture

* Fully reusable and composable React components
* Strong separation of concerns (data, rules, UI)
* Easy to extend with new rules, charts, or data sources


## 🛠️ Technology Stack

### Core Technologies

* **React 19+** – Modern React with hooks and concurrent features
* **TypeScript** – End-to-end type safety
* **Vite** – Fast dev server and optimized builds

### UI & Styling

* **Tailwind CSS** – Utility-first, consistent design system
* **Lucide React** – Lightweight, modern icon set

### Development & Quality

* **ESLint** – Code quality and consistency
* **Vitest** – Fast unit testing
* **TypeScript ESLint** – Type-aware linting rules


## 📋 Prerequisites

Before running the project, make sure you have:

* **Node.js** ≥ 18
* **npm** ≥ 8 or **yarn**
* **React** ≥ 19


## 🚀 Installation

```bash
npm install
# or
yarn install
```


## 🏗️ Project Structure

```
src/
├── components/          # Dashboard & UI components
├── data/                # Sample transactions, rules & features
├── types/               # TypeScript type definitions
├── utils/               # Rule evaluation & data helpers
```


## 🔧 Development

### Local Setup

```bash
git clone https://github.com/uzairshah866/rule-debugging
cd rule-debugging

npm install
npm run dev
```

### Available Scripts

* `npm run dev` – Start Vite development server
* `npm run build` – Production build
* `npm run preview` – Preview production build
* `npm run lint` – Run ESLint checks


## 🎯 Use Cases

* Rule engine debugging & validation
* Fraud detection rule analysis
* Compliance and risk rule inspection
* Explainable decision systems
* Internal tooling for analysts & engineers


Happy Building & Debugging! 
