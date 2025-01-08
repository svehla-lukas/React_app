import 'leaflet/dist/leaflet.css'

import React, { useEffect, useRef, useState } from 'react'

import leaflet from 'leaflet'

const apiKeyMapsCz = process.env.REACT_APP_MAPS_CZ_API_KEYs

const MapsCZ = () => {
  const mapRef = useRef<leaflet.Map | null>(null)

  const [editingMarker, setEditingMarker] = useState<any>(null)

  const [markersMap, setMarkersMap] = useState<Map<number, any>>(new Map())

  useEffect(() => {
    // Inicializace mapy

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
      const { lat, lng } = e.latlng

      addMarker(lat, lng, 'Nový bod', 'Popis nového bodu', 'https://example.com/image.jpg')
    })

    return () => {
      mapRef.current?.remove()
    }
  }, [])

  // Monitoruj změny v markersMap a loguj

  useEffect(() => {
    console.log('Updated markersMap:', Array.from(markersMap.keys()))
  }, [markersMap])

  const addMarker = (
    lat: number,

    lng: number,

    title: string,

    description: string,

    imageUrl: string
  ) => {
    if (mapRef.current) {
      const markerId = Date.now()

      const customIcon = leaflet.icon({
        iconUrl: 'https://cdn-icons-png.flaticon.com/512/149/149060.png',

        iconSize: [24, 24],

        iconAnchor: [16, 32],
      })

      const marker = leaflet

        .marker([lat, lng], { icon: customIcon, draggable: true })

        .addTo(mapRef.current)

      setMarkersMap(prev => {
        const updatedMap = new Map(prev)

        updatedMap.set(markerId, { lat, lng, title, description, imageUrl, marker })

        return updatedMap
      })

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

      marker.on('dragend', event => {
        const newLatLng = event.target.getLatLng()

        setMarkersMap(prev => {
          const updatedMap = new Map(prev)

          const markerData = updatedMap.get(markerId)

          if (markerData) {
            updatedMap.set(markerId, { ...markerData, lat: newLatLng.lat, lng: newLatLng.lng })
          }

          return updatedMap
        })
      })

      marker.on('popupopen', () => {
        setEditingMarker(marker)
      })
    }
  }

  const handleEditMarker = (markerId: number) => {
    setMarkersMap(prev => {
      const updatedMap = new Map(prev)

      const markerData = updatedMap.get(markerId)

      if (markerData) {
        const newTitle = prompt('Zadejte nový název:', markerData.title) || markerData.title

        const newDescription =
          prompt('Zadejte nový popis:', markerData.description) || markerData.description

        const newImageUrl =
          prompt('Zadejte novou URL obrázku:', markerData.imageUrl) || markerData.imageUrl

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

      <div>
        <h3>Seznam markerů:</h3>

        <ul>{renderMarkersList()}</ul>
      </div>
    </div>
  )
}

export default MapsCZ
