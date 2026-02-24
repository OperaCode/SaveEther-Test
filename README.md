# SaveEther Smart Contract 💰

A simple Solidity smart contract that allows users to **deposit and withdraw Ether securely**, while tracking individual savings and contract balance.
This project also includes **Hardhat unit tests** to validate contract behavior.

---

## 📌 Overview

The **SaveEther** contract simulates a basic on-chain savings system where:

* Users can deposit ETH into the contract
* Users can withdraw their saved ETH
* Individual balances are tracked per user
* Contract balance can be queried
* Events are emitted for transparency
* Reverts protect against invalid actions

The project is tested using **Hardhat + Mocha + Chai + Ethers.js**.

---

## ✨ Features

* Deposit Ether into contract
* Withdraw saved Ether
* Prevent zero-value deposits
* Prevent withdrawals beyond balance
* Track user savings
* Query contract total balance
* Event logging for deposits and withdrawals
* Full unit test coverage

---

## 🧱 Smart Contract

### Contract: `SaveEther.sol`

#### State

* `mapping(address => uint256) public balances` — Tracks user savings

#### Events

* `DepositSuccessful(address user, uint256 amount)`
* `WithdrawalSuccessful(address user, uint256 amount)`

#### Functions

| Function                   | Description                        |
| -------------------------- | ---------------------------------- |
| `deposit()`                | Allows user to deposit ETH         |
| `withdraw(uint256 amount)` | Withdraw saved ETH                 |
| `getUserSavings()`         | Returns caller’s saved balance     |
| `getContractBalance()`     | Returns total ETH held by contract |

---

## 🧪 Testing

Tests are written using:

* Hardhat
* Mocha
* Chai
* Ethers.js (v6)

### What is tested

* Successful deposit
* Deposit fails when value = 0
* Successful withdrawal
* Withdrawal fails when insufficient balance
* Withdrawal fails when amount exceeds savings
* Correct user savings tracking
* Correct contract balance

---

## ⚙️ Installation & Setup

Clone repo:

```bash
git clone <your-repo-url>
cd SaveEther
```

Install dependencies:

```bash
npm install
```

Compile contract:

```bash
npx hardhat compile
```

Run tests:

```bash
npx hardhat test
```

---

## 🛠 Tech Stack

* Solidity ^0.8.x
* Hardhat
* Mocha
* Chai
* TypeScript

---

## 📂 Project Structure

```
SaveEther/
│
├── contracts/
│   └── SaveEther.sol
│
├── test/
│   └── SaveEther.ts
│
├── scripts/
│
├── hardhat.config.ts
├── package.json
└── README.md
```

---

## 🔐 Security Considerations

* Prevents zero ETH deposits
* Prevents overdrawing user balance
* Uses `require` for validation
* Uses checks-effects-interactions pattern

---


## 👨‍💻 Author

**Raphael Faboyinde**

Blockchain Developer | Smart Contract Engineer | Web3 Builder

---

## 📜 License

MIT License
