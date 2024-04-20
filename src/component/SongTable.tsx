"use client";

import { ValueOf } from 'next/dist/shared/lib/constants';
import React, { useState } from 'react'

type SongTableProps = {
    nameVideo: string,
    views: string,
    thumbnail: string,
}

function SongTable(props: SongTableProps) {

    const { nameVideo, views, thumbnail } = props;

    const [number, setNumber] = useState<number>(0);

    const jsonData = [
        {
            "nameVideo": "１周年記念】ダダダダ天使／湊あくあ【歌ってみた】",
            "views": 20000000,
            "thumbnail": "https://i.ytimg.com/vi/DmURJdzr-Cc/default.jpg"
        },
        {
            "nameVideo": "Video2",
            "views": 20000000,
            "thumbnail": "https://i.ytimg.com/vi/DmURJdzr-Cc/default.jpg"
        },
        {
            "nameVideo": "Video3",
            "views": 20000000,
            "thumbnail": "https://i.ytimg.com/vi/DmURJdzr-Cc/default.jpg"
        },
    ];

    return (
        <div>
            {jsonData.map((data) => {
                return (
                        <tbody>

                            <tr key={data.nameVideo}>
                                <td className="border: 1px solid"><img src={data.thumbnail}></img></td>
                                <td className="border: 1px solid">{data.nameVideo}</td>
                                <td className="border: 1px solid">{data.views}</td>
                            </tr>
                        </tbody>
                );
            })}
        </div>
    );
}

export default SongTable