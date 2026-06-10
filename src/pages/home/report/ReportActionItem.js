import React, {memo} from 'react';
import {View, Pressable, InteractionManager} from 'react';
import styles from '../../../styles/styles';
import themeColors from '../../../themeVariables';
import {withReportActionsPropTypes} from './withReportActionsPropTypes';
import ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import ReportActionItemMessageEdit from './ReportActionItemMessageEdit';
import ReportActionItemCreated from './ReportActionItemCreated';
import ReportActionItem from './ReportActionItem';
import * as ReportActions from '../../../libs/actions/ReportActions';
import * as ReportActionItemFragment from './ReportActionItemFragment';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as PersonalDetails from '../../../libs/actions/PersonalDetails';
import * as Pusher from '../../../libs/Pusher/pusher';
import * as StyleUtils from '../../../styles/StyleUtils';
import * as PersonalDetailsUtils from '../../../libs/PersonalDetailsUtils';
import * as ReportActionCompose from '../../../libs/actions/ReportActionCompose';
import * as Report from '../../../libs/models/Report';
import * as ReportUtils from '../../../libs/ReportUtils';
import * as ReportActionFragment from './ReportActionItemFragment';
import * as ReportActionItem from './ReportActionItem';
import * as ReportActionItemMessageEdit from './ReportActionItemMessageEdit';
import * as ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemFragment from './ReportActionItemFragment';
import ReportActionItem from './ReportActionItem';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemMessageEdit from './ReportActionItemMessageEdit';
import React, {memo} from 'react';
import {View} from 'react-native';
import PropTypes from 'prop-types';
import ReportActionItemSingle from './ReportActionItemSingle';
import ReportActionItemGrouped from './ReportActionItemGrouped';
import ReportActionItemMessageEdit from './ReportActionItemMessageEdit';
import {withReportActionsDraft} from './withReportActionsDraft';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';
import {withNetwork} from './withNetwork';
import {withPersonalDetails} from './withPersonalDetails';

const propTypes = {
    action: PropTypes.shape({
        actionName: PropTypes.string,
        person: PropTypes.arrayOf(PropTypes.string),
        automatic: PropTypes.bool,
        avatar: PropTypes.string,
        shouldShowAvatar: PropTypes.bool,
        shouldShowWelcome: PropTypes.bool,
    }).isRequired,
};

const defaultProps = {
    action: {},
};

function ReportActionItem(props) {
    // ...
}

export default withReportActionsDraft() (withNetwork() (withPersonalDetails() (ReportActionItem)));