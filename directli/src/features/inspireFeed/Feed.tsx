import FeedItem from './FeedItem'
import { GenderPreference, LightingRequirement, PostType } from '../enums';

const details = {
  title: 'Make a confession!',
  author: 'DatBoi2006',
  date: 'November 5, 2024',
  brief: 'Uh oh, time to confess! Put on your best "I\'m sorry!" face and make your submission now.',
  desc: 'Submit a short video of yourself making a confession about yourself or your life. Have fun with this prompt - keep it light and don\'t take yourself too seriously! Confession must be your own: no "confessing" on behalf of friends or family, please!',
  subReq: '',
  postLenMin: 20,
  postLenMax: 40,
  postType: PostType.Public,
  gender: GenderPreference.Female,
  lighting: LightingRequirement.RingLight,
  rights: 'Video will be displayed publically on the feed, viewable by anyone.',
  copy: 'Video will not be used for commercial purposes without explicit release from creators.'
}

function Feed() {
  const feedItems = [];
  for(let i=0; i<4; i++){
    feedItems.push(
      <>
        <FeedItem details={details} />
        <br></br>
      </>
    )
  }
  return feedItems
}

export default Feed;