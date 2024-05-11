"use client";

import useFetchVideoView from '@/app/hook/useFetchVideoView';
import Image from 'next/image';
import React, { useMemo } from 'react'
import {LoadingSpinner} from './LoadingSpinner';

function SongTable() {    
    const { videos, isFetching } = useFetchVideoView();

    console.log(videos)

    const sortedVideos = useMemo(() => {
        return videos?.sort((a: any, b: any) => {
            return b.statistics.viewCount - a.statistics.viewCount;
        });
    }, [videos])

    return (
        <div className="songTable">
        {
            (isFetching || !videos) ? 
            <LoadingSpinner /> :
            <table className='song'>
                <thead className='song'>
                    <tr>
                        <td className='song'>Ranking</td>
                        <td className='song'>Thumbnail</td>
                        <td className='song'>Title</td>
                        <td className='song'>Member</td>
                        <td className='song'>Views</td>
                    </tr>
                </thead>
                <tbody>
                {sortedVideos?.map((data: any, index: number) => {
                    const thumbnail = data.snippet.thumbnails.default;
                    const statistics = data.statistics;
                    const snippet = data.snippet; 
                    let nameListString = "";
                    for (let index = 0; index < data.mentions.length; index++) {
                        if (index == data.mentions.length-1) {
                            nameListString += data.mentions[index];
                        } else {
                            nameListString += data.mentions[index] + "<br/>";
                        } 
                    }



                    return (
                        <tr key={index}>
                            <td className='song'>{index+1}</td>
                            <td className='song'>
                                <a target="_blank" rel="noopener noreferrer" href={`https://youtube.com/watch?v=${data.id}`}>
                                    <Image src={thumbnail.url} alt='clipThumbnail' width={thumbnail.width} height={thumbnail.height}/>
                                </a>
                            </td>
                            <td className='song'>
                                <a target="_blank" rel="noopener noreferrer" href={`https://youtube.com/watch?v=${data.id}`}>
                                    {snippet?.title}
                                </a>
                            </td>
                            <td className='song'>
                                {/* <Image src={data.memberThumbnail} alt='memberThumbnail' width={100} height={75}/> */}
                                {
                                   data.mentions?.map((item:string) => {
                                    return (
                                        <li>
                                            {item}
                                        </li>
                                    )
                                   })
                                }
                            </td>
                            <td className='song'>{statistics.viewCount}</td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        }

      </div>
    );
}

export default SongTable