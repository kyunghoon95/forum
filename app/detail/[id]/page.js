import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import Comment from "./Comment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Detail(props){
	let session = await getServerSession(authOptions)

	// DB연결
	let client = await connectDB;
	const db = client.db('forum');

	// id값 가져오기
	const result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)})
	// console.log(result)
	// console.log(props)

	return(
		<div>
			<h4>상세페이지</h4>
			<p>{result.title}</p>
			<p>{result.content}</p>
			{result.imgURL ? <img src={result.imgURL} alt="" width='300px'/> : ""}
			<Comment id={result._id.toString()} session={session}/>
			<Link href='/list'>뒤로가기</Link>
		</div>
	)
}