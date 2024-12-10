
import {Image} from "expo-image"


const preloadImages=()=>{
        //@ts-ignore
        Image.preload([
        {
            uri: "https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/swiggy.png",
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/zomato.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/bigbasket.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/instamart.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/friends.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/online.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/instant.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/others.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/clubexample.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/clubexample.png',
           
        },
        {
            uri: 'https://splitkaroassets.s3.ap-south-1.amazonaws.com/img/Group.png',
           
        },
    ])
}

export default  preloadImages;
