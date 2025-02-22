import { Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET ?? "jnnbWjfM9pJLwp/04UIdNALP/diNwztZyiKjXiL95Bc="; // This is a secret key, it should be stored in a .env file
const isSecure = process.env.NODE_ENV !== "development";

const generateTokenAndSetCookie = (userId: string, res: Response) => {
	const token = jwt.sign({ userId }, JWT_SECRET, {
		expiresIn: "2d",
	});

	res.cookie("jwt", token, {
		maxAge: 2 * 24 * 60 * 60 * 1000, // MS
		httpOnly: false, // prevent XSS attacks cross-site scripting attacks
		sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // CSRF attacks cross-site request forgery attacks
		secure: process.env.NODE_ENV === "production", // secure should be true in production
	});
};

export default generateTokenAndSetCookie;
