import { connectDB } from "@/util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";


export default async function handler(req, res){
	req.body = JSON.parse(req.body);
	let session = await getServerSession(req, res, authOptions);
	if(session){
		req.body.author = session.user.email;
	}
	if(req.method == 'POST'){
		// console.log(req.body)
		if(req.body.title == '' || req.body.content == '') {
			return res.status(500).json('빈 항목이 있습니다.')
		} 
		let client = await connectDB;
		const db = client.db('forum');

		//db에 데이터 저장하기
		let result = await db.collection('post').insertOne(req.body);
		

		// // 요청이 성공되면 redirect의 경로로 자동 이동
		return res.status(200).json('저장완료');
		// setTimeout(()=> {
		// 	return res.status(200).redirect('/list');
		// },3000)
		
		
	}
}