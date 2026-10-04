import React from 'react';
import { HashLoader } from 'react-spinners';

const Loading = () => {
    return (
        <div className='mx-auto my-12'>
          <HashLoader color='#0F6848'/>
        </div>
    );
};

export default Loading;