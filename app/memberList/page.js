import { connectDB } from "@/util/database";
import MemberItem from "./MemberItem";




export default async function MemberList(props){

	// DB연결
	let client = await connectDB;
	const db = client.db('forum')
	// DB에 post에 있는 자료 모두 가져오기
	const result = await db.collection('member').find().toArray();
	result.map(item => {
		item._id = item._id.toString()
		return item;
	})
	return(
		<div className="list-bg">
			<p>★★회원리스트★★</p>
			<MemberItem result={result}/>
    </div>
	)
}