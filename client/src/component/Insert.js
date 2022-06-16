import styles from "./Insert.module.css"
import {useState} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

export default function Insert() {

    const [Word, setWord] = useState();
    const [Mean, setMean] = useState();
    const [Folder, setFolder] = useState("");

    const onMeanHandler = (e) => {
        setMean(e.currentTarget.value);
    }
    const onWordHandler = (e) => {
        setWord(e.currentTarget.value);
    }
    const onFolderHandler = (e) => {
        setFolder(e.currentTarget.value);
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
        let folder = Folder;

        let acclist = [Word, Mean, Folder];
        
        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

        for (let i = 0; i < acclist.length; i++) {  
            if (!acclist[i] && i != 2)
            {
                alert("빈칸 없이 작성해주세요");
                return false;
            }

            if ( acclist[i].match(reg) != null ) {
                alert("특수기호 없이 폴더명만 기입바랍니다.");
                return false;
            }
            if(i == acclist.length) {
                return false;
            }
        }
        
        

        let content = {
            month,
            day,
            word,
            mean,
            folder
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
                    <input type="text" id="folder" className={styles.input} onChange={onFolderHandler} placeholder="폴더명" />
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