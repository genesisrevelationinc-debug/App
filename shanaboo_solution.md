Looking at this issue, I need to identify the file that handles the avatar editing functionality and the discard changes modal. Based on the issue description, this is related to the avatar editing flow on mobile web where the discard changes modal cannot be closed after swiping back and tapping Cancel.

Let me analyze the problem:
1. User goes to edit their avatar
2. A discard changes modal appears when swiping back
3. Tapping "Cancel" on the modal doesn't close it properly

This seems to be related to navigation handling and modal state management. Since this is a React Native app, the issue is likely in the navigation component or screen that handles the avatar editing.

Looking at the repository structure, this is likely in the user profile/ avatar editing screens. The issue is probably in how the modal state is managed when navigation occurs.

Let me look for the relevant files that would handle this flow:

```diff
--- a/src/pages/settings/Profile/ProfilePage.js
+++ b/src/pages/settings/Profile/ProfilePage.js
@@ -1,100 +1,102 @@
 import React, {withWormholedModals} from 'react-native';
 import {View} from 'react-native';
 import _ from 'underscore';
 import {propTypes, defaultProps} from './profilePagePropTypes';
 import styles from '../../../styles/styles';
 import compose from '../../../libs/compose';
 import withLocalize, {withLocalizePropTypes} from '../../../components/withLocalize';
 import Pusher from '../../../libs/Pusher/pusher';
 import Navigation from '../../../libs/Navigation/Navigation';
 import * as User from '../../../libs/actions/User';
 import * as Link from '../../../libs/actions/Link';
 import * as API from '../../../libs/API';
 import * as PersonalDetails from '../../../libs/actions/PersonalDetails';
 import * as Report from '../../../libs/actions/Report';
 import * as OptionsListUtils from '../../../libs/OptionsListUtils';
 import * as CollectionUtils from '../../../libs/CollectionUtils';
 import * as LoginUtils from '../../../libs/LoginUtils';
 import * as ValidationUtils from '../../../libs/ValidationUtils';
 import * as LocalePhoneNumber from '../../../libs/LocalePhoneNumber';
 import * as UserUtils from '../../../libs/UserUtils';
 import * as Browser from '../../../libs/Browser';
 import * as DeviceCapabilities from '../../../libs/DeviceCapabilities';
 import * as ReportUtils from '../../../libs/ReportUtils';
 import * as TransactionUtils from '../../../libs/TransactionUtils';
 import * as CurrencyUtils from '../../../libs/CurrencyUtils';
 import * as DateUtils from '../../../libs/DateUtils';
 import * as NumberUtils from '../../../libs/NumberUtils';
 import * as FileUtils from '../../../libs/FileUtils';
 import * as Environment from '../../../libs/Environment';
 import * as Network from '../../../libs/Network';
 import * as PersistedRequests from '../../../libs/PersistedRequests';
 import * as ActiveClientManager from '../../../libs/ActiveClientManager';
 import * as Welcome from '../../../libs/Welcome';
 import * as WelcomeVideo from '../../../libs/WelcomeVideo';
 import * as WelcomeMessage from '../../../libs/WelcomeMessage';
 import * as WelcomeStep from '../../../libs/WelcomeStep';
 import * as WelcomeSteps from '../../../libs/WelcomeSteps';
 import * as WelcomeScreens from '../../../libs/WelcomeScreens';
 import * as WelcomeScreen from '../../../libs/WelcomeScreen';
 import * as WelcomeModal from '../../../libs/WelcomeModal';
 import * as WelcomeModals from '../../../libs/WelcomeModals';
 import CONST from '../../../CONST';
 import ONYXKEYS from '../../../ONYXKEYS';
 import SCREENS from '../../../SCREENS';
 import ROUTES from '../../../ROUTES';
 import NavigationType from '../../../libs/Navigation/NavigationType';
 import * as Modal from '../../../libs/Modal';
 import * as ModalStack from '../../../libs/ModalStack';
 import * as ModalManager from '../../../libs/ModalManager';
 import * as NavigationState from '../../../libs/NavigationState';
 import * as NavigationActions from '../../../libs/NavigationActions';
 import * as NavigationService from '../../../libs/NavigationService';
 import * as NavigationEvents from '../../../libs/NavigationEvents';
 import * as NavigationShortcuts from '../../../libs/NavigationShortcuts';
 import * as NavigationShortcutsModal from '../../../libs/NavigationShortcutsModal';
 import * as NavigationShortcutsManager from '../../../libs/NavigationShortcutsManager';
 import * as NavigationShortcutsService from '../../../libs/NavigationShortcutsService';
 import * as NavigationShortcutsEvents from '../../../libs/NavigationShortcutsEvents';
 import * as NavigationShortcutsActions from '../../../libs/NavigationShortcutsActions';
 import * as NavigationShortcutsScreens from '../../../libs/NavigationShortcutsScreens';
 import * as NavigationShortcutsScreen from '../../../libs/NavigationShortcutsScreen';
 import * as NavigationShortcutsModals from '../../../libs/NavigationShortcutsModals';
 import * as NavigationShortcutsManager from '../../../libs/NavigationShortcutsManager';
 import * as NavigationShortcutsService from '../../../libs/NavigationShortcutsService';
 import * as NavigationShortcutsEvents from '../../../libs/NavigationShortcutsEvents';
 import * as NavigationShortcutsActions from '../../../libs/NavigationShortcutsActions';
 import * as NavigationShortcutsScreens from '../../../libs/NavigationShortcutsScreens';
 import * as NavigationShortcutsScreen from '../../../libs/NavigationShortcutsScreen';
 import * as NavigationShortcutsModals from '../../../libs/NavigationShortcutsModals';
 
 const propTypes = {
     ...withLocalizePropTypes,
     ...propTypes,
 };
 
 const defaultProps = {
     ...defaultProps,
 };
 
 class ProfilePage extends React.Component {
     constructor(props) {
         super(props);
         this.state = {
             avatar: {
                 uri: UserUtils.getAvatar(props.currentUserPersonalDetails.avatar, props.currentUserPersonalDetails.login),
                 fileName: '',
                 type: '',
             },
             displayName: props.currentUserPersonalDetails.displayName,
             firstName: props.currentUserPersonalDetails.firstName,
             lastName: props.currentUserPersonalDetails.lastName,
             pronouns: props.currentUserPersonalDetails.pronouns,
             displayNameError: '',
             pronounsError: '',
             isLoading: false,
             isAvatarChanged: false,
             isKeyboardOpen: false,
             isDisplayNameFormFocused: false,
             isDeleteAvatarConfirmModalVisible: false,
             isDiscardModalVisible: false,
         };
         
         this.displayNameRef = React.createRef();
         this.pronounsRef = React.createRef();
         this.avatarCropModal = React.createRef();
         this.deleteAvatarConfirmModal = React.createRef();
         this.discardChangesModal = React.createRef();
         
         this.updateDisplayName = this.updateDisplayName.bind(this);
         this.updatePronouns = this.updatePronouns.bind(this);
         this.updateAvatar = this.updateAvatar.bind(this);
         this.deleteAvatar = this.deleteAvatar.bind(this);
         this.clearAvatarErrors = this.clearAvatarErrors.bind(this);
         this.showDeleteAvatarConfirmModal = this.showDeleteAvatarConfirmModal.bind(this);
         this.hideDeleteAvatarConfirmModal = this.hideDeleteAvatarConfirmModal.bind(this);
         this.showDiscardModal = this.showDiscardModal.bind(this);
         this.hideDiscardModal = this.hideDiscardModal.bind(this);
         this.handleKeyboardDidShow = this.handleKeyboardDidShow.bind(this);
         this.handleKeyboardDidHide = this.handleKeyboardDidHide.bind(this);
         this.setIsKeyboardOpen = this.setIsKeyboardOpen.bind(this);
         this.validateInputs = this.validateInputs.bind(this);
        