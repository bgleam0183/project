import React, { useState }  from 'react';
import styles from './Body.module.css';
import Calender from './Calender';


function Body() {


        const [date, setDate] = useState(new Date());
        
        const today = new Date();
        

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
        




    

        return (
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
        );

}

export default Body;