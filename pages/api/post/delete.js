import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res){
	let session = await getServerSession(req, res, authOptions);
	
	if(req.method == 'DELETE'){
		try {
			let data = req.body;			
			let client = await connectDB;
			const db = client.db('forum');
			// console.log(JSON.parse(data).author);
			// console.log(session.user.email);
			if(session){
				if(JSON.parse(data).author == session.user.email){
					let result = await db.collection('post').deleteOne({_id:new ObjectId(JSON.parse(data))});
					return res.status(200).json('삭제완료');
				} else {
					console.log('권한이없습니다')
				}
			}
		} catch (error) {
			return res.status(500).json('실패');
		}
	}
}