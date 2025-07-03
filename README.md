
# 🧪 Playwright + TypeScript Automation Framework

This project is a test automation framework built using:

- [Playwright](https://playwright.dev/) for browser automation
- [TypeScript](https://www.typescriptlang.org/) for type safety and cleaner code

---

## 📁 Project Structure

```
project-root/
├── tests/                  # spec files test
│   ├── fixture/            # Test data and functions
│
├── playwright.config.ts    # Playwright config
├── package.json            # NPM scripts and dependencies
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Shiwani-droid/test-the-progress.git
```
### 3. Install Dependencies
make sure .env file available with username and password at root level of project
user `user` and `pas` and provide value
example: user=test@gmail.com
         pas=yourpasswordvalue

### 4. Install Dependencies

```bash
npm install
```

### 5. Run Tests

```bash
npx playwright test
```

> Add `--tags @yourtag` to filter tests by tag.
