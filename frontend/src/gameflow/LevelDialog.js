import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent
} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit / 2,
    },
    row: {
        display: 'flex',
        justifyContent: 'left',
        flexWrap: 'wrap',
    },
    buttonContent: {
        flex: 1,
        flexDirection: 'column',
    },
});

class LevelDialog extends React.Component
{
    state = {
        chipData: [
            {key: 1, label: "Level1"},
            {key: 2, label: "Level2"},
            {key: 3, label: "Level3"},
            {key: 4, label: "Level4"},
            {key: 5, label: "Level5"},
            {key: 6, label: "Level6"},
            {key: 7, label: "Level7"},
            {key: 8, label: "Level8"},
            {key: 9, label: "Level9"},
            {key: 10, label: "Level10"},
        ],
    };

    render()
    {
        const {classes} = this.props;
        return (
            <Dialog
                open = {this.props.open}
                onRequestClose = {this.props.onRequestClose}
            >
                <DialogTitle>Choose a level</DialogTitle>
                <DialogContent>
                    Default levels
                    <div className = {classes.row}>
                        {this.state.chipData.map(data =>
                        {
                            const star = <Star/>;
                            const starBorder = <StarBorder/>;
                            let stars = [starBorder, starBorder, starBorder];
                            for (let i = 0; i < Number(this.props.levelsInfo[data.key.toString()].stars); i++)
                            {
                                stars[i] = star;
                            }

                            return (
                                <Button raised
                                    color="primary"
                                    key = {data.key}
                                    className = {classes.button}
                                    disabled={!this.props.levelsInfo[data.key.toString()].unlock}
                                    onClick = {() => this.props.onChooseLevel(data.key)}
                                >
                                    <div className={classes.buttonContent}>
                                        {data.label}
                                        <div>
                                            {stars[0]}
                                            {stars[1]}
                                            {stars[2]}
                                        </div>
                                    </div>
                                </Button>
                            );
                        })}
                    </div>
                    DIY maps
                    <div className = {classes.row}>
                        {this.props.DIYMapsInfo.map(data =>
                        {
                            return (
                                <Button raised
                                    color="primary"
                                    key = {data.id}
                                    className = {classes.button}
                                    onClick = {() => this.props.onChooseDIYMap(data.id)}
                                >
                                    {data.name}
                                </Button>
                            );
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles, {withTheme: true})(LevelDialog);
