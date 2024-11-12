# Payment Gateway Integration in Node.js and React
This project integrates multiple payment gateways into a web application using Node.js (with TypeScript) for the backend and React for the frontend. The payment gateways integrated are:

* Esewa
* Khalti
* Stripe

## Features
* Esewa Integration: A popular payment gateway in Nepal, enabling users to pay via Esewa.
* Khalti Integration: Another Nepalese payment gateway that allows users to make payments through Khalti.
* Stripe Integration: International payment gateway that supports various payment methods, including credit cards, debit cards, and digital wallets.
## Project Structure
```bash
/project-root
│
├── /server
│   ├── src/controllers  # Payment gateway controllers (eSewa, Khalti, Stripe)
│   ├── src/routes      # API routes
│   ├── index.ts    # Express.js server
│   └── .env         # Environment variables (API keys)
│
└── /client
    └── App.jsx      # Main App component
```

## Setup
### Prerequisites
- Node.js (v18.x or later)
- npm or yarn
- Stripe, Esewa, and Khalti account credentials
You will need your secret key for Esewa, khalti and stripe.

**1. Clone the Repository**
```bash
git clone https://github.com/Sujan167/Payment-gateway-integration.git
cd payment-gateway-integration
```
**2. Install Backend Dependencies**
Navigate to the backend directory and install the necessary dependencies:
```bash
cd server
npm install
```
**For Frontend (React)**
Navigate to the frontend directory.
Run the following command to install all dependencies.
```bash
cd client
npm install
```

**3. Configure API Keys**
Each payment gateway requires API keys or credentials to interact with their services.

* **eSewa**

Sign up for eSewa merchant API here.
Configure your Merchant Code and API Key.

* **Khalti**

Create a Khalti Merchant account here.
Get your API Key.

* **Stripe**

Create a Stripe account here.
Get your Publishable Key and Secret Key.


**4. Environment Variables**
Create a .env file in the root of your backend directory and add the following values:
- PORT=
- KHALTI_SECRET_KEY=
- ESEWA_SECRET_KEY=
- STRIPE_PRIVATE_KEY=

**5. Run the Project**
* For Backend (Node.js):
```bash
cd server
npm run dev
```
This should start the backend server, usually running on http://localhost:3000 (or whatever port is configured in your server.ts).

* For Frontend (React):
To run the frontend app:
```bash
cd client
npm run dev
```
## Backend Routes
* POST /api/payment-gateway/esewa: Initiates an eSewa payment.
* POST /api/payment-gateway/khalti: Initiates a Khalti payment.
* POST /api/payment-gateway/stripe: Initiates a Stripe payment.

# License
This project is licensed under the MIT License - see the LICENSE file for details.
