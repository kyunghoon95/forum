import { connectDB } from "@/util/database";
export default async function handler(req, res){

	let client = await connectDB;
	const db = client.db('forum');
	const result = await db.collection('post').find().toArray();
	let today = new Date();
	let hour = today.getHours();
	let min = today.getMinutes();
	let sec = today.getSeconds();

	if(req.method == 'POST'){
		res.status(200).json(result)
		
	}
	return res.status(200).json(hour + ':' + min + ':' + sec);
}