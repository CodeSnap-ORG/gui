import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { defineMessages, FormattedMessage, injectIntl, intlShape } from 'react-intl';
import PropTypes from 'prop-types';
import bindAll from 'lodash.bindall';
import bowser from 'bowser';
import React from 'react';
import Logo from './ampmod.svg';
import FakeLogo from './lampmod.svg'; // Assuming this is your April Fools' logo

import Button from '../button/button.jsx';

import styles from './header.css';

import { APP_NAME } from '../../lib/brand.js';

function isAprilFools() {
  const now = new Date();
  const month = now.getMonth(); // 0-indexed (0 for January, 3 for April)
  const day = now.getDate();

  return month === 3 && day === 1;
}

const Header = () => {
    const showFakeLogo = isAprilFools();

    return (
        <div className={styles.header}>
            <div className={styles.mainGroup}>
                <a href="/" className={classNames(styles.headerItem, styles.hoverable)}>
                    <img height="32px" src={showFakeLogo ? FakeLogo : Logo} alt={showFakeLogo ? "LampMod Logo" : "AmpMod Logo"} />
                </a>
                <a href="/editor.html" className={classNames(styles.headerItem, styles.hoverable)}>
                    Create
                </a>
                <a href="/credits.html" className={classNames(styles.headerItem, styles.hoverable)}>
                    Credits
                </a>
                <a href="https://scratch.mit.edu/discuss/topic/806311" className={classNames(styles.headerItem, styles.hoverable)}>
                    Discuss
                </a>
                <a href="https://codeberg.org/AmpMod" className={classNames(styles.headerItem, styles.hoverable)}>
                    Contribute
                </a>
            </div>
        </div>
    );
};

export default Header;