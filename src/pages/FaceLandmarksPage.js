import * as React from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/face-landmarks-detection';
import Webcam from 'react-webcam';
import { drawMesh } from '../helpers/drawMesh';
import '../App.scss';

function App() {
    const [visible, setVisible] = React.useState(false);
    const webcamRef = React.useRef(null);
    const canvasRef = React.useRef(null);

    const handleCamera = () => {
        setVisible(!visible);
    };

    const runFacemesh = async () => {
        const net = await facemesh.load(facemesh.SupportedPackages.mediapipeFacemesh);
        setInterval(() => {
            detect(net);
        }, 10);
    };

    const detect = async (net) => {
        if (
            typeof webcamRef.current !== 'undefined' &&
            webcamRef.current !== null &&
            webcamRef.current.video.readyState === 4
        ) {
            const video = webcamRef.current.video;
            const videoWidth = webcamRef.current.video.videoWidth;
            const videoHeight = webcamRef.current.video.videoHeight;

            webcamRef.current.video.width = videoWidth;
            webcamRef.current.video.height = videoHeight;

            canvasRef.current.width = videoWidth;
            canvasRef.current.height = videoHeight;
            const face = await net.estimateFaces({input:video});

            const ctx = canvasRef.current.getContext('2d');
            requestAnimationFrame(()=>{drawMesh(face, ctx)});
        }
    };

    React.useEffect(()=>{
        runFacemesh()
    }, []);

    return (
        <div className="App">
            <div className="btn-container">
                <button className="camera-btn" onClick={() => handleCamera()}>{visible ? 'Deactivate' : 'Activate'} Camera</button>
            </div>
            {visible ? (
                <>
                <Webcam
                    ref={webcamRef}
                    muted={true} 
                    style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 9,
                    width: 640,
                    height: 480,
                    }}
                />      
                <canvas
                    ref={canvasRef}
                    style={{
                    position: "absolute",
                    marginLeft: "auto",
                    marginRight: "auto",
                    left: 0,
                    right: 0,
                    textAlign: "center",
                    zindex: 8,
                    width: 640,
                    height: 480,
                    }}
                />
                </>
            ) : null}
            </div>
    );
}

export default App;