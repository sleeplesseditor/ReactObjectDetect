import * as React from 'react';
import MagicDropzone from 'react-magic-dropzone';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import { cropToCanvas } from '../helpers/cropToCanvas';
import '@tensorflow/tfjs';
import './ImageReaderPage.scss';

const ImageReaderPage = () => {
    const [model, setModel] = React.useState(null);
    const [preview, setPreview] = React.useState('');

    React.useEffect(() => {
        cocoSsd.load().then(model => {
            setModel(model)
        });
    }, []);

    const onDrop = (accepted, rejected, links) => {
        setPreview(accepted[0].preview || links[0])
    };

    const onImageChange = (e) => {
        const c = document.getElementById('canvas');
        const ctx = c.getContext('2d');

        cropToCanvas(e.target, c, ctx);

        model.detect(c).then(predictions => {
            const font = '16px sans-serif';
            ctx.font = font;
            ctx.textBaseline = 'top';
      
            predictions.forEach(prediction => {
                const x = prediction.bbox[0];
                const y = prediction.bbox[1];
                const width = prediction.bbox[2];
                const height = prediction.bbox[3];
                ctx.strokeStyle = '#00FFFF';
                ctx.lineWidth = 4;
                ctx.strokeRect(x, y, width, height);
                ctx.fillStyle = '#00FFFF';
                const textWidth = ctx.measureText(prediction.class).width;
                const textHeight = parseInt(font, 10);
                ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
            });

            predictions.forEach(prediction => {
                const x = prediction.bbox[0];
                const y = prediction.bbox[1];
                ctx.fillStyle = '#000000';
                ctx.fillText(prediction.class, x, y);
            });
        });
    }
    
    return (
        <div className="Dropzone-page">
            {model ? (
                <MagicDropzone
                    className="Dropzone"
                    accept="image/jpeg, image/png, .jpg, .jpeg, .png"
                    multiple={false}
                    onDrop={onDrop}
                >
                    {preview ? (
                        <img
                            alt="upload preview"
                            onLoad={onImageChange}
                            className="Dropzone-img"
                            src={preview}
                        />
                    ) : "Choose or drop a file."}
                    <canvas id="canvas" />
                </MagicDropzone>
            ) : (
                <div className="Dropzone">Loading model...</div>
            )}
        </div>
    )
}

export default ImageReaderPage;