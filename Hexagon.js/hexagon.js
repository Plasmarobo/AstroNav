// Hex math defined here: http://blog.ruslans.com/2011/02/hexagonal-grid-math.html
// See LICENSE for original license
// Modifications by Austen Higgins-Cassidy
function HexagonGrid(canvasId, radius, clickCallback, originX, originY) {
    this.radius = radius;
    this.clickCallback = clickCallback;
    this.fillColor = "rgba(52,152, 219,0.1)";
    this.lineColor = "rgba(52,152, 219,0.3)";
    this.textColor = "rgba(231, 76,60, 1)";

    this.height = Math.sqrt(3) * radius;
    this.width = 2 * radius;
    this.side = (3 / 2) * radius;

    this.canvas = document.getElementById(canvasId);
    this.context = this.canvas.getContext('2d');

    this.canvasOriginX = 0;
    this.canvasOriginY = 0;

    this.canvas.addEventListener("mousedown", this.clickEvent.bind(this), false);
};

HexagonGrid.prototype.updateRadius = function(radius)
{
    this.radius = radius;
    this.height = Math.sqrt(3) * radius;
    this.width = 2 * radius;
    this.side = (3 / 2) * radius;
}

HexagonGrid.prototype.updateOffset = function(originX, originY) {
    this.canvasOriginX = originX;
    this.canvasOriginY = originY;
}

HexagonGrid.prototype.drawHexGrid = function (rows, cols, isDebug) {
    var currentHexX;
    var currentHexY;
    var debugText = "";

    var offsetColumn = false;

    for (var col = 0; col < cols; col++) {
        for (var row = 0; row < rows; row++) {

            if (!offsetColumn) {
                currentHexX = (col * this.side) + this.canvasOriginX;
                currentHexY = (row * this.height) + this.canvasOriginY;
            } else {
                currentHexX = col * this.side + this.canvasOriginX;
                currentHexY = (row * this.height) + this.canvasOriginY + (this.height * 0.5);
            }

            if (isDebug) {
                debugText = col + "," + row;
            }

            this.drawHex(currentHexX, currentHexY, this.fillColor, debugText);
        }
        offsetColumn = !offsetColumn;
    }
};

HexagonGrid.prototype.getWidth = function(cols) {
    return this.side * cols;
}

HexagonGrid.prototype.getHeight = function(rows) {
    return (this.height * rows) + (this.height/2);
}

HexagonGrid.prototype.drawHexAtColRow = function(column, row, color) {
    var drawy = col % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    var drawx = (col * this.side) + this.canvasOriginX;

    this.drawHex(drawx, drawy, color, "");
};

HexagonGrid.prototype.drawAt = function(col, row, image, dimensionLimit) {
    if (typeof dimensionLimit == 'undefined')
    {
        dimensionLimit = image.width;
    }

    var drawy = col % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2);
    var drawx = (col * this.side) + this.canvasOriginX;

    this.context.drawImage(image, drawx - (dimensionLimit/2) + this.width/2, drawy - (dimensionLimit/2) + this.height/2, dimensionLimit, dimensionLimit);
}

HexagonGrid.prototype.labelAt = function(col, row, offset_x, offset_y, text, dimensionLimit) {
    this.context.font = 'Orbitron, 18pt sans-serif';
    // Doesn't work in brave!
    //var metrics = this.context.measureText(text);
    var metrics = {};
    metrics.width = 5 * text.length;
    metrics.height = 9;
    if (typeof dimensionLimit == 'undefined')
    {
        dimensionLimit = metrics.width;
    }
    var textPad = 1;
    var drawy = col % 2 == 0 ? (row * this.height) + this.canvasOriginY : (row * this.height) + this.canvasOriginY + (this.height / 2) + offset_y;
    var drawx = (col * this.side) + this.canvasOriginX + offset_x;
    this.context.fillStyle = 'rgba(128, 128, 128, 0.5)';
    this.context.fillRect(drawx - (dimensionLimit/2) + this.width/2, drawy - (dimensionLimit/2) + this.height/2 - metrics.height, metrics.width + (2 * textPad), metrics.height + (2 * textPad));
    this.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
    this.context.fillText(text, drawx - (dimensionLimit/2) + this.width/2, drawy - (dimensionLimit/2) + this.height/2);
}

HexagonGrid.prototype.drawHex = function(x0, y0, fillColor, debugText) {
    this.context.strokeStyle = this.lineColor;
    this.context.beginPath();
    this.context.moveTo(x0 + this.width - this.side, y0);
    this.context.lineTo(x0 + this.side, y0);
    this.context.lineTo(x0 + this.width, y0 + (this.height / 2));
    this.context.lineTo(x0 + this.side, y0 + this.height);
    this.context.lineTo(x0 + this.width - this.side, y0 + this.height);
    this.context.lineTo(x0, y0 + (this.height / 2));

    if (fillColor) {
        this.context.fillStyle = fillColor;
        this.context.fill();
    }

    this.context.closePath();
    this.context.stroke();

    if (debugText) {
        this.context.font = "8px";
        this.context.fillStyle = this.textColor;
        this.context.fillText(debugText, x0 + (this.width / 2) - (this.width/4), y0 + (this.height - 5));
    }
};

//Recusivly step up to the body to calculate canvas offset.
HexagonGrid.prototype.getRelativeCanvasOffset = function() {
	var x = 0, y = 0;
	var layoutElement = this.canvas;
    if (layoutElement.offsetParent) {
        do {
            x += layoutElement.offsetLeft;
            y += layoutElement.offsetTop;
        } while (layoutElement = layoutElement.offsetParent);

        return { x: x, y: y };
    }
    return { x: 0, y: 0 };
}

//Uses a grid overlay algorithm to determine hexagon location
//Left edge of grid has a test to acuratly determin correct hex
HexagonGrid.prototype.getSelectedTile = function(mouseX, mouseY) {

	var offSet = this.getRelativeCanvasOffset();

    mouseX -= offSet.x;
    mouseY -= offSet.y;

    var column = Math.floor((mouseX) / this.side);
    var row = Math.floor(
        column % 2 == 0
            ? Math.floor((mouseY) / this.height)
            : Math.floor(((mouseY + (this.height * 0.5)) / this.height)) - 1);


    //Test if on left side of frame
    if (mouseX > (column * this.side) && mouseX < (column * this.side) + this.width - this.side) {


        //Now test which of the two triangles we are in
        //Top left triangle points
        var p1 = new Object();
        p1.x = column * this.side;
        p1.y = column % 2 == 0
            ? row * this.height
            : (row * this.height) + (this.height / 2);

        var p2 = new Object();
        p2.x = p1.x;
        p2.y = p1.y + (this.height / 2);

        var p3 = new Object();
        p3.x = p1.x + this.width - this.side;
        p3.y = p1.y;

        var mousePoint = new Object();
        mousePoint.x = mouseX;
        mousePoint.y = mouseY;

        if (this.isPointInTriangle(mousePoint, p1, p2, p3)) {
            column--;

            if (column % 2 != 0) {
                row--;
            }
        }

        //Bottom left triangle points
        var p4 = new Object();
        p4 = p2;

        var p5 = new Object();
        p5.x = p4.x;
        p5.y = p4.y + (this.height / 2);

        var p6 = new Object();
        p6.x = p5.x + (this.width - this.side);
        p6.y = p5.y;

        if (this.isPointInTriangle(mousePoint, p4, p5, p6)) {
            column--;

            if (column % 2 == 0) {
                row++;
            }
        }
    }

    return  { row: row, column: column };
};


HexagonGrid.prototype.sign = function(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
};

//TODO: Replace with optimized barycentric coordinate method
HexagonGrid.prototype.isPointInTriangle = function isPointInTriangle(pt, v1, v2, v3) {
    var b1, b2, b3;

    b1 = this.sign(pt, v1, v2) < 0.0;
    b2 = this.sign(pt, v2, v3) < 0.0;
    b3 = this.sign(pt, v3, v1) < 0.0;

    return ((b1 == b2) && (b2 == b3));
};

HexagonGrid.prototype.clickEvent = function (e) {
    var mouseX = e.pageX;
    var mouseY = e.pageY;

    var localX = mouseX - this.canvasOriginX;
    var localY = mouseY - this.canvasOriginY;

    var tile = this.getSelectedTile(localX, localY);
    if (this.clickCallback) {
        this.clickCallback(tile);
    }
};
