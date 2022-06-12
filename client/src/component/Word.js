import styles from "./Word.module.css";
import {useNavigate} from 'react-router-dom';

function Word (props) {
     
    const navigation = useNavigate();

    function goUpdate () {
        navigation('/update', {state : {
            id : props.id
        }});
    }

    async function goDelete () {

        var date = {
            id : props.id
        };

        

        var response = await fetch('/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(date)
        });
        var body = await response.text();
        console.log(body);
        alert("단어를 삭제했습니다.");

    }

    return(
        <div className={styles.word}>
                <span>{props.word}</span>
                <span>{props.mean}</span>
                <span>
                <button className={styles.update} onClick={goUpdate}>수정</button><button className={styles.remove} onClick={goDelete}>삭제</button></span>
            </div>
    );
}
export default Word;