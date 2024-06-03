import {vectorModule, vector} from "./utility.js";

const drawOnlyVertex = (Coords, i, ctx, radius) => {
    ctx.beginPath();
    ctx.arc(Coords.xCoord[i], Coords.yCoord[i], radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText((i + 1).toString(), Coords.xCoord[i], Coords.yCoord[i]);
    ctx.closePath();
}

const drawStitch = (Coords, i, ctx, radius) => {
    ctx.beginPath();
    ctx.moveTo(Coords.xCoord[i], Coords.yCoord[i]);
    ctx.arc(Coords.xCoord[i] - radius, Coords.yCoord[i] - radius,
        radius, Math.PI * 2, 0);
    ctx.stroke();
    ctx.closePath();
}

const drawLine = (Coords, i, j, ctx) => {
    ctx.beginPath();
    ctx.moveTo(Coords.xCoord[i], Coords.yCoord[i]);
    ctx.lineTo(Coords.xCoord[j], Coords.yCoord[j]);
    ctx.stroke();
    ctx.closePath();
}

const drawEllipse = (Coords, i, j, angle, ctx, radius) => {
    const endX = Coords.xCoord[j] - radius * Math.cos(angle);
    const endY = Coords.yCoord[j] - radius * Math.sin(angle);
    const startX = Coords.xCoord[i],
        startY = Coords.yCoord[i]
    const middleX = (startX + endX) / 2;
    const middleY = (startY + endY) / 2;
    const newAngle = Math.atan2((endY - startY), (endX - startX));
    const triangleRadius = vectorModule(vector(startX, startY, endX, endY))
    ctx.beginPath();
    ctx.moveTo(Coords.xCoord[i], Coords.yCoord[i]);
    ctx.ellipse(middleX, middleY, triangleRadius / 2, radius * 2,
        newAngle, Math.PI, 0);
    ctx.stroke();
    ctx.closePath();
    return newAngle;
}

const drawArrows = (angle, xArrow, yArrow, ctx, n = 0) => {
    let leftX,
        rightX,
        leftY,
        rightY;
    if (n === 1){
        leftX = xArrow - 15 * Math.cos(angle + 0.5 + Math.PI / 3);
        rightX = xArrow - 15 * Math.cos(angle - 0.5 + Math.PI / 3);
        leftY = yArrow - 15 * Math.sin(angle + 0.5 + Math.PI / 3);
        rightY = yArrow - 15 * Math.sin(angle - 0.5 + Math.PI / 3);
    }
    else {
        leftX = xArrow - 15 * Math.cos(angle + 0.5);
        rightX = xArrow - 15 * Math.cos(angle - 0.5);
        leftY = yArrow - 15 * Math.sin(angle + 0.5);
        rightY = yArrow - 15 * Math.sin(angle - 0.5);
    }
    ctx.beginPath();
    ctx.moveTo(xArrow, yArrow);
    ctx.lineTo(leftX, leftY);
    ctx.moveTo(xArrow, yArrow);
    ctx.lineTo(rightX, rightY);
    ctx.stroke();
    ctx.closePath();
}


const arrow = (Coords, j, angle, vertexRadius, ctx, n) => {
    const xArrow = Coords.xCoord[j] - vertexRadius * Math.cos(angle);
    const yArrow = Coords.yCoord[j] - vertexRadius * Math.sin(angle);
    drawArrows(angle, xArrow, yArrow, ctx, n);
}



const drawCondVertex = (Coords, i, radius, ctx) => {
    ctx.beginPath();
    ctx.arc(Coords.xCoord[i], Coords.yCoord[i], radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.fillText(`K${parseInt(i)+1}`, Coords.xCoord[i], Coords.yCoord[i]);
    ctx.closePath();
}

export {drawLine, drawEllipse, drawOnlyVertex, drawCondVertex, arrow, drawArrows, drawStitch};