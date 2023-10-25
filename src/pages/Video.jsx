import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { fetchFromAPI } from '../utils/api';
import ReactPlayer from 'react-player';
import { GrFormView } from "react-icons/gr";
import { AiTwotoneLike } from "react-icons/ai";
import { BiCommentDots } from "react-icons/bi";

const Video = () => {
    const { videoId } = useParams();
    const [videoDetail, setVideoDetail] = useState(null);

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
    }, [videoId]);

    return (
        <section id='videoViewPage'>
            {videoDetail && (
                <div className='video__view'>
                    <div className='video__play'>
                        <h2>▶ {videoDetail.snippet.title}</h2>
                        <ReactPlayer
                            playing={true}
                            url={`https://www.youtube.com/watch?v=${videoId}`}
                            width='100%'
                            height='100%'
                            style={{ position: 'absolute', top: 0, left: 0 }}
                        />
                    </div>
                    <div className='video__info'>
                        <h2 className='video__title'>
                            {videoDetail.snippet.title}
                        </h2>
                        <div className='video__channel'>
                            <div className='id'>
                                <Link to={`/channel/${videoDetail.snippet.channelId}`}>{videoDetail.snippet.channelTitle}</Link>
                            </div>
                            <div className='count'>
                                <span className='view'><GrFormView />{videoDetail.statistics.viewCount}
                                </span>
                                <span className='like'><AiTwotoneLike />{videoDetail.statistics.likeCount}
                                </span>
                                <span className='comment'><BiCommentDots />{videoDetail.statistics.commentCount}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='video__desc'>{videoDetail.snippet.description}</div>
                </div>
            )}
        </section>
    )
}

export default Video