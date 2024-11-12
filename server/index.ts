require("dotenv").config();
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import router from "./src/routes/api.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(bodyParser.json());

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
	res.send({ message: "Awesome it works 🐻" });
});

app.use("/api/payment-gateway", router);

const PORT = process.env.PORT;
if (!process.env.PORT){
	console.log("\n\nenv file not found\n\n")
}
app.listen(PORT, () => console.log(`🚀 @ http://localhost:${PORT}`));
