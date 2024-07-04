import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
	// if(req.method == 'POST'){
	// 	// //  // DB연결
	// 	req.body = JSON.parse(req.body);
	// 	 let client = await connectDB;
	// 	 const db = client.db('forum');
	// 	 // DB에 post에 있는 자료 모두 가져오기
	// 	 let result = await db.collection('comment').find({parentID: new ObjectId(req.body)}).toArray();
	
	// 	// 요청이 성공되면 redirect의 경로로 자동 이동
	// 	return res.status(200).json(result);
		
	// }


	
	let client = await connectDB;
	const db = client.db('forum');
	let result = await db.collection('comment').find({parentID: new ObjectId(req.query.id)}).toArray();
	
	return res.status(200).json(result);
}