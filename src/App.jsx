import React, { useState, useEffect } from 'react';

function App() {
    const [sessionMinute, setSessionMinute] = useState(25);
    const [sessionSecond, setSessionSecond] = useState(0);
    const [breakMinute, setBreakMinute] = useState(5);
    const [breakSecond, setBreakSecond] = useState(0);
    const [isSessionActive, setIsSessionActive] = useState(true);
    const [counter, setCounter] = useState(false);

    const [sessionTime, setSessionTime] = useState(25)
    const [breakTime, setBreakTime] = useState(5)

    const playBeep = () => {
      const beep = document.getElementById('beep');
      beep.play();

      setTimeout(() => {
        beep.pause();
        beep.currentTime = 0; // Sesin başa dönmesini sağla
      }, 2000); // 3 saniye (3000 milisaniye)
    };


    useEffect(() => {
        let interval;
        if(counter){
          if (isSessionActive) {
              interval = setInterval(() => {
                  if (sessionSecond === 0) {
                      if (sessionMinute === 0) {
                          clearInterval(interval);
                          setIsSessionActive(false);
                          setBreakMinute(breakTime); 
                          setBreakSecond(0);
                          playBeep()
                      } else {
                          setSessionMinute(prevMinute => prevMinute - 1);
                          setSessionSecond(59);
                      }
                  } else {
                      setSessionSecond(prevSecond => prevSecond - 1);
                  }
              }, 1000);
          } else {
              interval = setInterval(() => {
                  if (breakSecond === 0) {
                      if (breakMinute === 0) {
                          clearInterval(interval);
                          setIsSessionActive(true);
                          setSessionMinute(sessionTime); 
                          setSessionSecond(0);
                          playBeep()
                      } else {
                          setBreakMinute(prevMinute => prevMinute - 1);
                          setBreakSecond(59);
                      }
                  } else {
                      setBreakSecond(prevSecond => prevSecond - 1);
                  }
              }, 1000);
          }
      }
        return () => clearInterval(interval);
    }, [counter, isSessionActive, sessionMinute, sessionSecond, breakMinute, breakSecond, sessionTime, breakTime]);

    function toggleTimer() {
        setCounter(prevState => !prevState);
    }

    function resetTimer(){
      setIsSessionActive(true);
      setSessionMinute(25)
      setSessionSecond(0)
      setBreakSecond(0);
      setBreakMinute(5)
      setSessionTime(25)
      setBreakTime(5)
      setCounter(false); 
      beep.pause();
    }

    const arrangeSessionTime = (operator) => {
      if (!counter) {
        if (operator === "+" && sessionTime < 60 && sessionMinute < 60) {
          setSessionTime(prev => prev + 1);
          setSessionMinute(prev => prev + (1 + sessionTime - sessionMinute));
          setSessionSecond(0);
        } else if (operator === "-" && sessionTime > 1 && sessionMinute > 1) {
          if (sessionSecond === 0) {
            setSessionTime(prev => prev - 1);
            setSessionMinute(prev => prev - (1 + sessionTime - sessionMinute));
          } else {
            setSessionSecond(0);
            setSessionTime(prev => prev - 1);
          }
        }
      }
    }

    const arrangeBreakTime = (operator) => {
      if (!counter) {
        if (operator === "+" && breakTime < 60 && breakMinute < 60) {
          setBreakTime(prev => prev + 1);
          setBreakMinute(prev => prev + (1 + breakTime - breakMinute));
          setBreakSecond(0);
        } else if (operator === "-" && breakTime > 1 && breakMinute >1) {
          if (breakSecond === 0) {
            setBreakTime(prev => prev - 1);
            setBreakMinute(prev => prev - (1 + breakTime - breakMinute));
          } else {""
            setBreakSecond(0);
            setBreakTime(prev => prev - 1);
          }
        }
      }
    }

    return (
        <>
            <main>
                <div className="arrange--container aOne">
                    <div className='arrange--session arrange'>
                      <div className="align--settings">
                        <div><h3>Session Time</h3></div>
                        <div id="session-label"><p id="session-length">{sessionTime}</p></div>
                        <div className="buttons-align">
                          <button className='arrange-buttons buttonOne' id="session-increment" onClick={() => arrangeSessionTime("+")}>+</button>
                          <button className='arrange-buttons buttonTwo' id="session-decrement" onClick={() => arrangeSessionTime("-")}>-</button>
                        </div>
                      </div>
                    </div>
                  </div>
                <div className='timer--area'>
                <div className="counter">
                    <div id="time-left">
                        {isSessionActive
                            ? (
                                <>
                                    {sessionMinute < 10 ? '0' + sessionMinute : sessionMinute}:
                                    {sessionSecond < 10 ? '0' + sessionSecond : sessionSecond}
                                </>
                            )
                            : (
                                <>
                                    {breakMinute < 10 ? '0' + breakMinute : breakMinute}:
                                    {breakSecond < 10 ? '0' + breakSecond : breakSecond}
                                </>
                            )
                        }
                    </div>
                    <div id="timer-label">{isSessionActive ? 'Session' : 'Break'}</div>
                  </div>
                  <h1>FCC - Pomodoro Timer</h1>
                  <div className="counter--buttons">
                    <button className="counter--button cOne" id="start_stop" onClick={toggleTimer}>{counter ? 'Pause' : 'Start'}</button>
                    <button className="counter--button cTwo" id="reset" onClick={resetTimer}>Reset</button>
                  </div>
              </div>
              <div className="arrange--container aTwo">
                <div className='arange--break arrange'>
                    <div className="align--settings">
                      <h3>Break Time</h3>
                      <div id="break-label"><p id="break-length">{breakTime}</p></div>
                      <div className="buttons-align">
                        <button className='arrange-buttons buttonOne' id="break-increment" onClick={() => arrangeBreakTime("+")}>+</button>
                        <button className='arrange-buttons buttonTwo' id="break-decrement" onClick={() => arrangeBreakTime("-")}>-</button>
                      </div>
                    </div>
                  </div>
              </div>
              <div className="darker"></div>


              <audio id="beep" src="https://cdn.freesound.org/previews/233/233645_1752933-lq.ogg" type="audio/mpeg" preload="auto"></audio>
                
            </main>
        </>
    );
}

export default App;
