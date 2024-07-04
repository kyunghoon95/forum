import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import UpLoad from "./UpLoad";

export default async function Write(){
	let session = await getServerSession(authOptions);
	const date = new Date();
	return(
		
		<div className="p-20">
			<h4>{session ? '글작성' : '로그인 해주세요'}</h4>
			{/* {session ? <form action="/api/post/new" method="POST">
				<input name="title" placeholder="글제목"/>
				<input name="content" placeholder="글내용"/>
				<input type="hidden" name="date" defaultValue={date}/>
				<UpLoad/>
				<button type="submit">글쓰기</button>
			</form> : ''} */}
			{session ?
				<UpLoad/>
			: ''}
			
		</div>
	)
}