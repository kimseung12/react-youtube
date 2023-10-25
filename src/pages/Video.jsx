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
    const [videoComments, setVideoComments] = useState([]);
    const [showAllComments, setShowAllComments] = useState(false); // 추가: 댓글을 모두 보이게 할지 여부

    useEffect(() => {
        fetchFromAPI(`videos?part=snippet,statistics&id=${videoId}`)
            .then((data) => {
                setVideoDetail(data.items[0]);
                console.log(data);
            });
        fetchFromAPI(`commentThreads?key=36c0488b9bmsha694c50fc1a58dap12df45jsn98128f857dfb&videoId=${videoId}&part=snippet`)
            .then((data) => {
                const comments = data.items.slice(0, 20);
                console.log(comments);
                setVideoComments(comments);
            });
    }, [videoId]);

     // "접기" 버튼 클릭 시 댓글 표시 여부를 토글
     const toggleComments = () => {
        setShowAllComments(!showAllComments);
    };

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
                    <div className="video__comments">
                        {videoComments.map((comment, index) => (
                            <div key={index} className={`comment ${!showAllComments && index >= 10 ? 'hidden' : ''}`}>
                                <p>💭 {comment.snippet.topLevelComment.snippet.authorDisplayName} : {comment.snippet.topLevelComment.snippet.textOriginal}</p>
                            </div>
                        ))}
                        <button onClick={toggleComments}>
                            {showAllComments ? '접기' : '더 보기'}
                        </button>
                    </div>
                </div>
            )}
        </section>
    )
}

export default Video