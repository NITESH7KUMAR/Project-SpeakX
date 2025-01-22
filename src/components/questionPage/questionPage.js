import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './questionPage.css';

function QuestionDetailPage() {
    const { questionId } = useParams(); // Get the question ID from the URL
    const [questionDetails, setQuestionDetails] = useState(null);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            try {
                console.log('Fetching Question ID:', questionId);
                const response = await axios.get(`http://localhost:5001/api/questions/${questionId}`);
                setQuestionDetails(response.data);
            } catch (error) {
                console.error('Error fetching question details:', error);
                setError('Failed to load question details. Please try again later.');
            } finally {
                setLoading(false); // Ensure loading stops
            }
        };

        fetchQuestionDetails();
    }, [questionId]);

    if (loading) {
        return <div className="loading">Loading question details...</div>;
    }

    if (error) {
        return (
            <div className="error">
                <p>{error}</p>
                <button onClick={() => window.location.reload()}>Retry</button>
            </div>
        );
    }

    // Handle MCQ Type
    const renderMCQOptions = () => {
        return questionDetails.options.map((option, index) => (
            <button key={`option-${index}`} disabled={!option.showInOption} style={{ backgroundColor: option.isCorrectAnswer ? 'green' : 'gray' }}>
                {option.text}
            </button>
        ));
    };

    // Handle ANAGRAM Type
    const renderAnagramBlocks = () => {
        return questionDetails.blocks.map((block, index) => (
            <span key={`block-${index}`} className="anagram-block">
                {block.text}
            </span>
        ));
    };

    return (
        <div className="question-detail-container">
            <h1>{questionDetails.title}</h1>
            <p>Type: {questionDetails.type}</p>

            {questionDetails.type === 'MCQ' && (
                <div className="mcq-options">
                    {renderMCQOptions()}
                </div>
            )}

            {questionDetails.type === 'ANAGRAM' && (
                <div className="anagram">
                    <p>Rearrange the following words:</p>
                    <div className="blocks">{renderAnagramBlocks()}</div>
                    <p>Solution: {questionDetails.solution}</p>
                </div>
            )}
        </div>
    );
}

export default QuestionDetailPage;
