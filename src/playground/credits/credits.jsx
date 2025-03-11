import React from 'react';
import PropTypes from 'prop-types';
import render from '../app-target';
import styles from '../info.css';
import myStyles from './credits.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';
import UserData from './users';

import Header from '../../components/amp-header/header.jsx';
import Footer from '../../components/amp-footer/footer.jsx';

import appleCat from './apple-cat-pleased.svg';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const User = ({image, text, href}) => (
    <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className={styles.user}
    >
        <img
            loading="lazy"
            className={styles.userImage}
            src={image}
            width="60"
            height="60"
        />
        <div className={styles.userInfo}>
            {text}
        </div>
    </a>
);
User.propTypes = {
    image: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    href: PropTypes.string
};

const UserList = ({users}) => (
    <div className={styles.users}>
        {users.map((data, index) => (
            <User
                key={index}
                {...data}
            />
        ))}
    </div>
);
UserList.propTypes = {
    users: PropTypes.arrayOf(PropTypes.object)
};

const Credits = () => (
    <>
        <Header />
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                {APP_NAME} Credits
            </h1>
            <p className={styles.wrap}>
                To start off, we would like to thank the developers of Scratch. Without them, none of this would be possible,
                and people would be learning complicated text-based programming languages. It grew from a simple tool for kids at the
                Computer Clubhouse, to the most popular block-based programming language in the world. So truly, thank you.
            </p>
        </header>
        <main className={styles.main}>
            <section>
                <p>
                    <i>
                        Individual contributors are listed in no particular order.
                        The order is randomized each visit.
                    </i>
                </p>
            </section>
            {/* Please don't remove this. Be nice! */}
            {APP_NAME !== 'AmpMod' && (
                <section>
                    <h2>AmpMod</h2>
                    <p>
                        {APP_NAME} is based on the work of the <a href="https://ampmod.codeberg.page/credits.html">AmpMod contributors</a> but is not endorsed by AmpMod in any way.
                    </p>
                </section>
            )}
            <section>
                <h2>TurboWarp</h2>
                <p>
                {APP_NAME} is based on the work of the <a href="https://turbowarp.org/credits.html">TurboWarp contributors</a> but is not endorsed by TurboWarp in any way.
                </p>
                <p>
                    <a href="https://github.com/GarboMuffin/sponsors">
                        Donate to support TurboWarp.
                    </a>
                </p>
            </section>
            <section>
                <h2>Scratch</h2>
                <p>
                    {APP_NAME} is based on the work of the <a href="https://scratch.mit.edu/credits">Scratch contributors</a> but is not endorsed by Scratch in any way.
                </p>
                <p>
                    <a href="https://scratch.mit.edu/donate">
                        Donate to support Scratch.
                    </a>
                </p>
            </section>
            <section>
                <h2>Other Scratch Mods</h2>
                <p>
                    {APP_NAME} uses code from other open-source Scratch modifications but is not endorsed by any them in any way.
                </p>
                <details>
                    <summary>Modifications AmpMod is based on</summary>
                    <ul>
                        <li><a href="https://librekitten.org">LibreKitten</a> (home page header)</li>
                    </ul>
                </details>
            </section>
            <section>
                <h2>Favicon</h2>
                <p>
                    The AmpMod favicon is from the <a href="https://gh.vercte.net/forumoji/">Forumoji</a> project by <a href="https://https://scratch.mit.edu/users/lolecksdeehaha/">lolecksdeehaha</a>.
            </section>
            <section>
                <h2>Contributors</h2>
                <UserList users={UserData.ubContributors} />
            </section>
            <section>
                <h2>TurboWarp Contributors</h2>
                <UserList users={UserData.contributors} />
            </section>
            <section>
                <h2>Addons</h2>
                <UserList users={UserData.addonDevelopers} />
            </section>
            <section>
                <h2>TurboWarp Extension Gallery</h2>
                <UserList users={UserData.extensionDevelopers} />
            </section>
            <section>
                <h2>Translators</h2>
                <p>
                    Unfortunately, AmpMod's only three developers only speak English. We are working
                    on a way for you to translate AmpMod. While we set it up, you can register
                    an account on <a href="https://translate.codeberg.org/">Codeberg Weblate</a> and
                    stay tuned.
                </p>
            </section>
            <section>
                <h2>Fonts</h2>
                <p>
                    {APP_NAME} uses the <a href="https://fonts.google.com/specimen/IBM+Plex+Sans">IBM Plex Sans</a> font from Google Fonts. It is licenced under the <a href="https://fonts.google.com/specimen/IBM+Plex+Sans/license">SIL Open Font License</a>.
                </p>
                <p>
                    The AmpMod logo uses the <a href="https://fonts.google.com/specimen/Pixelify+Sans">Pixelify Sans</a> font under the same licence.
                </p>
                <p>
                    The Apple Cat signature below uses the <a href="https://fonts.google.com/specimen/Caveat+Brush">Caveat Brush</a> font under the same licence.
                </p>
            </section>
            <section>
                <h2>You</h2>
                <p>
                    Most importantly, thank you for using {APP_NAME}, or at least trying it out. You're awesome!
                </p>
                <img src={appleCat} width="64" height="64" />
                <p className={myStyles.signature}>-Apple Cat</p>
            </section>
            <Footer />
        </main>
    </>
);

render(<Credits />);
