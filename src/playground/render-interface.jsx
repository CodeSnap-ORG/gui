import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, defineMessages, injectIntl, intlShape } from 'react-intl';
import { getIsLoading } from '../reducers/project-state.js';
import AppStateHOC from '../lib/app-state-hoc.jsx';
import ErrorBoundaryHOC from '../lib/error-boundary-hoc.jsx';
import TWProjectMetaFetcherHOC from '../lib/tw-project-meta-fetcher-hoc.jsx';
import TWStateManagerHOC from '../lib/tw-state-manager-hoc.jsx';
import SBFileUploaderHOC from '../lib/sb-file-uploader-hoc.jsx';
import TWPackagerIntegrationHOC from '../lib/tw-packager-integration-hoc.jsx';
import SettingsStore from '../addons/settings-store-singleton';
import '../lib/tw-fix-history-api';
import GUI from './render-gui.jsx';
import MenuBar from '../components/menu-bar/menu-bar.jsx';
import Description from '../components/tw-description/description.jsx';
import BrowserModal from '../components/browser-modal/browser-modal.jsx';
import CloudVariableBadge from '../containers/tw-cloud-variable-badge.jsx';
import { isBrowserSupported } from '../lib/tw-environment-support-prober';
import AddonChannels from '../addons/channels';
import { loadServiceWorker } from './load-service-worker';
import runAddons from '../addons/entry';
import InvalidEmbed from '../components/tw-invalid-embed/invalid-embed.jsx';
import { APP_NAME } from '../lib/brand.js';
import Clippy from '../containers/amp-clippy.jsx';
import Footer from '../components/amp-footer/footer.jsx';
import styles from './interface.css';

const isInvalidEmbed = false;

const handleClickAddonSettings = addonId => {
    const path = process.env.ROUTING_STYLE === 'wildcard' ? 'addons' : 'addons.html';
    const url = `${process.env.ROOT}${path}${typeof addonId === 'string' ? `#${addonId}` : ''}`;
    window.open(url);
};

const messages = defineMessages({
    defaultTitle: {
        defaultMessage: 'Make projects but with a better editor.',
        description: 'Title of homepage',
        id: 'tw.guiDefaultTitle'
    }
});

const WrappedMenuBar = compose(
    SBFileUploaderHOC,
    TWPackagerIntegrationHOC
)(MenuBar);

if (AddonChannels.reloadChannel) {
    AddonChannels.reloadChannel.addEventListener('message', () => {
        location.reload();
    });
}

if (AddonChannels.changeChannel) {
    AddonChannels.changeChannel.addEventListener('message', e => {
        SettingsStore.setStoreWithVersionCheck(e.data);
    });
}

runAddons();

class Interface extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateProjectTitle = this.handleUpdateProjectTitle.bind(this);
        this.handleShareProject = this.handleShareProject.bind(this);
        this.handleSignupOrLogin = this.handleSignupOrLogin.bind(this);
        this.state = {
            username: '',
            password: '',
            error: ''
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isLoading && !this.props.isLoading) {
            loadServiceWorker();
        }
    }

    handleUpdateProjectTitle(title, isDefault) {
        document.title = isDefault || !title ? APP_NAME : `${title} - ${APP_NAME}`;
    }

    handleShareProject() {
        const { vm, projectId, projectName, projectGenre } = this.props;

        const projectThumbnail = 'https://codesnap-org.github.io/projects/static/assets/018f79360b10f9f2c317d648d61a0eb2.svg';
        const projectLink = `https://codesnap-org.github.io/projects/?project_url=https://block-compiler-codesnap.onrender.com/projects/${projectId}`;

        vm.saveProjectSb3().then(sb3Blob => {
            const formDataSb3 = new FormData();
            formDataSb3.append('username', localStorage.getItem('username'));
            formDataSb3.append('password', localStorage.getItem('password'));
            formDataSb3.append('projectName', projectName);
            formDataSb3.append('project', sb3Blob, 'project.sb3');

            axios.post('https://block-compiler-codesnap.onrender.com', formDataSb3)
                .then(() => {
                    const formDataProject = new FormData();
                    formDataProject.append('name', projectName);
                    formDataProject.append('thumbnail', projectThumbnail);
                    formDataProject.append('genre', projectGenre);
                    formDataProject.append('link', projectLink);
                })
                .catch(err => {
                    console.error("Error sharing SB3 project:", err);
                    alert("There was an error sharing the project.");
                });

            alert("Project Shared!");
        });
    }

    async handleSignupOrLogin() {
        const { username, password } = this.state;

        try {
            const user = await this.authenticateUser(username, password);
            this.setState({ error: '' });
            alert(`Welcome back, ${user.username}`);
        } catch {
            this.setState({ error: 'Login failed, creating a new account...' });
            try {
                const newUser = await this.createNewAccount(username, password);
                this.setState({ error: '' });
                alert(`Welcome, new user ${newUser.username}`);
            } catch {
                this.setState({ error: 'Error creating new account.' });
            }
        }
    }

    authenticateUser(username, password) {
        return new Promise((resolve, reject) => {
            username === 'existingUser' && password === 'password123'
                ? resolve({ username })
                : reject('User not found');
        });
    }

    createNewAccount(username, password) {
        return new Promise((resolve, reject) => {
            username && password ? resolve({ username }) : reject('Invalid data');
        });
    }

    render() {
        if (isInvalidEmbed) return <InvalidEmbed />;

        const {
            intl,
            hasCloudVariables,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            projectId,
            ...props
        } = this.props;

        // Get URL params and check for 'project_url'
        const urlParams = new URLSearchParams(window.location.search);
        const hasProjectUrl = urlParams.has('project_url');
        const description = {
            instructions: urlParams.has('instructions') ? urlParams.get('instructions') : 'No instructions provided.',
            credits: urlParams.has('credits') ? urlParams.get('credits') : 'No credits provided.'
        };

        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;

        // If project_url is not in URL, show default description (CodeSnap alpha stage message)
        const descriptionMessage = hasProjectUrl ? null : null; // Removed alpha message here

        // Hide share button if no username in localStorage or if there is a 'project_url'
        const showShareButton = localStorage.getItem('username') && !hasProjectUrl;

        return (
            <div className={classNames(styles.container, {
                [styles.playerOnly]: isHomepage,
                [styles.editor]: isEditor
            })}
                dir={isRtl ? 'rtl' : 'ltr'}
            >
                <div className={styles.menu}>
                    <WrappedMenuBar
                        canChangeLanguage
                        canManageFiles
                        canChangeTheme
                        enableSeeInside
                        onClickAddonSettings={handleClickAddonSettings}
                    />
                    <div className={styles.alphaShareContainer}>
                        {showShareButton && (
                            <button
                                onClick={this.handleShareProject}
                                className={styles.shareButton}
                            >
                                <FormattedMessage
                                    defaultMessage="Share"
                                    description="Share button"
                                    id="tw.shareButton"
                                />
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.center} style={isPlayerOnly ? { width: `${Math.max(480, props.customStageSize.width) + 2}px` } : null}>
                    <GUI
                        onClickAddonSettings={handleClickAddonSettings}
                        onUpdateProjectTitle={this.handleUpdateProjectTitle}
                        backpackVisible
                        backpackHost="_local_"
                        {...props}
                    />

                    {isHomepage && (
                        <>
                            {isBrowserSupported() ? <Clippy isFixed messageSet="player" /> : <BrowserModal isRtl={isRtl} />}

                            {hasProjectUrl ? (
                                <>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </>
                            ) : (
                                descriptionMessage
                            )}

                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}><CloudVariableBadge /></div>
                            )}
                        </>
                    )}
                </div>

                {isHomepage && <Footer />}
            </div>
        );
    }
}

Interface.propTypes = {
    intl: intlShape,
    hasCloudVariables: PropTypes.bool,
    customStageSize: PropTypes.shape({
        width: PropTypes.number,
        height: PropTypes.number
    }),
    isFullScreen: PropTypes.bool,
    isLoading: PropTypes.bool,
    isPlayerOnly: PropTypes.bool,
    isRtl: PropTypes.bool,
    projectId: PropTypes.string
};

const mapStateToProps = state => ({
    hasCloudVariables: state.scratchGui.tw.hasCloudVariables,
    customStageSize: state.scratchGui.customStageSize,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId
});

const mapDispatchToProps = () => ({});

const ConnectedInterface = injectIntl(connect(
    mapStateToProps,
    mapDispatchToProps
)(Interface));

const WrappedInterface = compose(
    AppStateHOC,
    ErrorBoundaryHOC('TW Interface'),
    TWProjectMetaFetcherHOC,
    TWStateManagerHOC,
    TWPackagerIntegrationHOC
)(ConnectedInterface);

export default WrappedInterface;
