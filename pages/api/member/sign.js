//회원가입 서버기능
//database 에서 db연결

// 회원가입 데이터 분류
// 아이디(id) - 중복x, 공백x, 
// 비밀번호(pwd) - 공백x
// 이메일주소(mail) - @있는지 확인,공백x
// 이름(name) - 공백x,영어, 특수문자, 숫자x
// 전화번호(phone)
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
export default async function handler(req, res){

	let SignData = req.body;

	// id값 조건
	if(SignData.userID == ''){
		return res.status(500).json('아이디가 비어있습니다.');
	} else if(SignData.userID.includes(' ')){
		return res.status(500).json('아이디에 공백이 포함되어있습니다.');
	}

	//비밀번호 조건
	if(SignData.pwd == ''){
		return res.status(500).json('비밀번호가 비어있습니다.');
	} else if(SignData.pwd.includes(' ')){
		return res.status(500).json('비밀번호에 공백이 포함되어있습니다.');
	}

	// 이메일 조건
	var mailReg = /^[a-zA-Z0-9+\-\_.]+@[a-zA-Z0-9\-]+\.[a-zA-Z0-9\-\.]+$/;
	// 이메일이 비어있는 경우
	if (SignData.mail == '') {
		return res.status(500).json('이메일이 비어있습니다.');
	} else if (!mailReg.test(SignData.mail)) {
		return res.status(500).json('이메일 형식 오류');
	}

	// 이름조건
	var nameCon = /^[가-힣]{2,4}$/;
	if (SignData.name == '') {
		return res.status(500).json('이름 비어있습니다.');
	} else if (!nameCon.test(SignData.name)) {
		return res.status(500).json('이름 형식 오류');
	}

	// 전화번호 조건
	var phoneCon = /^\d{3}-?\d{3,4}-?\d{4}$/;
	if (SignData.phone == '') {
		return res.status(500).json('전화번호가 비어있습니다.');
	} else if (!phoneCon.test(SignData.phone)) {
		return res.status(500).json('전화번호 형식 오류');
	}


	if(SignData._method == 'PUT'){
		//수정하기
		let change = {pwd : SignData.pwd, mail : SignData.mail, name : SignData.name, phone : SignData.phone}
		let client = await connectDB;
		const db = client.db('forum');
		
		//db에 일치하는 id 데이터 찾아서 수정하기
		let update = await db.collection('member').updateOne({_id : new ObjectId(SignData.id)  }, {$set : change})

	} else if(req.method == 'POST'){
		// 추가하기
		let client = await connectDB;
		//db 선택
		const db = client.db('forum');
		// db에서 컬렉션 선택 후 해당 컬렉션에 데이터 삽입하기
		
		//id중복체크
		const dupId = await client.db('forum').collection('member').findOne({ userID: SignData.userID });
		if(dupId){
			return res.status(500).json('이미 존재하는 아이디입니다.');
		}


		// 데이터 추가
		const result = await db.collection('member').insertOne(SignData);
	}

	return res.status(200).redirect(302, '/memberList');
}