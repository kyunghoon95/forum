'use client'
import { useParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function Join(props) {

	let param = useParams();
	
	const [chk, setChk] = useState(true);
	useEffect(()=> {
		if(param.id == 'join'){
			setChk(true);
		} else {
			setChk(false);
		}
	},[])

	return (
		<>
			<h4>{chk ? '회원가입' : '수정하기'}</h4>
			<form action="/api/member/sign" method="POST">
				<input name="id" defaultValue={props.result._id} type="hidden"/>
				{chk ? "" : <input type="hidden" name="_method" value="PUT"/>}
				<label htmlFor="userID">
					<span>ID</span>
					<input id="userID" name="userID" placeholder="아이디" readOnly={!chk} defaultValue={chk ? "" : props.result.userID}/>
				</label>
				<label htmlFor="pwd">
					<span>password</span>
					<input id="pwd" name="pwd" placeholder="비밀번호" defaultValue={chk ? "" : props.result.pwd}/>
				</label>
				<label htmlFor="mail">
					<span>mail</span>
					<input id="mail" name="mail" placeholder="이메일주소" defaultValue={chk ? "" : props.result.mail}/>
				</label>
				<label htmlFor="name">
					<span>name</span>
					<input id="name" name="name" placeholder="이름" defaultValue={chk ? "" : props.result.name}/>
				</label>
				<label htmlFor="phone">
					<span>phone</span>
					<input id="phone" name="phone" placeholder="전화번호(-제외)" defaultValue={chk ? "" : props.result.phone}/>
				</label>
				<button type="submit" className="btn_submit">{chk ? '가입하기' : '수정하기'}</button>
			</form>
		</>
	)
}
