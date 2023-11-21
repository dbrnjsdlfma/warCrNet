import React from "react";

function GameScoreBoard({totalScore}) {
    const reset = () => {
        window.location.reload()
    }
    return (
        <div className='gameScoreBoard'>
            <span>현재점수 : {totalScore}</span>
            <div className='gameBtnContainer'>
                <button className='resetBtn' onClick={reset}>다시하기</button>
            </div>
        </div>
    )
}

export default React.memo(GameScoreBoard)