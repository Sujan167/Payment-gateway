import { Request, Response } from "express";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

function generateSignature(message: string): string {
	const hash = CryptoJS.HmacSHA256(message, `${process.env.ESEWA_SECRET_KEY}`);
	const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);
	console.log(`\n\n--hashInBase64:: ${hashInBase64} --\n\n`);
	return hashInBase64;
}

export const esewaPayment = async (req: Request, res: Response) => {
	try {
		const payload = req.body;
		const total_amount = Number(payload.amount) + Number(payload.tax_amount) + Number(payload.product_service_charge) + Number(payload.product_delivery_charge);
		const uuid = uuidv4();

		const formData = {
			amount: String(payload.amount),
			failure_url: "https://google.com",
			product_delivery_charge: String(payload.product_delivery_charge),
			product_service_charge: String(payload.product_service_charge),
			product_code: String(payload.product_code),
			transaction_uuid: uuid,
			signature: generateSignature(`total_amount=${total_amount},transaction_uuid=${uuid},product_code=${payload.product_code}`),
			signed_field_names: "total_amount,transaction_uuid,product_code",
			success_url: "https://esewa.com.np",
			tax_amount: "10",
			total_amount: String(total_amount),
		};
		console.log(JSON.stringify(formData));

		const esewaResponse = await axios.post("https://rc-epay.esewa.com.np/api/epay/main/v2/form", formData);
		res.status(200).json({ success: true, message: "Payment Successful", response: esewaResponse });
	} catch (error: any) {
		console.log(error);
		return res.status(500).json({ success: false, message: "Payment Failed", error: error });
	}
};

export const verifyEsewa = async (req: Request, res: Response) => {
	// const id = req.params.id;

	const url = `https://uat.esewa.com.np/api/epay/transaction/status/?product_code=EPAYTEST&total_amount=100&transaction_uuid=123`;

	const data = `${req.query.data}`;

	const decodedString = JSON.parse(atob(data));
	switch (decodedString.status) {
		case "COMPLETE":
			try {
				const message = `transaction_code=${decodedString.transaction_code},status=${decodedString.status},total_amount=${decodedString.total_amount}, transaction_uuid=${decodedString.transaction_uuid},product_code=${decodedString.product_code},signed_field_names=${decodedString.signed_field_names}`;

				const generatedSignature = generateSignature(message);

				if (generatedSignature === decodedString.signature) {
					res.status(200).json({ success: true, message: "Payment Successful" });
				}
			} catch (error: any) {
				console.log(error.message);
				return res.status(500).json({ success: false, message: "Failed Payment Verification", error: error.message });
			}
		default:
			return res.status(500).json({ success: false, message: "Unknown Status" });
	}
};
