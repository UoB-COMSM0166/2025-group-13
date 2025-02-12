# 🚀 Deploy p5.js to GitHub Pages with GitHub Actions

This repository contains a **GitHub Actions workflow** that automatically deploys a **p5.js** project to **GitHub Pages** whenever changes are pushed to the `main` branch.

---

## 🌍 Live Website  
Once deployed, the project will be available at:  
```
https://uob-comsm0166.github.io/2025-group-13/
```


---

## 📌 How It Works

### **1️⃣ Workflow Trigger**
- The workflow runs **automatically** when you **push changes to the `main` branch**.  
- It executes the deployment process **via GitHub Actions**.

### **2️⃣ Workflow Steps**
1. **Check out repository** – Downloads the latest code.  
2. **Deploy to GitHub Pages** – Uses `JamesIves/github-pages-deploy-action@v4` to publish the site.  

---

## 📜 GitHub Actions Workflow (`.github/workflows/deploy.yml`)

```yaml
name: Deploy p5.js to GitHub Pages

on:
  push:
    branches:
      - main  # Runs when you push to main

permissions:
  contents: write  # Needed for GitHub Pages deployment

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
        with:
          branch: gh-pages  # Deploys to GitHub Pages branch
          folder: .
```

---

## 🔍 Explanation of Workflow

### **📂 1. Check out Repository**
```yaml
      - name: Checkout Repository
        uses: actions/checkout@v4
```
- This **fetches your repository’s code** into the GitHub Actions environment.  
- Allows the workflow to access files needed for deployment.  

### **🚀 2. Deploy to GitHub Pages**
```yaml
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@v4
```
- Uses a **pre-built action** to deploy files to **GitHub Pages**.  

### **📌 3. Specify Deployment Branch**
```yaml
        with:
          branch: gh-pages  # Deploys to GitHub Pages branch
```
- **Deploys to `gh-pages`**, which is the default branch for GitHub Pages.  
- If `gh-pages` does not exist, the action will **create it automatically**.  

### **📁 4. Define Deployment Folder**
```yaml
          folder: . 
```
- `.` (dot) means **deploy everything in the root folder**.  
---


## 🚀 How to Deploy

1. **Make Changes** to the project files
2. **Commit and Push** to the `main` branch  
3. **GitHub Actions will run automatically**  
4. **To see the deployed project visit the website at:**  
   ```
   https://uob-comsm0166.github.io/2025-group-13/
   ```

---

## 🛠 Troubleshooting

| Issue | Solution |
|--------|-----------|
| Workflow didn't trigger | Ensure files are **pushed to `main`**, not another branch |
| Site not updating | Clear **browser cache** or check **GitHub Pages settings** |
| Files missing | Check the `folder:` path in the workflow |

---
