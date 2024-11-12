import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = require("stripe")(process.env.STRIPE_PRIVATE_KEY);
export const stripePayment = async (req: Request, res: Response) => {
	try {
		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			mode: "payment",
			success_url: req.body.success_url,
			cancel_url: req.body.cancel_url,
			line_items: req.body.items.map((item: any) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: item.name,
							// description: "Your Product Description",
						},
						unit_amount: item.price * 100, // Amount in cents
					},
					quantity: item.quantity,
				};
			}),
		});

		res.json({ url: session.url });
	} catch (error: any) {
		res.status(500).json({ error: error.message });
	}
};
// # Stripe test card
// # 4111 1111 1111 1111
