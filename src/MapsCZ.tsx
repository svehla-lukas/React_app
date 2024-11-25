import 'leaflet/dist/leaflet.css'

import {
  BoldText,
  Button,
  Container,
  GridContainer,
  Heading2,
  Heading3,
  Input,
  LoadingPlaceholder,
  SquareButtonCard,
  Text12,
} from './Styles'
import React, { useEffect, useRef, useState } from 'react'

import leaflet from 'leaflet'

const apiKeyMapsCz = process.env.REACT_APP_MAPS_CZ_API_KEY

type MarkerData = {
  lat: number
  lng: number
  title: string
  description: string
  imageUrl: string
}

const MapsCZ = () => {
  const mapRef = useRef<leaflet.Map | null>(null)
  const [markersMap, setMarkersMap] = useState<Map<number, any>>(new Map())

  // Save markers to localStorage
  useEffect(() => {
    const savedMarkers = localStorage.getItem('markers')
    if (savedMarkers) {
      const parsedMarkers = JSON.parse(savedMarkers) as {
        id: number
        lat: number
        lng: number
        title: string
        description: string
        imageUrl: string
      }[]

      parsedMarkers.forEach(({ id, lat, lng, title, description, imageUrl }) => {
        // Zkontrolujeme, jestli je mapa inicializovaná
        if (mapRef.current) {
          addMarker(lat, lng, title, description, imageUrl, id)
        } else {
          console.error('Map is not initialized. Skipping marker:', id)
        }
      })
    }
  }, [])

  useEffect(() => {
    const savedMarkers = localStorage.getItem('markers')
    if (savedMarkers) {
      const parsedMarkers = JSON.parse(savedMarkers) as {
        id: number
        lat: number
        lng: number
        title: string
        description: string
        imageUrl: string
      }[]

      const restoredMap = new Map<number, MarkerData>()
      parsedMarkers.forEach(({ id, lat, lng, title, description, imageUrl }) => {
        addMarker(lat, lng, title, description, imageUrl, id)
        restoredMap.set(id, { lat, lng, title, description, imageUrl })
      })

      setMarkersMap(restoredMap) // Inicializace stavu
    }
  }, [])

  useEffect(() => {
    mapRef.current = leaflet.map('map').setView([49.2137, 16.9105], 20)
    leaflet
      .tileLayer(`https://api.mapy.cz/v1/maptiles/aerial/256/{z}/{x}/{y}?apikey=${apiKeyMapsCz}`, {
        minZoom: 0,
        maxZoom: 20,
        attribution:
          '<a href="https://api.mapy.cz/copyright" target="_blank">&copy; Seznam.cz a.s. a další</a>',
      })
      .addTo(mapRef.current)

    mapRef.current.on('click', e => {
      if (e.originalEvent.ctrlKey) {
        // Check if 'Ctrl' is pressed
        const { lat, lng } = e.latlng
        addMarker(
          lat,
          lng,
          'New Marker',
          'Description of the marker',
          'https://example.com/image.jpg'
        )
      }
    })
    return () => {
      mapRef.current?.remove()
    }
  }, [])

  // const baseLayers = {
  //   Satellite: leaflet.tileLayer(
  //     `https://api.mapy.cz/v1/maptiles/aerial/256/{z}/{x}/{y}?apikey=${apiKeyMapsCz}`
  //   ),
  //   Standard: leaflet.tileLayer(
  //     `https://api.mapy.cz/v1/maptiles/base/256/{z}/{x}/{y}?apikey=${apiKeyMapsCz}`
  //   ),
  // }

  const addMarker = (
    lat: number,
    lng: number,
    title: string = 'New Marker',
    description: string = 'Marker Description',
    imageUrl: string = 'https://cdn-icons-png.flaticon.com/512/149/149060.png',
    id: number = Date.now()
  ) => {
    if (!mapRef.current) {
      console.error('Map is not initialized. Cannot add marker.')
      return
    }

    const markerId = id

    const customIcon = leaflet.icon({
      iconUrl: imageUrl,
      iconSize: [24, 24],
      iconAnchor: [16, 32],
    })

    const marker = leaflet
      .marker([lat, lng], { icon: customIcon, draggable: true })
      .addTo(mapRef.current!)

    const popupContent = document.createElement('div')
    popupContent.innerHTML = `
      <h3>${title}</h3>
      <p>${description}</p>
      <img src="${imageUrl}" alt="${title}" style="width: 100%; height: auto;" />
    `

    const editButton = document.createElement('button')
    editButton.innerText = 'Edit'
    editButton.onclick = () => handleEditMarker(markerId)
    popupContent.appendChild(editButton)

    const deleteButton = document.createElement('button')
    deleteButton.innerText = 'Delete'
    deleteButton.onclick = () => handleDeleteMarker(markerId)
    popupContent.appendChild(deleteButton)

    marker.bindPopup(popupContent)

    setMarkersMap(prev =>
      new Map(prev).set(markerId, { lat, lng, title, description, imageUrl, marker })
    )
  }

  const handleAddMarkerClick = () => {
    const lat = 49.2137 // Default latitude
    const lng = 16.9105 // Default longitude
    addMarker(lat, lng, 'New Marker', 'Description', 'https://example.com/image.jpg')
  }

  const handleEditMarker = (markerId: number) => {
    setMarkersMap(prev => {
      const updatedMap = new Map(prev)
      const markerData = updatedMap.get(markerId)
      if (markerData) {
        let newTitle = prompt('Zadejte nový název:', markerData.title)
        if (!newTitle) newTitle = markerData.title

        let newDescription = prompt('Zadejte nový popis:', markerData.description)
        if (!newDescription) newDescription = markerData.description

        let newImageUrl = prompt('Zadejte novou URL obrázku:', markerData.imageUrl)
        if (!newImageUrl || !newImageUrl.startsWith('http')) newImageUrl = markerData.imageUrl

        markerData.marker.setPopupContent(`
          <div>
            <h3>${newTitle}</h3>
            <p>${newDescription}</p>
            <img src="${newImageUrl}" alt="${newTitle}" style="width: 100%; height: auto;" />
          </div>
        `)

        updatedMap.set(markerId, {
          ...markerData,
          title: newTitle,
          description: newDescription,
          imageUrl: newImageUrl,
        })
      }
      return updatedMap
    })
  }

  const handleDeleteMarker = (markerId: number) => {
    setMarkersMap(prev => {
      const updatedMap = new Map(prev)
      const markerData = updatedMap.get(markerId)
      if (markerData) {
        mapRef.current?.removeLayer(markerData.marker)
        updatedMap.delete(markerId)
      }
      return updatedMap
    })
  }

  const renderMarkersList = () => {
    return Array.from(markersMap.entries()).map(([id, markerData]) => (
      <li key={id}>
        {id} - <strong>{markerData.title}</strong>: {markerData.description} (Lat: {markerData.lat},
        Lng: {markerData.lng})
      </li>
    ))
  }

  return (
    <div>
      <div id='map' style={{ height: '50vh', width: '100%' }}></div>
      {/* <button onClick={handleAddMarkerClick}>Add Marker</button> */}
      <Container flexDirection='row'>
        <Container>
          <Heading3>Marker List:</Heading3>
          <ul>
            {Array.from(markersMap.entries()).map(([id, markerData]) => (
              <li key={id}>
                {markerData.title}: {markerData.description} (Lat: {markerData.lat}, Lng:{' '}
                {markerData.lng})
              </li>
            ))}
          </ul>
        </Container>
        <Container>
          <Heading3>Legend:</Heading3>
          <ul>
            <li>
              <strong>Ctrl+Click:</strong> Add marker
            </li>
            <li>
              <strong>Drag:</strong> Move marker
            </li>
            <li>
              <strong>Edit:</strong> Modify marker title/description
            </li>
            <li>
              <strong>Delete:</strong> Remove marker
            </li>
          </ul>
        </Container>
      </Container>
    </div>
  )
}

export default MapsCZ
