import React, { useState } from 'react';

import { Header } from '../components/Header/Header.jsx';
import ActionButton from '../components/ActionButton/ActionButton.jsx';

const HomePage = () => {
    return (
        <div >
            <Header />
            <div className='home d-flex flex-fill align-items-center m-auto'>
                <ActionButton action="buy" label="Buy" />
                <ActionButton action="sell" label="Sell" />
                <ActionButton action="play" label="Play" />
            </div>
        </div>
    );
};

export default HomePage;