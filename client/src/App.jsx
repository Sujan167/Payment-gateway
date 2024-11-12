import { useState } from "react";
import axios from "axios";

function App() {
	const [redirectUrl, setRedirectUrl] = useState(null);

	const handleKhaltiPayment = async () => {
		const payload = {
			return_url: "http://localhost:5173/",
			website_url: "http://localhost:5173/",
			amount: "1000",
			purchase_order_id: "Order01",
			purchase_order_name: "test",
		};

		try {
			const khaltiResponse = await axios.post("http://localhost:3000/api/payment-gateway/khalti", payload);
			console.log("Response:", khaltiResponse.data.response.payment_url);
			setRedirectUrl(khaltiResponse.data.response.payment_url);
		} catch (error) {
			console.error("Error:", error);
			// Handle error accordingly
		}
	};
	const handleStripePayment = async () => {
		const payload = {
			success_url: "http://localhost:5173/",
			cancel_url: "http://localhost:5173/",
			items: [
				{
					name: "Product 1",
					price: 10.99,
					quantity: 2,
				},
				{
					name: "Product 2",
					price: 5.99,
					quantity: 1,
				},
			],
		};

		try {
			const stripeResponse = await axios.post("http://localhost:3000/api/payment-gateway/stripe", payload);
			console.log("Response:", stripeResponse.data.url);
			setRedirectUrl(stripeResponse.data.url);
		} catch (error) {
			console.error("Error:", error);
			// Handle error accordingly
		}
	};

	if (redirectUrl) {
		window.location.href = redirectUrl; // Redirect the user to the payment URL
		return null; // Prevent rendering anything else if redirecting
	}

	return (
		<div>
			<h1>Payment Form</h1>
			<button onClick={handleKhaltiPayment}>Pay 1000 through khalti</button>
			<button onClick={handleStripePayment}>Pay through stripe</button>
		</div>
	);
}

export default App;
