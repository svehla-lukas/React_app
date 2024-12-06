import { Button, Container } from './Styles'
import React, { useState } from 'react'

import { stringify } from 'querystring'
import { title } from 'process'

type BondsterData = {
  id: string
  title: string
  link: string
}

type BondsterPage = {
  id: string
  title: string
  type: string
  status: string
  contentHtml: string
  link: string
  apiLink: string
  body?: {
    storage: {
      value: string
      representation: string
    }
  }
}

// fetch from MAIN
const Bondster = () => {
  const [data, setData] = useState('No_data')
  const [mainMenu, setMainMenu] = useState<BondsterData[]>([])
  const [pageData, setPageData] = useState<BondsterPage>({
    id: '',
    title: '',
    type: '',
    status: '',
    contentHtml: '',
    link: '',
    apiLink: '',
    body: {
      storage: {
        value: '',
        representation: '',
      },
    },
  })

  const handleFetchBondster = async () => {
    console.log('handle main')
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 1_000)
    )
    try {
      const response = (await Promise.race([
        fetch('http://localhost:1234/BONDSTER'),
        timeout,
      ])) as Response
      if (!response.ok) throw new Error('Network response was not ok')
      const data: BondsterData[] = await response.json()
      setMainMenu(
        data.map(item => ({
          id: item.id,
          title: item.title,
          link: item.link,
        }))
      )
      console.log('mainMenu: ', mainMenu)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  const handleFetchPage = async (pageId: string) => {
    console.log(`'handle page ${pageId}: '`)
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 1_000)
    )

    try {
      const response = (await Promise.race([
        fetch(`http://localhost:1234/BONDSTER/${pageId}`),
        timeout,
      ])) as Response
      if (!response.ok) throw new Error('Network response was not ok')
      const data: BondsterPage = await response.json()
      console.log(data)
      setPageData({
        id: data.id,
        title: data.title,
        type: data.type ?? 'unknown',
        status: data.status ?? 'unknown',
        contentHtml: data.contentHtml ?? '',
        link: data.link,
        apiLink: data.apiLink ?? '',
        body: data.body,
      })

      console.log(`page ID '${pageId}: '`, data)

      // Ověření, zda element s id 'pageContent' existuje
      // const contentElement = document.getElementById('pageContent')
    } catch (error) {
      console.error('Error fetching page details:', error)
    }
  }

  const handlePersonalData = async () => {
    console.log('handle')
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Request timed out')), 1_000)
    )
    try {
      const response = (await Promise.race([
        fetch('http://localhost:1234/personalSpace'),
        timeout,
      ])) as Response
      if (!response.ok) throw new Error('Network response was not ok')
      const data = await response.json()
      setData(data)
      console.log(data)
    } catch (error) {
      console.error('Error fetching personal space data:', error)
      setData('null')
    }
  }

  return (
    <Container>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <Button type='submit' onClick={handleFetchBondster}>
          Fetch BODSTER
        </Button>
        <Button type='submit' onClick={handlePersonalData}>
          Fetch personal data
        </Button>
        <Button type='submit' onClick={() => handleFetchPage('1605710')}>
          Fetch ID 1605710
        </Button>
        <Container flexDirection='row' alignItems='flex-start'>
          <Container width='30%'>
            <h1>Main Menu</h1>
            <ul>
              {mainMenu.map(item => (
                <li key={item.id}>
                  <a
                    href='#'
                    onClick={event => {
                      event.preventDefault()
                      handleFetchPage(item.id)
                    }}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </Container>
          <Container alignItems='flex-start' width='60%'>
            {pageData.id ? (
              <>
                <h1>{pageData.title}</h1>
                <p>Type: {pageData.type}</p>
                <p>Status: {pageData.status}</p>
                {pageData.body && pageData.body.storage.value ? (
                  <div dangerouslySetInnerHTML={{ __html: pageData.body.storage.value }} />
                ) : (
                  <p>No content available</p>
                )}
                <a href={pageData.link} target='_blank' rel='noopener noreferrer'>
                  View Page
                </a>
              </>
            ) : (
              <p>No data available</p>
            )}
          </Container>
          <Container width='10%'>
            {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
            {/* <pre>{JSON.stringify(pageData, null, 2)}</pre> */}
          </Container>
        </Container>
      </form>
    </Container>
  )
}
export default Bondster
