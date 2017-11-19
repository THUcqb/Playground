import React from "react";
import Button from "material-ui/Button";
import {shareGenerateLink} from "../utils/SharedLinks";
import ShareIcon from 'material-ui-icons/Share';
import LinkBar from './LinkBar';
import MessageBar from '../utils/MessageBar';

const style = ({marginRight: 10,});

class ShareButton extends React.Component {

    static handleShare() {
        shareGenerateLink()
            .then((response) => {
                if (response.OK) {
                    LinkBar.show(response.link);
                }
                else {
                    MessageBar.show('Share failed!');
                }
            })
    }

    render() {
        return (
            <div>
                <Button raised color="primary" style={style}
                        onClick={ShareButton.handleShare}>
                    <ShareIcon/>
                </Button>
                <LinkBar/>
            </div>
        )
    }
}

export default ShareButton;