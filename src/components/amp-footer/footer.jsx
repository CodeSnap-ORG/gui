import React from 'react';
import { APP_NAME } from '../../lib/brand.js';
import { FormattedMessage } from 'react-intl';

import styles from './footer.css';
const codesnap_version = '1.3.9';

const hardRefresh = () => {
    var search = location.search.replace(/[?&]nocache=\d+/, '');
    location.replace(location.pathname + search + (search ? '&' : '?') + 'nocache=' + Math.floor(Math.random() * 100000));
}

const eraseData = async () => {
    if (confirm('Please be aware that this will reset all your local data, including the Restore Points and backpack. Are you sure you want to continue?')) {
        localStorage.clear();
        indexedDB.deleteDatabase('TW_RestorePoints');
        indexedDB.deleteDatabase('TW_Backpack');
        location.reload();
    }
}

const Footer = () => {
    const isAprilFools = () => {
        const now = new Date();
        return now.getMonth() === 3 && now.getDate() === 1;
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerText}>CodeSnap v{codesnap_version}</div>

                <div className={styles.footerText}>
                    <a className={styles.footerResetData} onClick={eraseData}>
                        <FormattedMessage
                            defaultMessage="Reset data"
                            description="Button to reset local data in the footer"
                            id="tw.footer.resetData"
                        />
                    </a>
                </div>

                <div className={styles.footerText}>
                    <FormattedMessage
                        defaultMessage="{APP_NAME} is not affiliated with Scratch, the Scratch Team, or the Scratch Foundation."
                        description="Disclaimer about independence"
                        id="tw.footer.disclaimer"
                        values={{ APP_NAME }}
                    />
                </div>

                <div className={styles.footerText}>
                    <FormattedMessage
                        defaultMessage="CodeSnap is based on Scratch and AmpMod Editor. Credit to AmpMod."
                        description="Attribution to AmpMod"
                        id="tw.footer.basedOnAmpMod"
                    />
                </div>

                <div className={styles.footerText}>
                    <a href="credits.html">
                        <FormattedMessage
                            defaultMessage="Credits"
                            description="Credits link in footer"
                            id="tw.footer.credits"
                        />
                    </a>
                </div>

                <div className={styles.footerText}>
                    <FormattedMessage
                        defaultMessage="Documentation and additional tools coming soon."
                        description="Placeholder for removed links"
                        id="tw.footer.placeholder"
                    />
                </div>

                <div className={styles.footerText}>
                    <a href="https://scratch.mit.edu/discuss/topic/806311">
                        <FormattedMessage
                            defaultMessage="AmpMod Forum Topic"
                            description="Link to AmpMod forum topic"
                            id="tw.topicButton"
                        />
                    </a>
                </div>

                <div className={styles.footerText}>
                    <a href="https://github.com/AmpM0d">
                        <FormattedMessage
                            defaultMessage="AmpMod GitHub"
                            description="Link to AmpMod GitHub"
                            id="tw.ampmod.github"
                        />
                    </a>
                </div>

                <div className={styles.footerText}>
                    <a href="privacy.html">
                        <FormattedMessage
                            defaultMessage="Privacy Policy"
                            description="Link to privacy policy"
                            id="tw.privacy"
                        />
                    </a>
                </div>
            </div>
            {isAprilFools() && ';'}
        </footer>
    );
};

export default Footer;
