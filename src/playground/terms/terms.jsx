import React from 'react';
import render from '../app-target';
import styles from '../info.css';

import {APP_NAME} from '../../lib/brand';
import {applyGuiColors} from '../../lib/themes/guiHelpers';
import {detectTheme} from '../../lib/themes/themePersistance';

import Header from '../../components/amp-header/header.jsx';

/* eslint-disable react/jsx-no-literals */

applyGuiColors(detectTheme());
document.documentElement.lang = 'en';

const Home = () => (
    <>
        <Header />
        <header className={styles.headerContainer}>
            <h1 className={styles.headerText}>
                AmpMod Terms of Service
            </h1>
        </header>
        <main className={styles.main}>
            <section>
                <h2>Terms of Service</h2>
                <p>Welcome to AmpMod. By accessing or using our services, you agree to comply with and be bound by the following terms and conditions. Please review them carefully.</p>
                
                <h3>1. Introduction</h3>
                <p>AmpMod is open to users of all ages. We are committed to fostering a safe and inclusive community. We are excited to announce that AmpMod will soon have an uploading service. This is the terms of service for it.</p>
                
                <h3>2. Community Guidelines</h3>
                <p>All content on the AmpMod website must adhere to Scratch's community guidelines. Users are expected to ensure that their contributions are appropriate, respectful, and do not violate any laws or regulations. Any content deemed inappropriate may be removed at our discretion.</p>
                
                <h3>3. Independence</h3>
                <p>AmpMod is not affiliated with Scratch, TurboWarp, or any other Scratch modifications. We are an independent project with our own goals and community. Any references to these entities are for informational purposes only and do not imply any endorsement or partnership.</p>
                
                <h3>4. Use at Your Own Risk</h3>
                <p><strong>Use AmpMod at your own risk. While we strive to provide a safe and enjoyable experience, we cannot guarantee the security, reliability, or availability of the service. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability and fitness for a particular purpose.</strong></p>
                
                <h3>5. Limitation of Liability</h3>
                <p><strong>In no event shall AmpMod, its volunteers, or affiliates be liable for any direct, indirect, incidental, special, or consequential damages arising out of or in connection with your use of the service. This includes, but is not limited to, damages for loss of profits, goodwill, use, data, or other intangible losses.</strong></p>
                
                <h3>6. Privacy Policy</h3>
                <p>Your privacy is important to us. Everyone says this, but we mean it. Please review TurboWarp's Privacy Policy at <a href="/privacy.html">/privacy.html</a> for information on how we collect, use, and protect your personal data.</p>
                
                <h3>7. Changes to Terms</h3>
                <p>We reserve the right to modify these terms at any time. Any changes will be effective immediately upon posting on this page. Your continued use of the service constitutes your acceptance of the revised terms.</p>
                
                <h3>8. Contact Us</h3>
                <p>If you have any questions or concerns about these terms, please contact us through our support channels. If you believe your copyright has been infringed, contact us at <code>[AmpMod Copyright Email]</code></p>
            </section>
        </main>
    </>
);

render(<Home />);
