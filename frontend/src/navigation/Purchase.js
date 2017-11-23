import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog, {DialogTitle, DialogContent} from 'material-ui/Dialog';
import Radio, { RadioGroup } from 'material-ui/Radio';
import {FormControl, FormLabel, FormControlLabel} from 'material-ui/Form';
import {purchase} from '../utils/Purchase';
import MessageBar from '../utils/MessageBar';
import {getInfoWithCookies} from "../utils/Auth";

const styles = theme => ({
    formControl: {
        width: "80%",
        margin: theme.spacing.unit,
    },
    group: {
        margin: `${theme.spacing.unit}px 0`,
    },
});

class Purchase extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            VIPType: 'NotVIP',
            VIPTime: 0,
        }
    }

    componentDidMount() {
        this.refreshPurchase();
    }

    /** Reload the user's purchase information
     */
    refreshPurchase() {
        getInfoWithCookies()
            .then((response) => {
                this.setState({
                    VIPType: response.VIPType,
                    VIPTime: response.VIPTime,
                })
            })
    }

    /**
     * When the user clicks the radio buttons
     * @param event
     * @param value
     */
    handleChange = (event, value) => {
        this.setState({ value });
    };

    /**
     * When the user clicks purchase
     */
    handlePurchase() {
        purchase(this.state.value)
            .then((response) => {
                if (response.OK) {
                    MessageBar.show('VIP Purchase successful!');
                    this.refreshPurchase();
                }
            })
    }

    render() {
        const { classes } = this.props;

        return (
            <Dialog open={this.props.open}
                    onRequestClose={this.props.onRequestClose}
            >
                <DialogTitle>
                    Purchase<br/>
                    VIP Type - {this.state.VIPType}<br/>
                    Remaining Days: {this.state.VIPTime}
                </DialogTitle>
                <DialogContent>
                    <FormControl required className={classes.formControl}>
                        <FormLabel>Please Choose Your Plan</FormLabel>
                        <RadioGroup
                            aria-label="plan"
                            name="plan"
                            className={classes.group}
                            value={this.state.value}
                            onChange={(event, value) => this.handleChange(event, value)}
                        >
                            <FormControlLabel value="Month" control={<Radio />} label="10¥ Monthly" />
                            <FormControlLabel value="Season" control={<Radio />} label="20¥ Quarterly" />
                            <FormControlLabel value="Year" control={<Radio />} label="69¥ Yearly" />
                        </RadioGroup>
                    </FormControl>
                    <Button raised color="primary" onClick={() => this.handlePurchase()}>
                        Purchase
                    </Button>
                </DialogContent>
            </Dialog>
        )
    }
}

Purchase.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Purchase);
