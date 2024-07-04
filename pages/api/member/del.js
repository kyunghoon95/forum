import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res){
	if(req.method == 'DELETE'){
		try {
			let data = req.body;
			// console.log(JSON.parse(data));
			let client = await connectDB;
			const db = client.db('forum');
			let result = await db.collection('member').deleteOne({_id:new ObjectId(JSON.parse(data))})
			
			return res.status(200).json('삭제완료');
		} catch (error) {
			return res.status(500).json('실패');
		}
	}
}