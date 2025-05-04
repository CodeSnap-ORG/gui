import React from 'react';
import {FormattedMessage, injectIntl, intlShape, defineMessages} from 'react-intl';
import {connect} from 'react-redux';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import styles from './loader.css';
import {getIsLoadingWithId} from '../../reducers/project-state';
import topBlock from './top-block.svg';
import middleBlock from './middle-block.svg';
import bottomBlock from './bottom-block.svg';

const mainMessages = {
    'gui.loader.headline': (
        <FormattedMessage
            defaultMessage="Loading Project"
            description="Main loading message"
            id="gui.loader.headline"
        />
    ),
    'gui.loader.creating': (
        <FormattedMessage
            defaultMessage="Creating Project"
            description="Main creating message"
            id="gui.loader.creating"
        />
    )
};

const messages = defineMessages({
    projectData: {
        defaultMessage: 'Loading project …',
        description: 'Appears when loading project data, but not assets yet',
        id: 'tw.loader.projectData'
    },
    downloadingAssets: {
        defaultMessage: 'Downloading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets from a project on a remote website',
        id: 'tw.loader.downloadingAssets'
    },
    loadingAssets: {
        defaultMessage: 'Loading assets ({complete}/{total}) …',
        description: 'Appears when loading project assets from a project file on the user\'s computer',
        id: 'tw.loader.loadingAssets'
    }
});

const funFacts = [
    'Fun fact: AmpMod is currently loading.',
    'Did you know? In AmpMod, you can put variables inside of boolean inputs.',
    'Tip: You can use the "backpack" to store and reuse code snippets.',
    'Did you know? You can change the stage size in AmpMod.',
    'Fun Fact: AmpMod supports extensions for additional functionalities.',
    'Tip: Use the "costumes" tab to change how your sprites look.',
    'AmpMod was previously known as UltiBlocks.',
    'I LOVE LIBREKITTEN!',
    'YOU can contribute to AmpMod!',
    'Skibidi dop dop dop yes yes',
    'Fun fact: Amp stands for A-MARIO-PLAYER',
    'Fun fact: Funding for AmpMod is provided by apple cats like you. Thank you!',
    'Fun fact: There was an error loading AmpMod. Please give 100 more energy units to AmpElectrecuted',
    'Fun fa-Sadly, this fact was eaten by an evil kumquat.',
    'Fun fact: qwertyuiopasdfghjklzxcvbnm',
    'Did you know? There is an AmpMod wiki on Miraheze',
    'Did you know? The Witch sprite was originally going to be the AmpMod mascot',
    "'How to make computer in AmpMod' Oh wait, this isn't Google, is it?",
    'Fun fact: The person who typed this fact is going clinically insane!',
    'Tip: You said to press ANYTHING while doing a keyboard smash! What do you mean 7 is wrong?!',
    'Fun fact: We are cool',
    'How to AmpMod 101: Step 1: AmpMod.'
    ];

class LoaderComponent extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'handleAssetProgress',
            'handleProjectLoaded',
            'barInnerRef',
            'messageRef',
            'funFactRef',
            'updateFunFact'
        ]);
        this.barInnerEl = null;
        this.messageEl = null;
        this.funFactEl = null;
        this.ignoreProgress = false;
        this.funFactInterval = null;
        this.lastFunFactIndex = -1;
    }
    componentDidMount () {
        this.handleAssetProgress(
            this.props.vm.runtime.finishedAssetRequests,
            this.props.vm.runtime.totalAssetRequests
        );
        this.props.vm.on('ASSET_PROGRESS', this.handleAssetProgress);
        this.props.vm.runtime.on('PROJECT_LOADED', this.handleProjectLoaded);
        this.updateFunFact();
        this.funFactInterval = setInterval(this.updateFunFact, 3000);
    }
    componentWillUnmount () {
        this.props.vm.off('ASSET_PROGRESS', this.handleAssetProgress);
        this.props.vm.runtime.off('PROJECT_LOADED', this.handleProjectLoaded);
        clearInterval(this.funFactInterval);
    }
    updateFunFact () {
        if (this.funFactEl) {
            this.funFactEl.classList.remove(styles.funFactSlideIn);
            void this.funFactEl.offsetWidth; // Trigger reflow
            let randomIndex;
            do {
                randomIndex = Math.floor(Math.random() * funFacts.length);
            } while (randomIndex === this.lastFunFactIndex);
            this.lastFunFactIndex = randomIndex;
            const randomFact = funFacts[randomIndex];
            this.funFactEl.textContent = randomFact;
            this.funFactEl.classList.add(styles.funFactSlideIn);
            this.funFactEl.classList.add(styles.funFactRoulette);
        }
    }
    handleAssetProgress (finished, total) {
        if (this.ignoreProgress || !this.barInnerEl || !this.messageEl) {
            return;
        }

        if (total === 0) {
            // Started loading a new project.
            this.barInnerEl.style.width = '0';
            this.messageEl.textContent = this.props.intl.formatMessage(messages.projectData);
        } else {
            this.barInnerEl.style.width = `${finished / total * 100}%`;
            const message = this.props.isRemote ? messages.downloadingAssets : messages.loadingAssets;
            this.messageEl.textContent = this.props.intl.formatMessage(message, {
                complete: finished,
                total
            });
        }
    }
    handleProjectLoaded () {
        if (this.ignoreProgress || !this.barInnerEl || !this.messageEl) {
            return;
        }

        this.ignoreProgress = true;
        this.props.vm.runtime.resetProgress();
    }
    barInnerRef (barInner) {
        this.barInnerEl = barInner;
    }
    messageRef (message) {
        this.messageEl = message;
    }
    funFactRef (funFact) {
        this.funFactEl = funFact;
    }
    render () {
        return (
            <div
            className={classNames(styles.background, {
                [styles.fullscreen]: this.props.isFullScreen
            })}
            >
            
            <div className={styles.container}>
                {/* <div className={styles.blockAnimation}>
                <img
                    className={styles.topBlock}
                    src={topBlock}
                    draggable={false}
                />
                <img
                    className={styles.middleBlock}
                    src={middleBlock}
                    draggable={false}
                />
                <img
                    className={styles.bottomBlock}
                    src={bottomBlock}
                    draggable={false}
                />
                </div> */}

                <div className={styles.spinnerCircle}></div>

                <div className={styles.title}>
                {mainMessages[this.props.messageId]}
                </div>

                <div
                className={styles.message}
                ref={this.messageRef}
                />

                <div className={styles.barOuter}>
                <div
                    className={styles.barInner}
                    ref={this.barInnerRef}
                />
                </div>

                <div
                className={styles.funFact}
                ref={this.funFactRef}
                />
            </div>
            </div>
        );
    }
}

LoaderComponent.propTypes = {
    intl: intlShape,
    isFullScreen: PropTypes.bool,
    isRemote: PropTypes.bool,
    messageId: PropTypes.string,
    vm: PropTypes.shape({
        on: PropTypes.func,
        off: PropTypes.func,
        runtime: PropTypes.shape({
            totalAssetRequests: PropTypes.number,
            finishedAssetRequests: PropTypes.number,
            resetProgress: PropTypes.func,
            on: PropTypes.func,
            off: PropTypes.func
        })
    })
};
LoaderComponent.defaultProps = {
    isFullScreen: false,
    messageId: 'gui.loader.headline'
};

const mapStateToProps = state => ({
    isRemote: getIsLoadingWithId(state.scratchGui.projectState.loadingState),
    vm: state.scratchGui.vm
});

const mapDispatchToProps = () => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(injectIntl(LoaderComponent));
