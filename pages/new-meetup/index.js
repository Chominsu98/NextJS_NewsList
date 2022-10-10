import NewMeetupForm from "../../components/meetups/NewMeetupForm"
import { useRouter } from "next/router";

function NewMeetupPage(){
    const router=useRouter();
    const addMeetupHandler=async(enterMeetupData)=>{
        //pages에 있는 api폴더에서 만들어놓은 new-meetup으로 서버요청을 하는 것
        const res=await fetch("/api/new-meetup",{
            method:'POST',
            body:JSON.stringify(enterMeetupData),
            headers:{
                'Content-Type':'application/json'
            }
        });

        const data=await res.json();//서버로부터 응답된 데이터

        console.log(data);
        router.push("/");
        //다시 홈페이지로 이동
    };

    return(
        <>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    );
}

export default NewMeetupPage;