'use client'

import { useEffect, useState } from "react"

export default function Comment(props) {

	let [comment, setComment] = useState('');
	let [list, setList] = useState([])
	const handleInput = (e) => {
		setComment(e.target.value);
	}

	useEffect(()=> {
		itemFetch();
	},[])

	//post방식
	// const itemFetch = () => {
	// 	fetch('/api/comment/item', {method: 'POST', body: JSON.stringify(props.id)}).then(response => {
	// 		return response.json();
	// 	}).then(result => {
	// 		setList(result);
	// 	}).catch((error) => {
	// 		console.log(error);
	// 	})
	// }

	//get방식 > query string 사용
	const itemFetch = () => {
		fetch(`/api/comment/item?id=${props.id}`).then(r=>r.json()).then(result => {
			setList(result);
		})
	}

	const commentFetch = () =>{
		if(props.session){
			let data = {comment : comment, id : props.id}
			fetch('/api/comment/new', {method : 'POST', body : JSON.stringify(data)}).then((r) => {
				if(r.status === 200){
					setComment('');
				} else {
					window.alert('댓글을 입력해주세요.');
				}
			}).then(()=>{
				itemFetch();
			})
			.catch((error) => {
				console.log(error);
			})
		} else {
			window.alert('로그인을 해주세요.');
		}
	}

	return (
		<div>
			<hr/>
			<p style={{color:'red'}}>클린봇이 악성댓글을 감지합니다.</p>
			<div>
				{
					list.length > 0 ?
					list.map((item, i) => {
					return(
						<div key={i}>
							{item.name} : {item.comment}
						</div>
					)
				}) : '댓글없음'
				}
			</div>
			<input value={comment} onChange={(e) => {handleInput(e)}}/>
			<button onClick={commentFetch}>버튼</button>
		</div>
	)
}
