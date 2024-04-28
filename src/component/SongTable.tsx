"use client";

import useFetchHolo from '@/app/hook/useFetchHolo';
import useFetchVideoView from '@/app/hook/useFetchVideoView';
import useFetchYoutube from '@/app/hook/useFetchYoutube';
import { ValueOf } from 'next/dist/shared/lib/constants';
import React, { useState } from 'react'

// type SongTableProps = {
//     nameVideo?: string,
//     views?: number,
//     thumbnail?: string,
// }

// function SongTable(props: SongTableProps) {
function SongTable() {
    //const { nameVideo, views, thumbnail } = props;

    // const { videoStatistics } = useFetchData();
    

    const { youtubeViews, data } = useFetchVideoView();

    console.log(youtubeViews)

    const jsonData = [
        {
            "nameVideo": "【１周年記念】ダダダダ天使／湊あくあ【歌ってみた】",
            "views": 500,
            "thumbnail": "https://i.ytimg.com/vi/DmURJdzr-Cc/default.jpg",
            "member": "Minato Aqua",
            "memberThumbnail": "https://yt3.ggpht.com/ytc/AIdro_kaZLtKaya9TSJr3M4lpzV95R2rWdQtGk67fwedroUfSnE=s88-c-k-c0xffffffff-no-rj-mo"
        },
        {
            "nameVideo": "【original】海想列車／湊あくあ【アニメーションMV】",
            "views": 40000,
            "thumbnail": "https://i.ytimg.com/vi/tuWw5EQPGlc/default.jpg",
            "member": "Minato Aqua",
            "memberThumbnail": "https://yt3.ggpht.com/ytc/AIdro_kaZLtKaya9TSJr3M4lpzV95R2rWdQtGk67fwedroUfSnE=s88-c-k-c0xffffffff-no-rj-mo"
        },
        {
            "nameVideo": "【最終回】ぼっち・ざ・ろっく！同時視聴／BOCCHI THE ROCK!【湊あくあ/ホロライブ】",
            "views": 0,
            "thumbnail": "https://i.ytimg.com/vi/8mfs-004OAs/default.jpg",
            "member": "Minato Aqua",
            "memberThumbnail": "https://yt3.ggpht.com/ytc/AIdro_kaZLtKaya9TSJr3M4lpzV95R2rWdQtGk67fwedroUfSnE=s88-c-k-c0xffffffff-no-rj-mo"
        },
    ];

    jsonData.sort((item1,item2)=>item2.views-item1.views);

    return (
        <div className="songTable">
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
            {jsonData.map((data,index) => {
                if (index < 30) {
                    return (
                        <tr key={data.nameVideo}>
                            <td className='song'>{index+1}</td>
                            <td className='song'><img src={data.thumbnail}/></td>
                            <td className='song'>{data.nameVideo}</td>
                            <td className='song'><img src={data.memberThumbnail}/><br/>{data.member}</td>
                            <td className='song'>{data.views}</td>
                        </tr>
            );
                }
                
            })}
            </tbody>

            </table>
      </div>
    );
}

export default SongTable