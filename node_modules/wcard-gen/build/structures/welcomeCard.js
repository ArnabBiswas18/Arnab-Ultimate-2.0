const { createCanvas, loadImage, GlobalFonts } = require("@napi-rs/canvas");

GlobalFonts.registerFromPath("node_modules/wcard-gen/build/structures/font/Montserrat-Black.ttf", "montserrat-black")
GlobalFonts.registerFromPath("node_modules/wcard-gen/build/structures/font/Montserrat-ExtraLight.ttf", "montserrat-extra-light")

const defaultAssets = {
    shadow: "https://s6.imgcdn.dev/Zqmpi.png",
    gradient: "https://s6.imgcdn.dev/ZqFsH.png"
}

class Wcard {
    constructor(options) {
        this.username = options?.username;
        this.avatar = options?.avatar;
        this.title = options?.title;
        this.color = options?.color;
        this.background = options?.background;
    }

    setName(name) {
        this.username = name;
        return this;
    }

    setAvatar(image) {
        this.avatar = image;
        return this;
    }

    setTitle(title) {
        this.title = title;
        return this;
    }

    setColor(color) {
        this.color = color;
        return this;
    }

    setBackground(background) {
        this.background = background
        return this;
    }

    async build() {
        if (!this.username) throw new Error("Provide username to display on card");
        if (!this.avatar) throw new Error("Provide valid avatar url of user");
        if (!this.title) this.setTitle("WELCOME");
        if (!this.color) this.setColor("00FF38")

        if(this.username.length >= 16) {
            throw new Error(`The username is too long to display on card [less than equal to 15]`);
        }

        if(this.title.length >= 20) {
            throw new Error(`The title is too long to display on card [less than equal to 15]`);
        }

        const canvasWidth = 1280;
        const canvasHeight = 620;

        const centerX = canvasWidth / 2;
        const centerY = canvasHeight / 2;

        const canvas = createCanvas(canvasWidth, canvasHeight);
        const ctx = canvas.getContext("2d");

        // BACKGROUND
        await loadImage(this.background).then(async (image) => {
            const scale = Math.max(canvasWidth / image.width, canvasHeight / image.height);

            const imageWidth = image.width * scale;
            const imageHeight = image.height * scale;
            const imageX = (canvasWidth - imageWidth) / 2;
            const imageY = (canvasHeight - imageHeight) / 2;

            ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

            // ADD GRADIENT EFFECT
            await loadImage(defaultAssets.gradient).then((image) => {
                ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);
            })

            const svgString = "";

            // Create a data URI from the SVG string
            const dataUri = `data:image/svg+xml;base64,${Buffer.from(svgString).toString('base64')}`;

            await loadImage(dataUri).then((image) => {
                ctx.drawImage(image, 0, 0, 1280, 538);
            })
        });

        // NAME OF USER
        ctx.fillStyle = `#${this.color}`
        ctx.font = `64px montserrat-black`
        ctx.textAlign = 'center';
        ctx.fillText(`${this.title}`.toUpperCase(), centerX, centerY + 100)

        const gradient = ctx.createLinearGradient(0, 0, 0, canvasHeight);
        gradient.addColorStop(0, '#ffffff');
        gradient.addColorStop(0.5, '#ffffff');
        gradient.addColorStop(1, '#494949');

        ctx.fillStyle = gradient
        ctx.font = `80px montserrat-black`
        ctx.textAlign = 'center';
        ctx.fillText(`${this.username}`.toUpperCase(), centerX, centerY + 180)


        // SHADOW OF AVATAR (FIRST)
        await loadImage(defaultAssets.shadow).then((image) => {
            ctx.drawImage(image, 466, 48, 348, 348);
        });

        // AVATAR OF USER
        await loadImage(this.avatar).then((image) => {
            ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 509
            ctx.shadowOffsetY = 92

            ctx.beginPath();
            ctx.arc(510 + 130, 92 + 130, 130, 0, Math.PI * 2);
            ctx.closePath();
            ctx.clip();

            ctx.drawImage(image, 510, 92, 260, 260);
        })

        return canvas.toBuffer("image/png");
    }
}

module.exports = { Wcard }