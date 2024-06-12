# My-App

Welcome to My-App, a React-based application designed to provide a seamless registration and login experience, followed by a dynamic item management system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js
- npm

### Installation

To set up the project, run the following commands in your terminal:

```bash
npx create-react-app my-app
cd my-app
npm start
````
This will initialize a new React project using Create React App and start the development server.

## Adding Dependencies
Install react-router-dom to handle routing in your application:

```bash
npm i react-router-dom
````

## Project Structure

After installation, take a moment to observe the structure of files and folders arranged in the repository and arrange them accordingly to maintain a clean and organized codebase.

## Usage

To start the application, run:
```bash
npm start
````
By default, the app opens at localhost:3000. If this port is already in use, the system will prompt you to use an alternative port.

## Registration Page
The starting page is the Registration Page, where new users can register by providing a username, email, and password. If the username is already taken, the system will prompt you to choose a different one.

## Login Page
After registration, users are directed to the Login Page. Here, you can log in with your username and password credentials.

## Landing Page
Upon successful login, you will be redirected to the Landing Page. This page features an array of items displayed in a list format, offering the following functionalities:
- **Add Item:** Introduce new items to the list.
- **Delete Item:** Remove items from the list.
- **Modify Item:** Edit the details of existing items.

## Filtering and Sorting
Enhance your view by applying filters and sorting mechanisms:

- **Filter:**  Narrow down the list by name or category.
- **Sort:** Organize the list in ascending or descending order by name, category, or date.

