import { connectDB } from "@/util/database";
import bcrypt from 'bcrypt';

export default async function handler(req, res){
	if(req.method === 'POST'){
		const hash = await bcrypt.hash(req.body.password, 10);
		req.body.password = hash;
		let client = await connectDB;
		const db = client.db('forum');

		// 이메일 중복검사
		const dupEmail = await db.collection('user_cred').findOne({ email: req.body.email });
		if(dupEmail){
			return res.status(500).json('이미 존재하는 이메일입니다.')
		} else {
			let result = await db.collection('user_cred').insertOne(req.body);
			return res.status(200).redirect(302, '/list');
		}
	}
}
