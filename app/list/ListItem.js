'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { storage } from "@/firebase/firebasedb";
import { deleteObject, ref } from "firebase/storage";
export default function ListItem({result}) {

	const getNowFormat = (el) => {
    const date = new Date(el);
    const nowMonth = date.getMonth() + 1;
    const nowDate = date.getDate();
    return { month: nowMonth, date: nowDate };
	}

	const router = useRouter();
		
		
	const del = (i) => {
		const imgPath = result[i].imgURL;
		if(imgPath){
			const storageRef = ref(storage, imgPath);
			deleteObject(storageRef);
		}
		const data = {id: result[i]._id, author: result[i].author};
		fetch('/api/post/delete',{method : 'DELETE', body: JSON.stringify(data)}).then(() => {
			router.push('/list');
			router.refresh();
		})
	}

	return (
		<div>
			{result.map((item, i)=> {
				const { month, date } = getNowFormat(item.date);
				return(					
					<div className="list-item" key={i}>
						<Link href={`detail/${item._id}`} className="list_link">
							<h4>{item.title}</h4>
						</Link>
						<Link href={`edit/${item._id}`} className="list_link">✍</Link>
						<button onClick={()=>{del(i)}}>🔥</button>
						<p>{month}월 {date}일</p>
					</div>
				)
			})}
		</div>
	)
}
