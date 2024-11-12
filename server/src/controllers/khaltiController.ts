import { Request, Response } from "express";
import axios from "axios";

export const khaltiPayment = async (req: Request, res: Response) => {
	try {
		const { return_url, website_url, amount, purchase_order_id, purchase_order_name } = req.body;

		if (!return_url || !website_url || !amount || !purchase_order_id || !purchase_order_name) {
			return res.status(400).json({ success: false, message: "All fields are required" });
		}
		const payload = {
			return_url: String(return_url),
			website_url: String(website_url),
			amount: String(amount),
			purchase_order_id: String(purchase_order_id),
			purchase_order_name: String(purchase_order_name),
			customer_info: {
				name: "Ram Bahadur",
				email: "test@khalti.com",
				phone: "9800000001",
			},
		};
		console.log(`\n\npayload:: ${JSON.stringify(payload)}\n`);
		const khaltiResponse = await axios.post("https://a.khalti.com/api/v2/epayment/initiate/", payload, {
			headers: {
				Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
			},
		});
		res.status(200).json({ success: true, message: "Payment Successful", response: khaltiResponse.data });
		// res.redirect(khaltiResponse.data.payment_url);
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "Payment Failed", error: error });
	}
};

export const verifyKhalti = async (req: Request, res: Response) => {
	try {
		const pidx = req.body;
		if (!pidx) return res.status(404).json({ success: false, message: "pidx is required" });

		const khaltiResponse = await axios.post("https://a.khalti.com/api/v2/epayment/lookup/", pidx, {
			headers: {
				Authorization: `key ${process.env.KHALTI_SECRET_KEY}`,
			},
		});
		res.status(200).json({ success: true, message: "Payment Verified", response: khaltiResponse.data });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ success: false, message: "Failed to verify payment", error: error });
	}
};
