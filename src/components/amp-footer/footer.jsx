/**
 * Copyright (C) 2021 Thomas Weber
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License version 3 as
 * published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */


import React from 'react';
import { APP_NAME } from '../../lib/brand.js';
import { FormattedMessage } from 'react-intl';

import styles from './footer.css';

const hardRefresh = () => {
    var search = location.search.replace(/[?&]nocache=\d+/, '');
    location.replace(location.pathname + search + (search ? '&' : '?') + 'nocache=' + Math.floor(Math.random() * 100000));
}

const eraseData = async () => {
    if (confirm('Please be aware that this will reset all your local data, including the Restore Points and backpack. Are you sure you want to continue?')) {
        ;
        localStorage.clear();
        // We have to manually delete the databases due to Firefox not supporting indexedDB.databases(). WHYYYY???
        indexedDB.deleteDatabase('TW_RestorePoints');
        indexedDB.deleteDatabase('TW_Backpack');
        location.reload();
    }
}

const Footer = () => {
    const isAprilFools = () => {
        const now = new Date();
        return now.getMonth() === 3 && now.getDate() === 1; // Month is 0-indexed (0 for January, 3 for April)
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <div className={styles.footerText}>
                    AmpMod v{ampmod_version}
                    <span className={styles.separator}></span>
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
                        defaultMessage="{APP_NAME} is not affiliated with Scratch, the Scratch Team, the Scratch Foundation, or the TurboWarp developers."
                        description="Disclaimer that TurboWarp is not connected to Scratch"
                        id="tw.footer.disclaimer"
                        values={{
                            APP_NAME
                        }}
                    />
                </div>

                <div className={styles.footerText}>
                    <FormattedMessage
                        defaultMessage="Scratch is a project of the Scratch Foundation. It is available for free at {scratchDotOrg} ."
                        description="A disclaimer that Scratch requires when referring to Scratch. {scratchDotOrg} is a link with text 'https://scratch.org/'"
                        id="tw.footer.scratchDisclaimer"
                        values={{
                            scratchDotOrg: (
                                <a
                                    href="https://scratch.org/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {'https://scratch.org/'}
                                </a>
                            )
                        }}
                    />
                </div>

                <div className={styles.footerText}>
                    <FormattedMessage
                        defaultMessage="CodeSnap is based off TurboWarp and AmpMod editors. It is available for free at {turboWarpOrg}."
                        description="Attribution to TurboWarp. {turboWarpOrg} is a link with text 'https://turbowarp.org'"
                        id="tw.footer.basedOnTurboWarp"
                        values={{
                            turboWarpOrg: (
                                <a
                                    href="https://turbowarp.org/"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {'https://turbowarp.org/'}
                                </a>
                            )
                        }}
                    />
                </div>

                <div className={styles.footerColumns}>
                    <div className={styles.footerSection}>
                        <a href="credits.html">
                            <FormattedMessage
                                defaultMessage="Credits"
                                description="Credits link in footer"
                                id="tw.footer.credits"
                            />
                        </a>
                        <a href="https://github.com/sponsors/GarboMuffin">
                            <FormattedMessage
                                defaultMessage="Donate to TurboWarp"
                                description="Donation link in footer"
                                id="tw.footer.donate"
                            />
                        </a>
                    </div>
                    <div className={styles.footerSection}>
                        <a href="https://desktop.turbowarp.org/">
                            {/* Do not translate */}
                            {'TurboWarp Desktop'}
                        </a>
                        <a href="https://packager.turbowarp.org/">
                            {/* Do not translate */}
                            {'TurboWarp Packager'}
                        </a>
                        <a href="https://docs.turbowarp.org/embedding">
                            <FormattedMessage
                                defaultMessage="Embedding"
                                description="Link in footer to embedding documentation for embedding link"
                                id="tw.footer.embed"
                            />
                        </a>
                        <a href="https://docs.turbowarp.org/url-parameters">
                            <FormattedMessage
                                defaultMessage="URL Parameters"
                                description="Link in footer to URL parameters documentation"
                                id="tw.footer.parameters"
                            />
                        </a>
                        <a href="https://ultiblocks.miraheze.org/">
                            <FormattedMessage
                                defaultMessage="AmpMod Wiki"
                                description="Link in footer to wiki"
                                id="tw.footer.wiki"
                            />
                        </a>
                        <a href="https://docs.turbowarp.org/">
                            <FormattedMessage
                                defaultMessage="TurboWarp Documentation"
                                description="Link in footer to additional documentation"
                                id="tw.footer.documentation"
                            />
                        </a>
                    </div>
                    <div className={styles.footerSection}>
                        <a href="https://scratch.mit.edu/discuss/topic/806311">
                            <FormattedMessage
                                defaultMessage="AmpMod Forum Topic"
                                description="Button to give feedback in the menu bar"
                                id="tw.topicButton"
                                values={{
                                    APP_NAME
                                }}
                            />
                        </a>
                        <a href="https://codeberg.org/AmpMod/">
                            <FormattedMessage
                                defaultMessage="AmpMod Source Code"
                                description="Link to source code"
                                id="tw.code"
                            />
                        </a>
                        <a href="privacy.html">
                            <FormattedMessage
                                defaultMessage="Privacy Policy"
                                description="Link to privacy policy"
                                id="tw.privacy"
                            />
                        </a>
                    </div>
                </div>
            </div>
            {isAprilFools() && ';'}
        </footer>
    );
};

export default Footer;
