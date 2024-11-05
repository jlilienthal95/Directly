import { useState } from 'react'
import FeedItem from './FeedItem'

function Feed() {
  const feedItems = [];

  for(let i=0; i<4; i++){
    feedItems.push(<><FeedItem /><br></br></>)
  }
  return feedItems
}

export default Feed;