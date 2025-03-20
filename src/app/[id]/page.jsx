export async function generateStaticParams() {
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' }  // Replace with your actual dynamic IDs
  ];
}

import React from 'react';
import ChatBot from './ChatCompo';

const Page = ({ params: { id } }) => {
  return <ChatBot id={id} />;
};

export default Page;
