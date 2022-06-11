import React, { useState }  from 'react';
import styles from './Body.module.css';
import Calender from './Calender';


function Body() {


        const [date, setDate] = useState(new Date());
        
        
        

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
               <div className={styles.header}>
               <div className={styles.nav}>
                    <button className={styles.navbtn} onClick={prevMonth}>&lt;</button>
                    <button className={styles.gotoday} onClick={goToday}>Today</button>
                    <button className={styles.navbtn} onClick={nextMonth}>&gt;</button>
                    </div>
               </div>
               <Calender month={date.getMonth()} />
               
               </div>
        );

}

export default Body;