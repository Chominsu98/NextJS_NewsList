///api/new-meetup 이라는 경로로 요청되면 해당 api가 호출될 것 이다
import {MongoClient} from "mongodb";

//요청이 왔을 때에 해당 메소드 방식이 post이면 데이터를 꺼내서 db에 넣을 거임
async function handler(req,res){
    if(req.method==="POST"){
        const data=req.body;

        const client=await MongoClient.connect('mongodb+srv://ChoMinsu:비밀번호입력@cluster0.brpzrb7.mongodb.net/meetups?retryWrites=true&w=majority');
        //mongoDB에 연결시켜줌

        const db=client.db();

        const meetupCollection=db.collection("mettups");
        const result=await meetupCollection.insertOne(data);//자동으로 생성된 ID객체가 반환될 것 이다

        console.log(result);

        client.close();
        res.status(201).json({message:"성공적 삽입!"})
    }
}
export default handler;
