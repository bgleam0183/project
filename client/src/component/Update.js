import styles from "./Insert.module.css"
import {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';

export default function Update() {

    const [Word, setWord] = useState();
    const [Mean, setMean] = useState();
    const [Folder, setFolder] = useState();
    const [List, setList] = useState([{
        id: '',
        month: '',
        day: '',
        word: '',
        mean: '',
        folder: ''
      }])
    const onFoldHandler = (e) => {
        setFolder(e.currentTarget.value);
    }

    const onMeanHandler = (e) => {
        setMean(e.currentTarget.value);
    }
    const onWordHandler = (e) => {
        setWord(e.currentTarget.value);
    }
    const navigate = useNavigate();
    const location = useLocation();
    let Id;
    let prev;
    if (location.state !== 'undefined' && location.state !== null)
    {
       Id = location.state.id;
       prev = location.state.folder;
    }
    else
    {
       Id = 1;
    }


    useEffect(() => {
        async function LandingPage() {
            //get request를 서버에 보내는 것
            var response = await fetch('/select', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          var body = await response.text();
          body = JSON.parse(body);
          const inputData = body.map((Data) => ({
                  id : Data.id,
                  month : Data.month,
                  day : Data.day,
                  word : Data.word,
                  mean : Data.mean
          }
          ))
          setList(inputData);
          return 0;
      }
      LandingPage();
      },[])
    



    let Thisword; 
    List.filter(pro => pro.id === Id).map((pro) => (
        Thisword = pro
    ));

    async function submit() {
        let id = Id;
        let word = Word;
        let mean = Mean;
        let folder = Folder;
        let month = Thisword.month;
        let day = Thisword.day;

        let back = -1;

        var reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g;

        let acclist = [Word, Mean, Folder];
        for (let i = 0; i < acclist.length; i++) {  
            if (!acclist[i])
            {
                alert("빈칸 없이 작성해주세요");
                return false;
            }

            if ( acclist[i].match(reg) != null ) {
                alert("폴더명에는 특수기호 입력이 불가합니다.");
                return false;
            }
        }

        let content = {
            id,
            month,
            day,
            word,
            mean,
            folder
        }
        var response = await fetch('/update', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(content)
        });
        var body = await response.text();
        body = JSON.parse(body);
        console.log(body);
        alert("단어를 수정했습니다.");
        if(prev !== folder) {
            back = -2;
        }
        navigate(back);
    }

    function cancel() {
        navigate(-1);
    }

        return(
            <div className={styles.back}>
                <div className={styles.login}>
                <div className={styles.topzone}>
                   <h1 className={styles.title}>
                       단어 수정
                   </h1>
                </div>
                    <input type="text" id="mean" className={styles.input} onChange={onFoldHandler} placeholder={"현재폴더명 \""+prev+"\""}/>
                    <input type="text" id="word" className={styles.input}
                    onChange={onWordHandler} placeholder={"단어"}    />
                    <input type="text" id="mean" className={styles.input} onChange={onMeanHandler} placeholder={"뜻"}/>
                    <button className={styles.btn} onClick={submit}>
                        수정
                    </button>
                    <button className={styles.btn} onClick={cancel}>
                        취소
                    </button>
                </div>
            </div>
        );
    }