import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import img from '../assets/img.png';

function HomePage() {
    const [query, setQuery] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1); // Track the current page
    const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions available

    const itemsPerPage = 5; // Number of items visible per page

    const handleSearch = useCallback(async () => {
        if (!query) return; // Prevent search if the query is empty
        setLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:5001/api/questions?query=${query}&page=${page}&limit=${itemsPerPage}`
            );
            setQuestions(response.data.questions || []); // Ensure we set an empty array if no questions are returned
            setTotalQuestions(response.data.total || 0); // Assuming the backend sends the total number of questions available
        } catch (error) {
            console.error('Error fetching search results:', error);
        }

        setLoading(false);
    }, [query, page]);

    const handleNextPage = () => {
        if (questions.length === itemsPerPage) {
            setPage((prevPage) => prevPage + 1); // Go to next page if 5 items are loaded
        }
    };

    const handlePreviousPage = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1)); // Go to previous page if we're not at the first page
    };

    useEffect(() => {
        handleSearch(); // Fetch data on page change or query change
    }, [query, page, handleSearch]); // Re-run search on query or page change

    return (
        <div className="home-container">
            {/* Image Section */}
            <div className="image-section">
                <img src={img} alt="Learning Illustration" className="home-image" />
            </div>

            {/* Content Section */}
            <div className="content-section">
                <h1>Welcome to Project SpeakX</h1>
                <p>This is a platform to help users learn and practice speaking in various languages.</p>

                <div className="search">
                    <input
                        type="text"
                        placeholder="Search for a question"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)} // Update the query on input change
                    />
                    <button onClick={handleSearch} className="search-button">
                        Search
                    </button>
                </div>

                {loading && <p>Loading...</p>}
                {questions.length === 0 && !loading && query && <p>No results found</p>}

                <div className="questions-list">
                    {questions.map((question) => (
                        <div key={question._id} className="question-card">
                            <h3 className="question-title">{question.title}</h3>
                            {/* Render question details */}
                        </div>
                    ))}
                </div>

                <div className="pagination">
                    <button onClick={handlePreviousPage} disabled={page === 1}>
                        Previous
                    </button>
                    <span>
                        Page {page} of {Math.ceil(totalQuestions / itemsPerPage)}
                    </span>
                    <button
                        onClick={handleNextPage}
                        disabled={questions.length < itemsPerPage || page * itemsPerPage >= totalQuestions}
                    >
                        Next
                    </button>
                </div>
                <p>
                    Showing {Math.min(page * itemsPerPage, totalQuestions)} of {totalQuestions} results
                </p>
            </div>
        </div>
    );
}

export default HomePage;
