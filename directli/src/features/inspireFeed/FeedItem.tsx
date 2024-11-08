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
import image from '../../assets/verticalWoman.jpg'
import { FeedItemProps } from '../types.ts'

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

export default function FeedItem({details}: FeedItemProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 500, display: 'flex', flexDirection: 'column'}}>
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
        title={details.title}
        subheader={details.date}
      />
      <CardMedia
        component="img"
        height="300"
        image={image}
        alt="Confession"
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {details.brief}
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
            {details.desc}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Post type: <strong>{details.postType}</strong> <br></br>
            Any verified creator can submit a post and get paid instantly.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Submission requirements: <br></br>
            Post Length: <strong>{details.postLenMin} - {details.postLenMax} seconds</strong> <br></br>
            {details.gender !== undefined ? <div>Gender: <strong>{details.gender}</strong> <br></br></div> : <div></div>}
            {details.lighting !== undefined ? <div>Lighting: <strong>{details.lighting}</strong></div> : <div></div>}
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Rights/Limitations:<br></br>
            Public Use: {details.rights}<br></br>
            Copyright: {details.copy}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
