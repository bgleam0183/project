import { useNavigate, useLocation } from "react-router-dom";
import Word from "./Word";
import styles from "./Wordlist.module.css";
import React, { useState, useEffect } from 'react';
function Wordlist() {
    let navigate = useNavigate();
    const location = useLocation();
    let month;
    let day;
    let locFolder;
    const [List, setList] = useState([{
        id: '',
        month: '',
        day: '',
        word: '',
        mean: '',
        folder: ''
      }])

    function goHome() {
        navigate('/');
    }

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
       locFolder = location.state.folder;
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
                  mean : Data.mean,
                  folder : Data.folder
          }
          ))
          setList(inputData);
          return 0;
      }
      LandingPage();
      })
    //   console.log(List);
    // console.log(location.state);
      
    const Foli = List.filter(pro => pro.month === month && pro.day === day && pro.folder !== "" && location.state.folder == undefined).map((pro) => (
        <Word mean = {"폴더"} folder = {pro.folder} id = {pro.id} key={pro.id} month={pro.month} day={pro.day} />
    ));
    

    var valArr = [];
    var valArrIdx = [];
    // 폴더 중복 제거
    Foli.map((pro, idx) => {
        if(valArr.indexOf(pro.props.folder) === -1) {
            valArr.push(pro.props.folder);
        } else {
            valArrIdx.push(idx);
        }
    });

    valArrIdx.forEach(idx => {
        Foli.splice(idx, 1);
    });

    if(locFolder === undefined) {
        locFolder = "";
    }
    const List2 = List.filter(pro => pro.month === month && pro.day === day && pro.folder === locFolder).map((pro) => (
        <Word mean = {pro.mean} word = {pro.word} id = {pro.id} key={pro.id} folder={pro.folder}/>
    ));



    return(
      <div className={styles.container}>
          <div  className={styles.goback}onClick={goBack}>
            뒤로가기
        </div>
          <h1>{month}월{day}일 단어 목록</h1>
          <div>
            <button className={styles.home} onClick={goHome}>홈으로</button>
            <button className={styles.add} onClick={goInsert}>단어 추가</button>
          </div>
        <div className={styles.wordcontainer}>
            <div className={styles.cate}>
                <span>단어</span>
                <span>뜻</span>
                <span>
                수정 / 삭제</span>
            </div>
            {Foli}
            {List2}
            
        </div>

      </div>
    );
}

export default Wordlist;