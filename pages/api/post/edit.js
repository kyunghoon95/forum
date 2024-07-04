import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function handler(req, res){
	if(req.method == 'POST'){
		req.body = JSON.parse(req.body)
		// console.log(req.body)
		let change = {title : req.body.title, content : req.body.content, imgURL : req.body.imgURL}
		let client = await connectDB;
		const db = client.db('forum');

		// //db에 데이터 수정하기
		let result = await db.collection('post').updateOne({_id :new ObjectId(req.body.id) }, {$set : change})
		return res.status(200).redirect(302, '/list');
	}
}