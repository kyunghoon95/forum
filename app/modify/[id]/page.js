
import Join from "@/util/Join";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";

export default async function Modify(props){
	// DB연결
	let client = await connectDB;
	const db = client.db('forum');

	// id값 가져오기
	const result = await db.collection('member').findOne({_id:new ObjectId(props.params.id)})
	// console.log(result)
	return(
		<div className="p-20">
			<Join result={result} modify={true}/>
		</div>
	)
}