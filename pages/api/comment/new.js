import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
	let session = await getServerSession(req, res, authOptions);
	
	if(req.method == 'POST'){
		req.body = JSON.parse(req.body);
		
		let newData = {
			comment : req.body.comment,
			parentID : new ObjectId(req.body.id),
			author : session.user.email,
			name : session.user.name
		}
		let client = await connectDB;
		const db = client.db('forum');

		//빈칸 찾아내기
		if(!req.body.comment == ""){
			let result = await db.collection('comment').insertOne(newData);
		} else {
			return res.status(500).json('빈칸입니다.')
		}
		
		// 요청이 성공되면 redirect의 경로로 자동 이동
		return res.status(200).redirect('/list');
		
	}
}