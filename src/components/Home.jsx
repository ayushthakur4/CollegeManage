import React from 'react';
import Navbar from './Navbar'; 
import Hero from './Hero';
import WhatWeAre from './WhatWeAre';
import ChatBot from './ChatBot';

function Home() {
  return (
    <>
     
      <Hero />
      <Navbar />
      <WhatWeAre />
      <ChatBot /> 
    </>
  );
}

export default Home;
