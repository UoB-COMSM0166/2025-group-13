## **GitHub Actions: Linting Workflow**

### 🛠️ **Overview**  
This repository uses **GitHub Actions** to automatically **lint and format JavaScript code** whenever changes are pushed to the `develop` branch. This ensures code consistency and prevents errors before merging.  

🔹 **Note:** While GitHub Actions automatically installs Node.js in the workflow, developers working on this project locally must install Node.js and dependencies manually to run ESLint and Prettier before committing their code.  

---

## 🔧 **Workflow Details**  

- **Runs on:**  
  - Pushes to `develop`  
  - Pull requests targeting `develop`  
- **Tools Used:**  
  - [ESLint](https://eslint.org/) – JavaScript linter to catch errors  
  - [Prettier](https://prettier.io/) – Code formatter for consistent style  
- **Checks Performed:**  
  - Installs dependencies (`npm install`)  
  - Runs ESLint to detect issues (`npx eslint . --ext .js,.ts`)  
  - Runs Prettier to check formatting (`npx prettier --check .`)  

---

## 📂 **File Structure**  

```plaintext
├── .github/
│   ├── workflows/
│   │   ├── lint.yml  # GitHub Actions workflow file
│   │   ├── LINT_README.md  # This documentation
├── src/              # p5.js project files
├── package.json      # Node.js project dependencies
├── .eslintrc.json    # ESLint configuration
└── .prettierrc       # Prettier configuration
```

---

## 🚀 **How to Use**  

### **1️⃣ Setup Locally**  
To work with this project locally, ensure **Node.js** is installed. Then, run:  

```bash
npm install
```

### **2️⃣ Run Linter and Formatter Locally**  
Before committing, manually check project code with:  

```bash
npx eslint . --ext .js,.ts
npx prettier --check .
```

### **3️⃣ Fix Formatting Issues Automatically**  
```bash
npx prettier --write .
```

---

## ✅ **Workflow Status**  

The workflow runs automatically on `develop`. Results can be checked in the **Actions** tab of the repository.  

---
