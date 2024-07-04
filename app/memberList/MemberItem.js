'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function MemberItem({result}) {

	const router = useRouter();

	const del = (i, e) => {
	 	fetch('/api/member/del',{method : 'DELETE', body: JSON.stringify(result[i]._id)}).then(() => {
			router.push('/memberList');
			router.refresh();
			// e.target.parentElement.style.opacity = 0;
			// setTimeout(() => {
			// 	e.target.parentElement.style.display = 'none';
			// },500)
		})
	}
	if (result.length === 0) {
    return (
      <div>
        <p>리스트가 없습니다.</p>
      </div>
    );
  }
	
	return (
		<div>
			{result.map((item, i)=> {
				return(
					<div className="list-item" key={i}>
						<p>ID: {item.userID}</p>
						<p>이름 : {item.name}</p>
						<p>mail : {item.mail}</p>
						<button onClick={() => del(i)} style={{display: 'block'}}>삭제</button>
						<Link href={`/modify/${item._id}`}>수정하기</Link>
					</div>
				)
			})}
		</div>
	)
}
