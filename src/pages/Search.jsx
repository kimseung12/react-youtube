import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const Search = () => {
    const [videos, setVideo] = useState([]);

    useEffect(() => {
        fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&key=AIzaSyCOyfh_n6Tq0Xb5zAXwz2HMNPJ3FC8WkCk")
            .then(response => response.json())
            .then(result => {
                console.log(result.items);

                result.items.forEach((video) => {
                    video.snippet.publishedAt = formatDate(video.snippet.publishedAt);
                });

                setVideo(result.items)
            })
            .catch(error => console.log(error))
    }, []);

    return (
        <section id='searchPage'>
            <h2>제목</h2>
            <div className='video__inner search'>
                {videos.map((video, key) => (
                    <div className='video' key={key}>
                        <div className='video__thumb'>
                            <Link
                                to='/video/videoId'
                                style={{ backgroundImage: `url(${video.snippet.thumbnails.high.url})` }}
                            >
                            </Link>
                        </div>
                        <div className='video__info'>
                            <h3 className='title'>
                                <Link to={`/video/${video.id.videoId}`}>{video.snippet.title}</Link>
                            </h3>
                            <p className='desc'>
                                {video.snippet.description}
                            </p>
                            <div className='info'>
                                <span className='author'>{video.snippet.channelTitle}</span>
                                <span className='date'>{video.snippet.publishedAt}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Search