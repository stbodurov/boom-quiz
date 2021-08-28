import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Boom Quiz</title>
        <meta name="description" content="Quiz app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.timeIndicator} />
        <div className={styles.questionModal}>
          <h1 className={styles.questionTitle}>Which is the missing line?</h1>
          <div>
            <p>item.addEventListener</p>
          </div>

          <div className={styles.choices}>
            <button>
              <div>A</div>
              <p>const item;</p>
            </button>
            <button>
              <div>B</div>
              <p>const item;</p>
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}
