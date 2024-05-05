import styles from "./skeleton.module.css";
import Link from 'next/link';

const Skeleton = () => {
  return (
    <Link href="#">
        <div className={styles.box}>
            <span>
                <h2 className={`${styles.skeleton} ${styles.skeletontitel}`}>Loading...</h2>
                <br />
                <div className={`${styles.skeleton} ${styles.skeletontext}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletontext}`}></div>
                <br />
                <div className={`${styles.skeleton} ${styles.skeletontext}`}></div>
                <div className={`${styles.skeleton} ${styles.skeletontext}`}></div>
                <section className={styles.boximage}>
                    <div className={`${styles.skeleton} ${styles.skeletonimage}`}></div>
                </section>
            </span>
        </div>
    </Link>
  )
}

export default Skeleton