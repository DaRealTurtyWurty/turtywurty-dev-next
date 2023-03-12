export default class Picker {
    constructor(target, width, height) {
        this.target = target;

        this.width = width;
        this.height = height;

        this.target.width = this.width;
        this.target.height = this.height;

        this.ctx = this.target.getContext("2d", { willReadFrequently: true });

        this.pickerCircle = {x: 10, y: 10, width: 7, height: 7};

        this.listen();
    }

    draw() {
        this.build();
    }

    build() {
        let gradient = this.ctx.createLinearGradient(0, 0, this.width, 0);
        gradient.addColorStop(0, "rgb(255, 0, 0)");
        gradient.addColorStop(0.15, "rgb(255, 0, 255)");
        gradient.addColorStop(0.33, "rgb(0, 0, 255)");
        gradient.addColorStop(0.49, "rgb(0, 255, 255)");
        gradient.addColorStop(0.67, "rgb(0, 255, 0)");
        gradient.addColorStop(0.84, "rgb(255, 255, 0)");
        gradient.addColorStop(1, "rgb(255, 0, 0)");

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.5, "rgba(255, 255, 255, 0)");
        gradient.addColorStop(0.5, "rgba(0, 0, 0, 0)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 1)");

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);

        this.ctx.beginPath();
        this.ctx.arc(this.pickerCircle.x, this.pickerCircle.y, this.pickerCircle.width, 0, Math.PI * 2);
        this.ctx.fillStyle = "black";
        this.ctx.stroke();
        this.ctx.closePath();
    }

    listen() {
        let isMouseDown = false;

        const mouseDown = (e) => {
            let currentX = e.clientX - this.target.offsetLeft;
            let currentY = e.clientY - this.target.offsetTop;

            if(currentX > this.pickerCircle.x && currentX < this.pickerCircle.x + this.pickerCircle.width &&
                currentY > this.pickerCircle.y && currentY < this.pickerCircle.y + this.pickerCircle.height) {
                isMouseDown = true;
            } else {
                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;
            }
        }

        const mouseMove = (e) => {
            if (isMouseDown) {
                let currentX = e.clientX - this.target.offsetLeft;
                let currentY = e.clientY - this.target.offsetTop;

                this.pickerCircle.x = currentX;
                this.pickerCircle.y = currentY;

                this.build();
            }
        }

        const mouseUp = (e) => {
            isMouseDown = false;
        }

        this.target.addEventListener("mousedown", mouseDown);
        this.target.addEventListener("mousemove", mouseMove);
        this.target.addEventListener("mousemove", () => this.onChangeCallback(this.getPickedColor()));

        document.addEventListener("mouseup", mouseUp);
    }

    getPickedColor() {
        let imageData = this.ctx.getImageData(this.pickerCircle.x, this.pickerCircle.y, 1, 1).data;
        return { r: imageData[0], g: imageData[1], b: imageData[2] }
    }

    onChange(callback) {
        this.onChangeCallback = callback;
    }
}