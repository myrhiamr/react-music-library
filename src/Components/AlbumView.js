import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

function AlbumView() {
    const { id } = useParams()
    const [songs, setSongs] = useState([])

    useEffect(() => {
        const fetchAlbumData = async () => {
            try {
                const API_URL = `http://localhost:4000/song/${id}`
                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error('Failed to fetch album data')
                }
                const data = await response.json()
                setSongs(data.results)
            } catch (error) {
                console.error('Error fetching album data:', error)
                // Handle error (e.g., display an error message)
            }
        }
        fetchAlbumData()
    }, [id])

    const renderSongs = songs.map((song, i) => (
        <div key={i}>
            <p>{song.trackName}</p>
        </div>
    ))

    return <div>{renderSongs}</div>
}

export default AlbumView
