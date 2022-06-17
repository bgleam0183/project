import React, { useState, useEffect }  from 'react';
import styles from './Body.module.css';
import Word from './Word.js'
import Calender from './Calender';


function Body() {
    const [date, setDate] = useState(new Date());
    const [List, setList] = useState([{
        id: '',
        month: '',
        day: '',
        word: '',
        mean: '',
        folder: ''
    }]);
    
    const today = new Date();

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


        

    const prevMonth = () => {
        let date2 = new Date(date);
        date2.setMonth(date.getMonth() - 1);
        setDate(date2);
        console.log(date.getMonth());
    };
    const nextMonth = () => {
        let date3 = new Date(date);
        date3.setMonth(date.getMonth() + 1);
        setDate(date3);
        console.log(date.getMonth());
    };
    const goToday = () => {
        setDate(new Date());
        console.log(date.getMonth());
    };

    var List2 = List.filter((pro) => pro.month === today.getMonth()+1 && pro.day > today.getDate()-8
     && pro.day <= today.getDate()).map((pro) => (
        <Word mean = {pro.mean} word = {pro.word} id = {pro.id} key={pro.id} folder={pro.folder}/>
    ));

    if(List2.length === 0) {
        List2 = "최근 1주일 간 추가된 단어가 없습니다.";
    }

        return (
            <>
                <div className={styles.calender}>
                    
                    <h1 className={styles.h1}>Word Calender</h1>
                    <div className={styles.todays}>{today.getFullYear()}년 {today.getMonth()+1}월
                        {today.getDate()}일</div>
                    <div className={styles.header}>
                        
                    <div className={styles.nav}>
                            <button className={styles.navbtn} onClick={prevMonth}>&lt;</button>
                            <button className={styles.gotoday} onClick={goToday}>Now</button>
                            <button className={styles.navbtn} onClick={nextMonth}>&gt;</button>
                            </div>
                    </div>
                    <Calender month={date.getMonth()} />
                </div>
                <div className={styles.recentWord}  id="recentPart">
                    <div className={styles.recent}>Recent Word</div>
                    {List2}
                </div>
            </>
        );

}

export default Body;