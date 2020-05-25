import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

//size of the notification list
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        maxWidth: 752,
    },
    demo: {
        backgroundColor: theme.palette.background.paper,
    },
    title: {
        margin: theme.spacing(4, 0, 2),
    },
}));

//generating the list items
function generate(element) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

//count for the likes and dislikes
var up = 0
var down = 0
const thumbsup = () => {
    up++
    console.log(up)
}
const thumbsdown = () => {
    down++
    console.log(down)
}
export default function InteractiveList() {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);
    const [secondary, setSecondary] = React.useState(false);

    return (
        <div className={classes.root}>

            <Grid item xs={12} md={12} className="center">
                <Typography variant="h6" className={classes.title}>
                    Notifications
          </Typography>
                <div className={classes.demo}>
                    <List dense={dense}>
                        {generate(
                            //the list 
                            <ListItem>
                                <ListItemText
                                    primary="04/05/2020, 19:58 , Storage, Sump1, Water level reached 80% (20Kl)"
                                    secondary={secondary ? 'Secondary text' : null}
                                />
                                <ListItemSecondaryAction>
                                    <IconButton edge="end" aria-label="delete" onClick={thumbsup}>
                                        <ThumbUpIcon style={{ color: "green" }}></ThumbUpIcon>
                                    </IconButton>
                                    <IconButton edge="end" aria-label="delete" onClick={thumbsdown}>
                                        <ThumbDownIcon style={{ color: "red" }}></ThumbDownIcon>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>,
                        )}
                    </List>
                </div>
            </Grid>

        </div>
    );
}