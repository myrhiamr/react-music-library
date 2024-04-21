import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

function ArtistView() {
    const { id } = useParams()
    const [albums, setAlbums] = useState([])

    useEffect(() => {
        const fetchArtistData = async () => {
            try {
                const API_URL = `http://localhost:4000/album/${id}`
                const response = await fetch(API_URL)
                if (!response.ok) {
                    throw new Error('Failed to fetch artist data')
                }
                const data = await response.json()
                setAlbums(data.results)
            } catch (error) {
                console.error('Error fetching artist data:', error)
                // Handle error (e.g., display an error message)
            }
        }
        fetchArtistData()
    }, [id])

    const renderAlbums = albums.map((album, i) => (
        <div key={i}>
            <Link to={`/album/${album.collectionId}`}>
                <p>{album.collectionName}</p>
            </Link>
        </div>
    ))

    return (
        <div>
            <h2>Artist View</h2>
            <p>Artist ID: {id}</p>
            {renderAlbums}
        </div>
    )
}

export default ArtistView
