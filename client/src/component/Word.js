import styles from "./Word.module.css";
import {useNavigate} from 'react-router-dom';

function Word (props) {
     
    const navigation = useNavigate();

    function goUpdate () {
        navigation('/update', {state : {
            id : props.id,
            folder : props.folder
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
    

    function folderClick () {
        navigation('/list', {state : {
            folder : props.folder,
            month : props.month,
            day: props.day
        }});
    }

    if(props.mean === "폴더") {
        return (
            <div className={styles.word}>
                <span>{props.folder}</span>
                <span>{props.mean}</span>
                <span><button className={styles.folder} onClick={folderClick}>이동</button></span>
            </div>
        )
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