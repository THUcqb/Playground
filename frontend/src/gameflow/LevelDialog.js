import React from 'react';
import Dialog, {
    DialogTitle,
    DialogContent
} from 'material-ui/Dialog';
import {withStyles} from 'material-ui/styles';
import Button from 'material-ui/Button';
import Star from 'material-ui-icons/Star';
import StarBorder from 'material-ui-icons/StarBorder';
import {numberOfLevels} from '../logic/Maplevel';

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
    constructor()
    {
        super();
        this.buttonData = [];
        for (let i = 1; i <= numberOfLevels; i++)
        {
            this.buttonData.push({key: i, label: "Level" + i.toString()});
        }
    }

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
                        {this.buttonData.map(data =>
                        {
                            const star = <Star/>;
                            const starBorder = <StarBorder/>;
                            const stars = [starBorder, starBorder, starBorder];
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
