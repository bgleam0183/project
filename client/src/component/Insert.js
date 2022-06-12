import styles from "./Insert.module.css"
import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

export default function Insert() {

    const [Word, setWord] = useState();
    const [Mean, setMean] = useState();
    const onMeanHandler = (e) => {
        setMean(e.currentTarget.value);
    }
    const onWordHandler = (e) => {
        setWord(e.currentTarget.value);
    }
    const navigate = useNavigate();
    const location = useLocation();
    let Month;
    let Day;

    if (location.state !== 'undefined' && location.state !== null)
    {
       Month = location.state.month;
       Day = location.state.day;
    }
    else
    {
        Month = 1;
        Day = 1;
    }




    async function submit() {
        let month = Month;
        let day = Day;
        let word = Word;
        let mean = Mean;

        let acclist = [Word, Mean];
        for (let i = 0; i < acclist.length; i++) {  
            if (!acclist[i])
            {
                alert("빈칸 없이 작성해주세요");
                return false;
            }
        }

        let content = {
            month,
            day,
            word,
            mean
        }

        var response = await fetch('/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        });

        var body = await response.text();

        console.log(body);

        alert(month + "월"+ day + "일에 단어가 추가되었습니다.");
        navigate(-1);
    }
        return(
            <div className={styles.back}>
                <div className={styles.login}>
                <div className={styles.topzone}>
                   <h1 className={styles.title}>
                       단어 추가
                   </h1>
                </div>
                    <input type="text" id="word" className={styles.input}
                    onChange={onWordHandler}placeholder="단어"  />
                    <input type="text" id="mean" className={styles.input} onChange={onMeanHandler} placeholder="뜻"  />
                    <button className={styles.btn} onClick={submit}>
                        추가
                    </button>
                </div>
            </div>
        );
    }