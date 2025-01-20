import React, { useState } from 'react';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import the gRPC client and request
import { SearchServiceClient } from '../../components/generated/SearchServiceClientPb';
import { SearchRequest } from '../../components/generated/search_pb';

function HomePage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [results, setResults] = useState([]);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        const client = new SearchServiceClient('http://localhost:8080'); // gRPC-web proxy URL

        const request = new SearchRequest();
        request.setQuery(searchTerm);

        // Clear previous error
        setError('');

        client.searchQuestions(request, {}, (err, response) => {
            if (err) {
                console.error('gRPC Error:', err);
                setError('An error occurred while fetching the results.');
            } else {
                setResults(response.getQuestionsList());
            }
        });
    };

    return (
        <div className="home">
            <h1>Welcome to Project SpeakX</h1>
            <p>This is a platform to help users learn and practice speaking in various languages.</p>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for a question"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={handleSearch}>Search</button>
            </div>

            {error && <div className="error">{error}</div>}

            <div className="results">
                <ul>
                    {results.map((question, index) => (
                        <li key={index}>
                            <strong>{question.title}</strong> ({question.type}) - Solution: {question.solution}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default HomePage;
