import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { fetchFromAPI } from '../utils/api';
import { BiVideo } from "react-icons/bi";
import { GrFormView } from "react-icons/gr";
import { BsYoutube } from "react-icons/bs";
import VideoSearch from '../components/video/VideoSearch';

const Channel = () => {
    const { channelId } = useParams();
    const [channelDetail, setchannelDetail] = useState();
    const [ channelVideo, setChannelVideo ] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const data = await fetchFromAPI(`channels?part=snippet&id=${channelId}`);
                setchannelDetail(data.items[0]);

                const videosData = await fetchFromAPI(`search?channelId=${channelId}&part=snippet&order=date`);
                setChannelVideo(videosData.items);
                

            } catch (error) {
                console.log("Error fetching data", error);
            }
        }
        fetchResults();
    }, [channelId]);

    return (
        <section id='channel'>
            {channelDetail && (
                <div className='channel__inner'>
                    <div className='channel__header' style={{ backgroundImage: `url(${channelDetail.brandingSettings.image.bannerExternalUrl})` }}>
                        <div className='circle'>
                            <img src={channelDetail.snippet.thumbnails.high.url} alt="{channelDetail. snippet.title}" />
                        </div>
                    </div>
                    <div className="channel__info">
                        <h3 className='title'>{channelDetail.snippet.title}</h3>
                        <p className='desc'>{channelDetail.snippet.description}</p>
                        <div className='info'>
                            <span><BsYoutube />{channelDetail.statistics.subscriberCount}</span><br />
                            <span><BiVideo />{channelDetail.statistics.videoCount}</span><br />
                            <span><GrFormView />{channelDetail.statistics.viewCount}</span>
                        </div>
                    </div>
                    <div className="channel__video video__inner">
                        <VideoSearch videos={channelVideo} />
                    </div>
                    <div className="channel__more"></div>
                </div>
            )}
        </section>
    )
}

export default Channel