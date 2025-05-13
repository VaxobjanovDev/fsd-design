# FSD Design Starter

A robust and opinionated starter project for building web applications following the Feature-Sliced Design (FSD) methodology, pre-configured with essential tools and technologies for a modern development workflow.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Project Structure (FSD)](#project-structure-fsd)
- [API Requests (TanStack Query & Axios)](#api-requests-tanstack-query--axios)
- [Styling (Tailwind CSS)](#styling-tailwind-css)
- [Code Quality (TypeScript & ESLint)](#code-quality-typescript--eslint)
- [Contributing](#contributing)
- [License](#license)

### 📁 Folder Structure

```
src/
├── app/          # Application-specific logic (routing, store setup, global styles)
├── pages/        # Page-level components (compose widgets and features)
├── widgets/      # Independent UI blocks with state and logic (compose entities and features)
├── features/     # User-facing features with business value (use entities and shared)
├── entities/     # Domain-specific objects and their logic (independent)
└── shared/       # Reusable low-level utilities, UI components, constants, configs (independent)
```

## About

This project serves as a starting point for developers who want to build well-structured and maintainable web applications using the Feature-Sliced Design (FSD) approach. It comes bundled with a powerful set of technologies to enhance developer experience and application performance.

## Features

* **Feature-Sliced Design (FSD):** Organized project structure based on features, slices, and layers for improved scalability and maintainability.
* **Tailwind CSS:** Utility-first CSS framework for rapid and flexible UI development.
* **TypeScript:** Strongly-typed language for enhanced code quality and developer productivity.
* **ESLint:** Pluggable linting utility for identifying and reporting on patterns in JavaScript and TypeScript code.
* **TanStack Query (React Query):** Powerful asynchronous state management library for fetching, caching, synchronizing, and updating server state.
* **Axios:** Promise-based HTTP client for making API requests.
* **Pre-configured Setup:** Get started quickly with integrated tooling.

## Technologies Used

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [ESLint](https://eslint.org/)
* [TanStack Query (React Query)](https://tanstack.com/query/latest)
* [Axios](https://axios-http.com/)
* [Vite](https://vitejs.dev/) (Example build tool)

## Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

Make sure you have the following installed:

* Node.js (v14 or higher recommended)
* npm or yarn

### Installation

1.  Clone the repository:

    ```bash
    git clone [https://github.com/VaxobjanovDev/fsd-design.git](https://github.com/VaxobjanovDev/fsd-design.git)
    ```

2.  Navigate to the project directory:

    ```bash
    cd fsd-design
    ```

3.  Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

To start the development server:

```bash
npm run dev
# or
yarn dev
