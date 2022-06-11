import { useNavigate, useLocation } from "react-router-dom";


function Wordlist() {
    let navigate = useNavigate();
    const location = useLocation();
    let month;
    let day;
    function goBack () {
        navigate(-1);
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

    return(
      <>
        <div onClick={goBack}>
            뒤로가기
        </div>
        <div>
            {month}월
            {day}일
        </div>

      </>
    );
}

export default Wordlist;