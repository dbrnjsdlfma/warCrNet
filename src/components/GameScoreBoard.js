import React from "react";

function GameScoreBoard({totalScore}) {
    return (
        <div className='gameScoreBoard'>
            <span>현재점수 : {totalScore}</span>
        </div>
    )
}

export default React.memo(GameScoreBoard)