import Card from '../ui/Card';
import classes from './MeetupItem.module.css';
import {useRouter} from 'next/router';

function MeetupItem(props) {
  
  const router=useRouter();

  const showDetailhandler=()=>{
    router.push("/"+props.id)
  };
  //이게 프로그래밍 방식 탐색으로 Link랑 같은 효과임
  //알종의 useNavigate효과와 같지 않을까?
  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={props.image} alt={props.title} />
        </div>
        <div className={classes.content}>
          <h3>{props.title}</h3>
          <address>{props.address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailhandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
