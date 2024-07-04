import { connectDB } from "@/util/database";


export default async function Home() {
  
  // DB연결
  let client = await connectDB;
  const db = client.db('forum');
  // DB에 post에 있는 자료 모두 가져오기
  let result = await db.collection('post').find().toArray();

  return (
    <div>
			<p>환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! 환영합니다! </p>
    </div>
  );
}
