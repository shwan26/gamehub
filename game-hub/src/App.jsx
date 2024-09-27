// src/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import GameSection from './components/GameSection';
import './App.css';

const App = () => {
    return (
        <div className="container">
            <Sidebar />
            <div className="main-content">
                <Header />
                <GameSection title="Black Myth: Wukong" imgSrc="https://image.api.playstation.com/vulcan/ap/rnd/202405/2117/bd406f42e9352fdb398efcf21a4ffe575b2306ac40089d21.png" />
                <GameSection title="Shadow of War" imgSrc="https://image.api.playstation.com/cdn/UP1018/CUSA01939_00/RqmfaWBQC0YplGns91rFEKYOkX9CA3OqpIXYyq6T2K0Kh0X2od1FEaZnBfy9h7s4.png" />
                <GameSection title="Witcher 3: Wild Hunt" imgSrc="https://i.redd.it/what-is-difference-between-goty-and-complete-edition-v0-9qoaqnxvdjw91.jpg?width=1024&format=pjpg&auto=webp&s=93112a3803887c2210f766fbe63c59aa41483d43" />
            </div>
        </div>
    );
};

export default App;
