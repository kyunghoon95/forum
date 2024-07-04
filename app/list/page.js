import { connectDB } from "@/util/database";
import ListItem from "./ListItem";

export const dynamic = 'force-dynamic'
// export const dynamic = 'force-static'

export default async function List(){

	// DB연결
	let client = await connectDB;
	const db = client.db('forum')
	// DB에 post에 있는 자료 모두 가져오기
	const result = await db.collection('post').find().toArray();
	result.map(item => {
		item._id = item._id.toString()
		return item;
	})

	return(
		<div className="list-bg">
			<ListItem result={result}/>
    </div>
	)
}