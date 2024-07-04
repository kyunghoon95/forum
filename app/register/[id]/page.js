
import Join from "../../../util/Join";
import { connectDB } from "@/util/database";;
import { ObjectId } from "mongodb";
export default async function Register(props){

	// DB연결
	let client = await connectDB;
	const db = client.db('forum')
	// DB에 post에 있는 자료 모두 가져오기
	const result = await db.collection('member').find().toArray();
	// const result = await db.collection('member').findOne({userID : props})
	// const result = await db.collection('member').findOne({_id:new ObjectId(props.params.id)})

	return(
		<div className="p-20">
			<Join result={result}/>
		</div>
	)
}