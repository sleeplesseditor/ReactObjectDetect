import {TRIANGULATION} from './triangulation';

const drawPath = (ctx, points, closePath) => {
    const region = new Path2D();
    region.moveTo(points[0][0], points[0][1]);
    for (let i = 1; i < points.length; i++) {
        const point = points[i];
        region.lineTo(point[0], point[1]);
    }

    if (closePath) {
        region.closePath();
    }
    ctx.strokeStyle = "grey";
    ctx.stroke(region);
};

export const drawMesh = (predictions, ctx) => {
    if (predictions.length > 0) {
        predictions.forEach((prediction) => {
        const keypoints = prediction.scaledMesh;

        for (let i = 0; i < TRIANGULATION.length / 3; i++) {
            const points = [
                TRIANGULATION[i * 3],
                TRIANGULATION[i * 3 + 1],
                TRIANGULATION[i * 3 + 2],
            ].map((index) => keypoints[index]);
            drawPath(ctx, points, true);
        }

        for (let i = 0; i < keypoints.length; i++) {
            const x = keypoints[i][0];
            const y = keypoints[i][1];

            ctx.beginPath();
            ctx.arc(x, y, 1, 0, 3 * Math.PI);
            ctx.fillStyle = "aqua";
            ctx.fill();
        }
        });
    }
};