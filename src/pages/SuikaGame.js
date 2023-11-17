import React, {useEffect, useState, useRef} from 'react'
import {Engine, Render, Bodies, Runner, World, Body, Events} from 'matter-js'
import { Header , Footer } from "../components"
import FRUITS_BASE from '../fruits'
import GameScoreBoard from '../components/GameScoreBoard'
import '../styles/SuikaGame.css'
function SuikaGame() {
    const canvasRef = useRef(null);
    // const totalScore = useRef<number>(0);
    const [totalScore , setTotalScore] = useState(0)
    useEffect( () => {
        const engine = Engine.create()
        const render = Render.create({
            engine,
            canvas : canvasRef.current,
            element : document.querySelector('.gameBody') ,
            options : {
                wireframes : false ,
                background : "#F7F4C8" ,
                width : 620 ,
                height : 850 ,
            }
        })
        const world = engine.world

        const leftWall = Bodies.rectangle(15, 395, 30, 790, {
            isStatic : true ,
            render : { fillStyle: "#E6B143" } ,
        }) 
        const rightWall = Bodies.rectangle(605, 395, 30, 790, {
            isStatic : true ,
            render : { fillStyle: "#E6B143" } ,
        })
        const ground = Bodies.rectangle(310, 820, 620, 60, {
            isStatic : true ,
            render : { fillStyle: "#E6B143" } ,
        })
        const topLine = Bodies.rectangle(310, 150, 620, 2, {
            name : "topLine" ,
            isStatic : true ,
            isSensor : true , 
            render : { fillStyle: "#E6B143"} , 
        })
        let currentBody = null 
        let currentFruit = null
        let currentLine = null
        let disableAction = false
        let interval = null
        let score = 0
        let total = 0
        const addFruit = () => {
            const index = Math.floor(Math.random() * 5)
            const fruit = FRUITS_BASE[index]
            const body = Bodies.circle(300, 50, fruit.radius, {
                index: index ,
                isSleeping : true, 
                render: {
                    sprite : { texture: `${fruit.name}.png`}
                },
                restitution : 0.4 ,
            })
            // const newfruitLine = Bodies.rectangle(300, 400, 5, 600, {
            //     isSleeping : true , 
            //     render : {fillStyle : '#e6e6e6'} , 
            // })
            // currentLine = newfruitLine
            currentBody = body
            currentFruit = fruit

            World.add(world, body )
        }
        window.onkeydown = (event) => {
            if(disableAction) {
                return
            }
            switch (event.code) {
                case "ArrowLeft" :
                    if(interval) {
                        return
                    }
                    interval = setInterval(() => {
                        if(currentBody.position.x - currentFruit.radius > 30) {
                            Body.setPosition(currentBody , {
                                x : currentBody.position.x - 10 ,
                                y : currentBody.position.y ,
                            })
                            // Body.setPosition(currentLine , {
                            //     x : currentLine.position.x - 10 ,
                            //     y : currentLine.position.y ,
                            // })
                        }
                    }, 10)
                    break;
                case "ArrowRight" :
                    if(interval) {
                        return
                    }
                    interval = setInterval(() => {
                        if(currentBody.position.x + currentFruit.radius < 590) {
                            Body.setPosition(currentBody , {
                                x : currentBody.position.x + 10 ,
                                y : currentBody.position.y ,
                            })
                            // Body.setPosition(currentLine , {
                            //     x : currentLine.position.x + 10 ,
                            //     y : currentLine.position.y ,
                            // })
                        }
                    }, 10)
                    break;
                case "ArrowDown" :
                    currentBody.isSleeping = false
                    // World.remove(world, currentLine)
                    disableAction = true
                    setTimeout(() => {
                        addFruit()
                        disableAction = false
                    }, 1000)
                    break;
            }
        }
        window.onkeyup = (event) => {
            switch (event.code) {
                case "ArrowLeft" :
                case "ArrowRight" :
                    clearInterval(interval)
                    interval = null
            }

        }
        Events.on(engine, "collisionStart", (event) => {
            // console.log(event)
            event.pairs.forEach((collision) => {
                if(collision.bodyA.index === collision.bodyB.index) {
                    const index = collision.bodyA.index
                    if( index === FRUITS_BASE.length -1) {
                        return;
                    }

                    score = totalScore + FRUITS_BASE[index].score * 2
                    total = total + score
                    setTotalScore(total)
                    World.remove(world, [collision.bodyA, collision.bodyB])
                    
                    const newFruit =  FRUITS_BASE[index + 1]

                    const newBody = Bodies.circle(
                        collision.collision.supports[0].x ,
                        collision.collision.supports[0].y ,
                        newFruit.radius,
                        {
                            render: {
                                sprite : { texture: `${newFruit.name}.png`} ,
                            },
                            index : index + 1 ,
                            restitution : 0.4 ,
                        }
                    )
                    World.add(world, newBody)

                }

                if(!disableAction &&
                    (collision.bodyA.name === "topLine" || collision.bodyB.name === "topLine")) 
                    {
                        alert(`Game Over !!! 점수는 : ${total}`)
                        window.location.reload()
                    }
            })
        })
        addFruit()
        World.add(world, [leftWall, rightWall, ground, topLine])
        Render.run(render)
        Runner.run(engine)
    },[])
    const reset = () => {
        window.location.reload()
    }
    return (
        <div className='suikaGame'>
            <Header/>
            <GameScoreBoard totalScore={totalScore}/>
            <div className='gameBody'>
                <canvas ref={canvasRef} />
            </div>
            <div className='gameBtnContainer'>
                <button className='resetBtn' onClick={reset}>다시하기</button>
            </div>
            <Footer/>
        </div>
    )
}

export default React.memo(SuikaGame)