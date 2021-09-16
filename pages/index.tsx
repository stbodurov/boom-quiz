import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.scss'
import Prism from "prismjs"
import questions from './api/questions.json';

import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [time, setTime] = useState(30);

  useEffect(() => {
    Prism.highlightAll();

    const interval = setInterval(() => {
      setTime(time - 1);
    }, 1000);

    if (time === 60) {
      handleClick(false);
    }

    return function cleanup() {
      clearInterval(interval);
    };
  })

  function handleClick(isCorrect) {
    setTime(30);

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
    setTime(30);
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

      <div className={styles.main}>
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
            <div className={styles.timeIndicator} style={{ width: `${time / 30 * 100}%` }} />
            <AnimatePresence>
              <motion.div
                className={styles.modal}
                key={currentQuestion}
                initial={{
                  y: 50,
                  opacity: 0
                }}
                animate={{
                  y: 0,
                  opacity: 1
                }}
                transition={{ ease: "easeOut", duration: 1 }}
                exit={{ opacity: 0, display: 'none' }}
              >
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
              </motion.div>
            </AnimatePresence>
          </>
        )}
      </div>
    </div>
  )
}