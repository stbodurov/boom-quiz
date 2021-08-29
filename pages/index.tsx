import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import styles from '../styles/Home.module.scss'
import Prism from "prismjs"
import questions from './api/questions.json';

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    Prism.highlightAll();

    const interval = setTimeout(() => {
      setTime(time + 1);
    }, 1000);

    if (time === 60) {
      handleClick(false);
    }

    return function cleanup() {
      clearInterval(interval);
    };
  })

  const [ isMounted, setIsMounted ] = useState(true);

  const shouldRenderChild = useDelayUnmount(isMounted, 500);
    const mountedStyle = {opacity: 1, transition: "all 500ms cubic-bezier(0, 1, 0.5, 1)"};
    const unmountedStyle = {opacity: 0.5, transition: "all 500ms cubic-bezier(0, 1, 0.5, 1)"};

  function handleClick(isCorrect) {
    setIsMounted(isMounted);
    setTime(0);

    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      const nextQuestion = currentQuestion + 1;
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }

  function handleReset() {
    setScore(0);
    setShowScore(false);
    setCurrentQuestion(0);
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Boom Quiz</title>
        <meta name="description" content="Quiz app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main} style={isMounted ? mountedStyle : unmountedStyle}>
        {showScore ? (
          <div className={styles.modal}>
            <Image src="/result.png" alt="Achievement" width="100px" height="100px" />
            <h1 className={styles.title}>{`Your score is ${score}!`}</h1>
            <button className={styles.resetButton} onClick={() => handleReset()}>
              Retry
            </button>
          </div>
        ) : (
          <>
              <div className={styles.timeIndicator} style={{ width: `${time / 60 * 100}%` }} />
              <div className={styles.modal} key={currentQuestion}>

                <h1 className={styles.title}>{questions[currentQuestion].question}</h1>
                <div className={styles.questionDesc}>
                  <pre>
                    <code className="language-javascript">
                      {questions[currentQuestion].description}
                    </code>
                  </pre>
                </div>

                <div className={styles.choices}>
                  {questions[currentQuestion].choices.map(choice => (
                    <button key={choice.id} onClick={() => handleClick(choice.isCorrect)}>
                      <div>{choice.id}</div>
                      <pre>
                        <code className="language-javascript">
                          {choice.answer}
                        </code>
                      </pre>
                    </button>
                  ))}
                </div>
              </div>
            </>
        )}
      </main>
    </div>
  )
}


function useDelayUnmount(isMounted: boolean, delayTime: number) {
  const [ shouldRender, setShouldRender ] = useState(false);

  useEffect(() => {
      let timeoutId: any;
      if (isMounted && !shouldRender) {
          setShouldRender(true);
      }
      else if(!isMounted && shouldRender) {
          timeoutId = setTimeout(
              () => setShouldRender(false), 
              delayTime
          );
      }
      return () => clearTimeout(timeoutId);
  }, [isMounted, delayTime, shouldRender]);
  return shouldRender;
}