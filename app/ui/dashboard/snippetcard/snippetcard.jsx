import styles from "./snippetcard.module.css";

const Snippetcard = ({ result }) => {
  const data = result;
  const hasData = data && data.resources && data.resources.length > 0;
  const snippet = hasData ? data.resources[0] : null;

  return (
    <div className={styles.wrapper}>
        {result && (
          <div className={styles.cardtext}>
            {hasData && <h1 className={styles.element}>{snippet.snippetname}</h1>}
            <h3>Description</h3>
            {hasData && <p className={styles.element}>{snippet.longdescription}</p>}
            <h3>Main Code</h3>
            {hasData && <p className={styles.element}>{snippet.maincode}</p>}
            <h3>Azure Modules</h3>
            {hasData && <p className={styles.element}>{snippet.npmmodules}</p>}
            <h3>Azure Ressources</h3>
            {hasData && <p className={styles.element}>{snippet.azureressources && snippet.azureressources.join(' | ')}</p>}
            <h3>Tags</h3>
            {hasData && <p className={styles.element}>{snippet.tags && snippet.tags.join(' | ')}</p>}
          </div>
        )}
    </div>
  )
}

export default Snippetcard