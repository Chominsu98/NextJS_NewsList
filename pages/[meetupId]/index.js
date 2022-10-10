import MeetupDetail from "../../components/meetups/MeetupDetail";
function MeetupDetails(props){
    return(
        <MeetupDetail image={props.meetupData.image} title={props.meetupData.title} description={props.meetupData.description} address={props.meetupData.address} />
    );

}

export async function getStaticPaths(){
    return{
        fallback:false,
        paths:[
            {
                params:{
                    meetupId:"m1"
                },
            },
            {
                params:{
                    meetupId:"m2"
                }
            },
        ]
    }
}
//동적 라우터에서 ssg를 사용하고싶으면 같이 써줘서 어떤 동적 라우팅에 대하여 미리 빌드를 해줄지에
//대한 정보는 알려주는 것 이다 
export function getStaticProps(context){
    //실제 해당과정은 data fetch하는 과정이라고 생각하면 됨 단지 여기서는 하드코딩해준거일뿐

    const meetupId=context.params.meetupId;//해당 페이지에서는 useRouter를 통한 리액트훅으로의 접근이 안되므로 context매개변수에 있는 params로 접근하자
    console.log(meetupId);//실제 해당 콘솔은 서버단에서 찍히는 것이다
    return{
        props:{
            meetupData:{
                image:"https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FdmCqfe%2Fbtq4jsZ6exh%2FIq71TMudD3jkBLjqmanaRK%2Fimg.jpg",
                id:meetupId,
                title:"처음 사진",
                description:"이사진의 설명글",
                address:"이사진의 주소"
            }
        }
    }
}
//어차피 해당 페이지에서는 기본적으로 데이터에 대한 요청이 필요하니까 서버사이드나 ssg를 써줘야함
//근데 데이터가 빈번하게 변경될 것 같지는 않음

export default MeetupDetails;