import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import image from '../../assets/sampleWoman.jpg'

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

const details = {
  desc: '',
  postType: '',
  subReq: '',
  postLen: 0,
  Gender: '',
  Light: '',
  rights: ''
  }

export default function FeedItem() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Make a confession!"
        subheader="Posted November 4, 2024"
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt="Confession"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Uh oh, time to confess! Put on your best "I'm sorry!" face and make your submission now.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>
            Submit a short video of yourself making a confession about yourself or your life. Have fun with this prompt - keep it light and don't take yourself too seriously! Confession must be your own: no 'confessing' on behalf of friends or family, please!
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Post type: <strong>Public</strong> <br></br>
            Any verified creator can submit a post and get paid instantly.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Submission requirements: <br></br>
            Post Length: <strong>20 - 45 seconds</strong> <br></br>
            Gender: <strong>Female preferred</strong> <br></br>
            Lighting: <strong>Must have Ring light</strong>
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Rights/Limitations:<br></br>
            Public Use: Video will be displayed publically on the feed, viewable by anyone.
            Copyright: Video will not be used for commercial purposes without explicit release from creators.
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
