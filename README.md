<div id="top" align="center">

<h1>E-COMMERCE_PROJECT</h1>
<p><em>Transforming Commerce, Empowering Growth Everywhere</em></p>

<img alt="last-commit" src="https://img.shields.io/github/last-commit/rahulsr-ai/e-commerce_Project?style=flat&logo=git&logoColor=white&color=0080ff" />
<img alt="repo-top-language" src="https://img.shields.io/github/languages/top/rahulsr-ai/e-commerce_Project?style=flat&color=0080ff" />
<img alt="repo-language-count" src="https://img.shields.io/github/languages/count/rahulsr-ai/e-commerce_Project?style=flat&color=0080ff" />

<p><em>Built with the tools and technologies:</em></p>

<img alt="JSON" src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" />
<img alt="Markdown" src="https://img.shields.io/badge/Markdown-000000.svg?style=flat&logo=Markdown&logoColor=white" />
<img alt="npm" src="https://img.shields.io/badge/npm-CB3837.svg?style=flat&logo=npm&logoColor=white" />
<img alt="Mongoose" src="https://img.shields.io/badge/Mongoose-F04D35.svg?style=flat&logo=Mongoose&logoColor=white" />
<img alt="PostCSS" src="https://img.shields.io/badge/PostCSS-DD3A0A.svg?style=flat&logo=PostCSS&logoColor=white" />
<img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" />
<br />
<img alt="React" src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" />
<img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" />
<img alt="Stripe" src="https://img.shields.io/badge/Stripe-635BFF.svg?style=flat&logo=Stripe&logoColor=white" />
<img alt="ESLint" src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" />
<img alt="Axios" src="https://img.shields.io/badge/Axios-5A29E4.svg?style=flat&logo=Axios&logoColor=white" />

</div>

---

## Table of Contents

* [Overview](#overview)
* [Getting Started](#getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Usage](#usage)
  * [Testing](#testing)

---

## Overview

**E-COMMERCE_PROJECT** is a full‑stack, scalable e‑commerce platform designed to build modern, high‑performance online stores. It follows a clean, modular architecture that makes development, maintenance, and feature expansion straightforward.

The project focuses on real‑world e‑commerce requirements such as authentication, payments, admin management, and reusable UI components, making it suitable for both learning and production‑ready applications.

### Why E-COMMERCE_PROJECT?

This project helps developers quickly build and scale e‑commerce solutions by providing:

* 🎨 **Customizable Styling** – Centralized and responsive styling for a consistent UI across the app.
* 🔧 **Modular API Architecture** – Cleanly structured APIs for products, users, orders, carts, and wishlists.
* 🔒 **Secure Authentication** – Authentication and authorization using modern best practices.
* 📊 **Admin Dashboard** – Manage inventory, orders, and users from a single interface.
* 🚀 **Third‑Party Integrations** – Stripe for payments, MongoDB for data storage, and real‑time‑ready services.
* 🧩 **Reusable Components** – Common e‑commerce features like cart, reviews, profiles, and order tracking.

---

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Make sure you have the following installed on your system:

* **Programming Language:** JavaScript
* **Package Manager:** npm
* **Runtime:** Node.js (recommended LTS version)

### Installation

Clone the repository and install dependencies:

1. **Clone the repository**

   ```sh
   git clone https://github.com/rahulsr-ai/e-commerce_Project
   ```

2. **Navigate to the project directory**

   ```sh
   cd e-commerce_Project
   ```

3. **Install dependencies**

   ```sh
   npm install
   ```

### Usage

Start the development server:

```sh
npm start
```

Once running, open your browser and navigate to the local server URL shown in the terminal.

### Testing

Run the test suite using:

```sh
npm test
```

> Make sure all environment variables (database, authentication, and payment keys) are properly configured before running tests.

---

## Environment Variables

Create a `.env` file in the root of the project and add the following keys:

```env
# MongoDB URIs
MONGO_URI="<your_mongodb_atlas_uri>"
MONGO_COMPASS_URI="mongodb://localhost:27017/TESTAUTH"

# Authentication secrets
NEXTAUTH_SECRET="<your_nextauth_secret>"
JWT_SECRET="<your_jwt_secret>"

# Environment
NODE_ENV="development"

# OAuth credentials
GITHUB_ID="<your_github_client_id>"
GITHUB_SECRET="<your_github_client_secret>"

GOOGLE_CLIENT_ID="<your_google_client_id>"
GOOGLE_CLIENT_SECRET="<your_google_client_secret>"

# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL="<your_supabase_project_url>"
NEXT_PUBLIC_SUPABASE_ANON_KEY="<your_supabase_anon_key>"

# Email service (Gmail)
EMAIL_USER="<your_email_address>"
EMAIL_KEY="<your_email_app_password>"

# Stripe keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="<your_stripe_publishable_key>"
NEXT_STRIPE_KEY="<your_stripe_secret_key>"
```



<div align="left"><a href="#top">⬆ Return to top</a></div>
