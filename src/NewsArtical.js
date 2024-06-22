import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const placeholderImage = 'https://via.placeholder.com/800'; // Placeholder image URL

const ArticleDetail = () => {
  const { id } = useParams(); // Assuming id is the article title passed from News component
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [articleNotFound, setArticleNotFound] = useState(false); // State to track if article is not found

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiKey = 'cdf732c2cf194ad9b4fe6af8dd191e9c'; // Replace with your actual API key
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(id)}&apiKey=${apiKey}`);
        
        if (response.data.articles.length > 0) {
          setArticle(response.data.articles[0]); // Assuming the first article is the one you want
          setArticleNotFound(false); // Reset article not found state
        } else {
          setArticleNotFound(true); // Set article not found state
        }
      } catch (error) {
        setError('An error occurred while fetching the article.');
        console.error('Error fetching the article data:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching is done
      }
    };

    fetchArticle();
  }, [id]); // Depend on id to fetch article

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  // Display article not found message if no article found
  if (articleNotFound) {
    return <p>Article not found.</p>;
  }

  // Display article details when available
  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      <img src={article.urlToImage || placeholderImage} alt="Article" />
      <p>{article.content}</p>
      <a href={article.url} target="_blank" rel="noopener noreferrer">Read full article</a>
    </div>
  );
};

export default ArticleDetail;
