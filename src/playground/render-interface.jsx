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

const isInvalidEmbed = window.parent !== window;

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
            description,
            isFullScreen,
            isLoading,
            isPlayerOnly,
            isRtl,
            projectId,
            ...props
        } = this.props;

        const isHomepage = isPlayerOnly && !isFullScreen;
        const isEditor = !isPlayerOnly;
        const urlParams = new URLSearchParams(window.location.search);
        const hasProjectUrlParam = urlParams.has('project_url');

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
                    {!hasProjectUrlParam && localStorage.getItem('username') && (
                        <button
                            onClick={this.handleShareProject}
                            className={styles.shareButton}
                            style={{ position: 'absolute', top: '8px', right: '8px', zIndex: 10 }}
                        >
                            <FormattedMessage
                                defaultMessage="Share"
                                description="Share button"
                                id="tw.shareButton"
                            />
                        </button>
                    )}
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

                            {(description.instructions === 'unshared' || description.credits === 'unshared') && (
                                <div className={classNames(styles.infobox, styles.unsharedUpdate)}>
                                    <p><FormattedMessage defaultMessage="Unshared projects are no longer visible." id="tw.unshared2.1" /></p>
                                    <p>
                                        <FormattedMessage
                                            defaultMessage="For more information, visit: {link}"
                                            id="tw.unshared.2"
                                            values={{
                                                link: <a href="https://docs.turbowarp.org/unshared-projects" target="_blank" rel="noopener noreferrer">https://docs.turbowarp.org/unshared-projects</a>
                                            }}
                                        />
                                    </p>
                                    <p><FormattedMessage defaultMessage="If the project was shared recently, this message may appear incorrectly for a few minutes." id="tw.unshared.cache" /></p>
                                    <p><FormattedMessage defaultMessage="If this project is actually shared, please report a bug." id="tw.unshared.bug" /></p>
                                </div>
                            )}

                            {hasCloudVariables && projectId !== '0' && (
                                <div className={styles.section}><CloudVariableBadge /></div>
                            )}

                            {(description.instructions || description.credits) && (
                                <div className={styles.section}>
                                    <Description
                                        instructions={description.instructions}
                                        credits={description.credits}
                                        projectId={projectId}
                                    />
                                </div>
                            )}

                            <div className={styles.section}>
                                <p>
                                    <FormattedMessage
                                        defaultMessage="{APP_NAME} is a more powerful Scratch modification that lets you create complex projects easily. Try it out by clicking See Inside!"
                                        id="tw.home.ampdescription"
                                        values={{ APP_NAME }}
                                    />
                                </p>
                            </div>

                            <div className={classNames(styles.infobox, styles.unsharedUpdate)}>
                                <h3><FormattedMessage defaultMessage="Heads up!" id="tw.development.noticeHeader" /></h3>
                                <p>
                                    <FormattedMessage
                                        defaultMessage="CodeSnap is in its alpha stages... For updates, visit {link}."
                                        id="tw.development.notice"
                                        values={{
                                            link: <a href="https://scratch.mit.edu/discuss/topic/806311" target="_blank" rel="noopener noreferrer">scratch.mit.edu</a>
                                        }}
                                    />
                                </p>
                            </div>
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
    description: PropTypes.shape({
        credits: PropTypes.string,
        instructions: PropTypes.string
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
    description: state.scratchGui.tw.description,
    isFullScreen: state.scratchGui.mode.isFullScreen,
    isLoading: getIsLoading(state.scratchGui.projectState.loadingState),
    isPlayerOnly: state.scratchGui.mode.isPlayerOnly,
    isRtl: state.locales.isRtl,
    projectId: state.scratchGui.projectState.projectId,
    projectName: state.scratchGui.projectState.projectName
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
