import React from 'react';
import render from '../app-target';
import styles from '../info.css';
import homeStyles from './home.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';

import Header from '../../components/amp-header/header.jsx';
import Footer from '../../components/amp-footer/footer.jsx';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const Home = () => (
    <>
        <Header />
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                {APP_NAME} - The definitive Scratch mod
            </h1>
            <p>AmpMod combines features from other Scratch modifications and adds convenient features.</p>
            <a href="/editor.html" className={homeStyles.primaryButton}>
                Try now!
            </a>
        </header>
        <section>
            <div className={homeStyles.notification}>
                <h2>Contribute to AmpMod!</h2>
                <p>
                    AmpMod is an open-source project. You can contribute to the project by visiting our Codeberg repository.
                    Even if you don't know JavaScript, your help is appreciated!
                </p>
            </div>
        </section>
        <main className={`${styles.main} ${homeStyles.center}`}>
            <section>
                <h2>What is AmpMod?</h2>
                <p>
                    AmpMod is a Scratch modification that combines features from other Scratch modifications.
                    It also adds convenient features to make complex projects easily.
                </p>
            </section>
            <section>
                <h2>It's not just Scratch, it's AmpMod!</h2>
                <p>
                    AmpMod is designed to be a convenient package of features to make complex projects easily.
                    From clicker games to scientific experiments, we have it all.
                </p>
            </section>
            <section>
                <h2>{APP_NAME} is licenced under the GPL v3</h2>
                <a href="/LICENSE.txt" className={homeStyles.button}>
                    View the licence
                </a>
            </section>
            <section>
                <h2>Need help?</h2>
                <a href="https://scratch.mit.edu/discuss/topic/806311" className={`${homeStyles.button} ${homeStyles.marginRight}`}>
                    Visit the forum
                </a>
                <a href="https://ultiblocks.miraheze.org/wiki/Main_Page" className={homeStyles.button}>
                    Visit the wiki
                </a>
            </section>
            <Footer />
        </main>
    </>
);

render(<Home />);
