'use client'

import { useRef, useState } from "react";
import { storage } from "@/firebase/firebasedb";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";
// import { storage, firestore } from "@/firebase/firebasedb";
// import {addDoc, collection} from 'firebase/firestore';

export default function UpLoad() {
	const [image, setImage] = useState('');
	const date = new Date();
	const imgInputRef = useRef(null);
	const router = useRouter();

	const imgPreview = async(e) => {
		const file = e.target.files[0];
		if (file) {
			const file = e.target.files[0];
			if(file){
				setImage(URL.createObjectURL(file));
			}
		}
	};

	// const uploadImages = async (e) => {
	// 	e.preventDefault();
	// 	const file = imgInputRef.current.files[0];
	// 	if (file) {
	// 		const storageRef = ref(storage, `images/${file.name}`);
	// 		await uploadBytes(storageRef, file);
	// 		const imgUrl = await getDownloadURL(storageRef);
	// 		setDownUrl(imgUrl);
	// 		window.alert('성공적으로 업로드 했습니다.');
	// 	} else {
	// 		window.alert('이미지를 선택해 주세요!');
	// 	}
	// };

	//이미지 업로드 후 몽고db에 데이터 전송
	const dataFetch = async (e) => {
    e.preventDefault();
    const file = imgInputRef.current.files[0];
    let imgUrl = '';
    if (file) {
			const storageRef = ref(storage, `images/${file.name}`);
			await uploadBytes(storageRef, file);
			imgUrl = await getDownloadURL(storageRef);
    }
    const data = {title: e.target.title.value, content: e.target.content.value, date: e.target.date.value, imgURL: imgUrl};
    fetch('/api/post/new', { method: 'POST', body: JSON.stringify(data)}).then(() => {
			router.push('/list');
			router.refresh();
		});
	}


	return (
		<div>
			 <form onSubmit={dataFetch}>
				<input name="title" placeholder="글제목"/>
				<input name="content" placeholder="글내용"/>
				<input type="hidden" name="date" defaultValue={date}/>
				<input type="file" accept="image/*" onChange={imgPreview} ref={imgInputRef}/>
				{/* <input type="hidden" name="imgURL" defaultValue={downUrl}/> */}
				<img src={image} style={{width:'300px', display:'block'}}/>
				{/* <button className="mgr10" onClick={uploadImages}>이미지 저장하기</button> */}
				<button type="submit">글쓰기</button>
			</form>
		</div>
	);
}

