import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList"


function Homepage(props){
    return(
        <>
            <MeetupList meetups={props.meetups}/>
        </>
    );
}

// export async function getServerSideProps(context){
//     //fecth를 하거나 db에 접근하거나~ 서버에서 실행할 코드들 함

//     const req=context.req;//요청에 대한 객체
//     const res=context.res;//응답에 대한 객체

//     return{
//         props:{
//                 meetups:DUMMY_MEETUPS
//         }
//     }
// }
//해당 방식은 매 페이지에 요청이 들어올 때마다 서버에서 실행되는 코드로서
//요청에따라 바로바로 응답해줌
//대신 애는 굳이 revalidate가 따라서필요없어짐

export async function getStaticProps(){

    const client=await MongoClient.connect('mongodb+srv://ChoMinsu:QlwySOE8PqcLQGQ5@cluster0.brpzrb7.mongodb.net/meetups?retryWrites=true&w=majority');
    //mongoDB에 연결시켜줌

    const db=client.db();

    const meetupCollection=db.collection("mettups");
    const meetups=await meetupCollection.find().toArray();

    console.log(meetups);

    client.close();

    return{
        props:{
            meetups:meetups.map((meetup)=>{
                return{
                    title:meetup.title,
                    image:meetup.image,
                    address:meetup.address,
                    id:meetup._id.toString(),
                    description:meetup.description
                }
            })
        },
        revalidate:10
    }
}
//이런식으로 해당 메소드를 getStaticProps는 이미 Next에서 정해놓은 메소드로서 해당 메소드는 서버에서 실행되는 코드로
//해당 위의 컴포넌트가 실행되기 전에 되는 코드로 서버에서 실행 됬으면 하는 코드들이 들어간다
//따라서 컴포넌트 코드이전에 돌아가기에 데이터같은것을 미리 가져와줄 수 있다.
//단 반환해주는 객체가 꼭 있어야 하며 key값은 props이어야함 해당 props에서는 컴포넌트에 전달되는 props를 넣어주면 됨
//따라서 해당 컴포넌트는 데이터를 props로 받기에 더이상 useEffect나 이런데에서 fetch를 고민할필요가 없어짐
//그냥 props로 접근해서 가져다 쓰면 됨
export default Homepage;