import { useNavigate, useLocation } from "react-router-dom";
import Word from "./Word";
import styles from "./Wordlist.module.css";
import React, { useState, useEffect } from 'react';
function Wordlist() {
    let navigate = useNavigate();
    const location = useLocation();
    let month;
    let day;
    const [List, setList] = useState([{
        id: '',
        month: '',
        day: '',
        word: '',
        mean: ''
      }])

    function goBack () {
        navigate(-1);
    }
    function goInsert () {
        navigate('/insert', {state : {
            month,
            day
        }});
    }

    if (location.state !== 'undefined' && location.state !== null)
    {
       month = location.state.month;
       day = location.state.day;
    }
    else
    {
        month = 1;
        day = 1;
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
      })
    console.log(List);

    
    const List2 = List.filter(pro => pro.month === month && pro.day === day).map((pro) => (
        <Word mean = {pro.mean} word = {pro.word} id = {pro.id} key={pro.id}/>
    ));



    return(
      <div className={styles.container}>
          <div  className={styles.goback}onClick={goBack}>
            Main
        </div>
          <h1>{month}월{day}일 단어 목록</h1>
          <button className={styles.add} onClick={goInsert}>단어 추가</button>
        <div className={styles.wordcontainer}>
            <div className={styles.cate}>
                <span>단어</span>
                <span>뜻</span>
                <span>
                수정 / 삭제</span>
            </div>
            {List2}
            
        </div>

      </div>
    );
}

export default Wordlist;