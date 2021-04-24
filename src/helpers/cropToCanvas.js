export const cropToCanvas = (image, canvas, ctx) => {
    const naturalWidth = image.naturalWidth;
    const naturalHeight = image.naturalHeight;

    canvas.width = image.width;
    canvas.height = image.height;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    if (naturalWidth > naturalHeight) {
        ctx.drawImage(
            image, (naturalWidth - naturalHeight) / 2,
            0, naturalHeight, naturalHeight,
            0, 0, ctx.canvas.width, ctx.canvas.height
        );
    } else {
        ctx.drawImage(
            image, 0, (naturalHeight - naturalWidth) / 2,
            naturalWidth, naturalWidth, 0,
            0, ctx.canvas.width, ctx.canvas.height
        );
    }
};
