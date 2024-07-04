
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import EditImg from "./EditImg";

export default async function Edit(props){
	let session = await getServerSession(authOptions);//로그인 정보를 불러옴

	// DB연결
	let client = await connectDB;
	const db = client.db('forum');
	// id값 가져오기
	const result = await db.collection('post').findOne({_id:new ObjectId(props.params.id)})
	result._id = result._id.toString();
	
	return(
		<div className="p-20">
			<h4>글수정 페이지</h4>
			{/* <form action="/api/post/edit" method="POST">
				<input name="id" defaultValue={result._id.toString()} style={{display:'none'}}/>
				<input name="title" defaultValue={result.title}/>
				<input name="content" defaultValue={result.content}/>
				<input type="file"/>
				<img src={result.imgURL} width='300px' className="dis-block"/>
				{session?.user.email == result.author ? <button type="submit">수정하기</button> : <p>수정 권한이 없습니다.</p>}
			</form> */}
			<EditImg session={session} result={result}/>
		</div>
	)
}