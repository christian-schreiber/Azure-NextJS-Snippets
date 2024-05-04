import styles from "../ui/dashboard/dashboard.module.css";

const Dashboard = () => { 

  //Call the API to get the data from CosmosDB. Each Snipped will be a Card in the collection.

  return (
    <div className={styles.wrapper}>
        <div className={styles.main}>
            <h1>Azure NextJS Snippets</h1>
            
        </div>        
    </div>
  );
};

export default Dashboard;