import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './home.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function HomePage() {
    const [query, setQuery] = useState('');
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);  // Track the current page
    const [totalQuestions, setTotalQuestions] = useState(0); // Total number of questions available

    const itemsPerPage = 5;  // Number of items visible per page

    // Memoized function to handle the search request using useCallback
    const handleSearch = useCallback(async () => {
        if (!query) return; // Prevent search if the query is empty
        setLoading(true);

        try {
            const response = await axios.get(`http://localhost:5000/api/questions?query=${query}&page=${page}&limit=${itemsPerPage}`);
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

    // Render MCQ options
    const renderMCQ = (options) => {
        if (!options || !Array.isArray(options)) {
            return <p>No options available</p>;
        }
        return (
            <div className="mcq-options">
                {options.map((option, index) => (
                    <div key={index} className="mcq-option">
                        <input type="radio" id={`option-${index}`} name="mcq" />
                        <label htmlFor={`option-${index}`}>{option.text}</label>
                    </div>
                ))}
            </div>
        );
    };

    // Render Anagram question (blocks to rearrange)
    const renderAnagram = (blocks) => {
        if (!blocks || !Array.isArray(blocks)) {
            return <p>No blocks available</p>;
        }
        return (
            <div className="anagram">
                <p>{blocks.map((block) => block.text).join(' ')}</p>
            </div>
        );
    };

    // Render Read Along question (just display title)
    const renderReadAlong = (title) => {
        return <div className="read-along">{title}</div>;
    };

    return (
        <div className="home">
            <h1>Welcome to Project SpeakX</h1>
            <p>This is a platform to help users learn and practice speaking in various languages.</p>

            <div className="search">
                <input
                    type="text"
                    placeholder="Search for a question"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)} // Update the query on input change
                />
                {/* Search button */}
                <button onClick={handleSearch} className="search-button">
                    Search
                </button>
            </div>

            {loading && <p>Loading...</p>}

            {questions.length === 0 && !loading && query && <p>No results found</p>}

            <div className="questions-list">
                {questions.length > 0 && !loading ? (
                    questions.map((question) => (
                        <div key={question._id} className="question-card">
                            <h3 className="question-title">{question.title}</h3>

                            {/* Handle different question types */}
                            {question.type === 'MCQ' && renderMCQ(question.options)}
                            {question.type === 'ANAGRAM' && renderAnagram(question.blocks)}
                            {question.type === 'READ_ALONG' && renderReadAlong(question.title)}

                            {/* Other question types can be handled here similarly */}
                        </div>
                    ))
                ) : null}
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
    );
}

export default HomePage;
