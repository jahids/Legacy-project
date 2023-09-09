import { Player, Controls } from '@lottiefiles/react-lottie-player';
import { useState } from 'react';


function LeafLottiePlayer(): any {
    const [redirect, setRedirect] = useState(false);


    const handleLoopComplete = (e: string) => {
        if (e === 'complete') setRedirect(true);
    };
    // if (redirect) {
    // 	return navigate('/register');
    // }

    return (
        <div style={{ backgroundColor: '#001F3F' }}>

            {
                <Player
                    autoplay={true}
                    loop={false}
                    src="https://lottie.host/e3ce2f1e-8b9f-4565-8fdb-d5489b1cda37/f8D8xeib4G.json"
                    style={{
                        height: '250px',
                        width: '200px', marginTop: '50px',
                        backgroundColor: '#e2ede2', borderRadius: '20%'
                    }}
                    onEvent={handleLoopComplete}>
                    <Controls
                        visible={false}
                        buttons={['play', 'repeat', 'frame', 'debug']}
                    />
                </Player>
            }
        </div>
    );
}

export default LeafLottiePlayer;