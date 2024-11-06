import { useEffect, useState } from 'react'

import { stringify } from 'querystring'

const useComponentDidMont = async () => {
  const response = await fetch('http://localhost:1234')
  console.log(response)
}

const HackerType = () => {
  const [pressKey, setPressKey] = useState(false)
  const [wikiText, setWikiText] = useState('')

  const handleKeyDown = (e: React.KeyboardEvent) => {
    e.key.length === 1 && /[a-zA-Z]/.test(e.key)
      ? (console.log(`You pressed: ${e.key}`), setPressKey(true))
      : setPressKey(false)
  }

  const fetchWikiContent = async () => {
    const response = await fetch('http://localhost:1234')
    console.log(response)
    setWikiText(await response.json())
  }

  return (
    <div>
      <div
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={{ padding: '20px', border: '1px solid black' }}
      >
        <h1>Hacker Type</h1>
        <h2>{pressKey ? 'ano' : 'ne'}</h2>
        <p>Last pressed key: {pressKey}</p>
      </div>
      <div>
        <button onClick={fetchWikiContent}>fetch data</button>
        <h2>Fetched Page Content</h2>
        <pre>{JSON.stringify(wikiText, null, 2)}</pre>
      </div>
    </div>
  )
}

export default HackerType
