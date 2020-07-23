import React from 'react';
import Lottie from 'react-lottie';

// * Animation data
import ManPcAnimation from '../animations/man_pc.json';

const Animation = () => {
    return (
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: ManPcAnimation,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                },
            }}
            width={300}
        />
    );
};

export default Animation;
