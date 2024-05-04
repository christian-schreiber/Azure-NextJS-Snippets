import styles from "./dropzonecard.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";

const Dropzonecard = ({ text }) => {
    return (
        <div className={styles.wrapper}>
            <h1>UPLOAD YOUR FILES</h1>
            <div className={styles.dropzonecard}>
                <section className={styles.dropzoneicon}>
                    <AiOutlineCloudUpload />
                </section>
                {text}                
            </div>
        </div>
    )
  }
  
  export default Dropzonecard