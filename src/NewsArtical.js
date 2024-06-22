import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const placeholderImage = 'https://via.placeholder.com/800';

const ArticleDetail = () => {
  const { title } = useParams();
  const [article, setArticle] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const apiKey = 'cdf732c2cf194ad9b4fe6af8dd191e9c';
        const response = await axios.get(`https://newsapi.org/v2/everything?q=${encodeURIComponent(title)}&apiKey=${apiKey}`);
        
        if (response.data.articles.length > 0) {
          setArticle(response.data.articles[0]);
        } else {
          setError('Article not found.');
        }
      } catch (error) {
        setError('An error occurred while fetching the article.');
        console.error('Error fetching the article data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [title]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  if (!article) {
    return <p>Article not found.</p>;
  }

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
