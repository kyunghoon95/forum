'use client';

import { useRef, useState } from "react";
import { storage } from "@/firebase/firebasedb";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRouter } from "next/navigation";

export default function EditImg({result, session}) {
	const [image, setImage] = useState('');
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

	const editFetch = async (e) => {
    e.preventDefault();
		const imgPath = result.imgURL;
		if(imgPath){
			const storageRef = ref(storage, imgPath);
			deleteObject(storageRef);
		}
    const file = imgInputRef.current.files[0];
    let imgUrl = '';
    if (file) {
			const storageRef = ref(storage, `images/${file.name}`);
			await uploadBytes(storageRef, file);
			imgUrl = await getDownloadURL(storageRef);
		
    }
    const data = {title: e.target.title.value, content: e.target.content.value, id: e.target.id.value, imgURL: imgUrl};
    fetch('/api/post/edit', { method: 'POST', body: JSON.stringify(data)}).then(() => {
			router.push('/list');
			router.refresh();
		});
	}
	

	return (
		<div>
			<form onSubmit={editFetch}>
				<input name="id" defaultValue={result._id.toString()} style={{display:'none'}}/>
				<input name="title" defaultValue={result.title}/>
				<input name="content" defaultValue={result.content}/>
				<input type="file" accept="image/*" ref={imgInputRef} onChange={imgPreview}/>
				<img src={image || result.imgURL} width='300px' className="dis-block" />
				{session?.user.email == result.author ? <button type="submit">수정하기</button> : <p>수정 권한이 없습니다.</p>}
			</form>
		</div>
	)
}
