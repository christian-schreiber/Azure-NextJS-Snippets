const Snippetcard = ({ result }) => {
  return (
    <div>
      <pre>{JSON.stringify(result, null, 2)}</pre>
    </div>
  )
}

export default Snippetcard