import React, { useState, useEffect, useRef, Suspense } from "react";
import Gallery from "./Components/Gallery";
import SearchBar from "./Components/SearchBar";
import { DataContext } from './Context/DataContex'
import { SearchContext } from './Context/SearchContex'
import Spinner from './Components/Spinner'; 





function App() {
    const [data, setData] = useState([])
    const [message, setMessage] = useState('Search for Music!')
    const [resource, setResource] = useState(null);
    const searchInput = useRef('');

    const fetchSearch = async (term) => {
        const url = encodeURI(`https://itunes.apple.com/search?term=${term}`);
        document.title = `${term} Music`;
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data.results;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data with the actual search term
                const results = await fetchSearch(resource);
                setData(results);
            } catch (error) {
                console.error("Error fetching data:", error);
                setMessage("Failed to fetch data");
            }
        };

        fetchData();
    }, [resource]); // Run the effect whenever resource changes

    const handleSearch = (e, term) => {
        e.preventDefault();
        if (term) {
            setResource(term); // Set resource to the search term
        } else {
            setMessage("Please enter a search term");
        }
    };

    const renderGallery = () => {
        if (data) {
            return (
                <Suspense fallback={<Spinner />}> 
                    <Gallery data={data} />
                </Suspense>
            )
        }
    }


    return (
        <div className="App">
            <SearchContext.Provider value={{
                term: searchInput,
                handleSearch: handleSearch
            }}>
                <SearchBar />
            </SearchContext.Provider>
            {message}
            <DataContext.Provider value={data}>
                <Gallery />
            </DataContext.Provider>
        </div>
    );
}

export default App;
