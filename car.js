class Car {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;


        // add physics
        this.speed = 0// for smooth motion

        this.acceleration = 0.2; // for smooth motion
        this.maxSpeed = 3;
        this.friction = 0.05;
        // for left and right
        this.angle = 0;
        this.controls = new Controls();
    }

    update() {
        this.#move();
    }
    #move() {
        // if (this.controls.forward) {
        //     this.y -= 2;
        // }
        // if (this.controls.reverse) {
        //     this.y += 2;
        // }
        if (this.controls.forward) {
            this.speed += this.acceleration;

        }
        if (this.controls.reverse) {
            this.speed -= this.acceleration;
        }
        // speed reduction
        // if the car speed forward is more than max speed
        if (this.speed > this.maxSpeed) {
            this.speed = this.maxSpeed;
        }
        // If the car speed in reverse 
        if (this.speed < -this.maxSpeed / 2) {
            this.speed = -this.maxSpeed / 2;

        }
        // add friction so it slows down smooth
        // reverse
        if (this.speed > 0) {
            this.speed -= this.friction;
        }
        // forward
        if (this.speed < 0) {
            this.speed += this.friction;
        }
        // this stops car keep going forward even after 0
        if (Math.abs(this.speed) < this.friction) {
            this.speed = 0;
        }
        // basic structure 
        // if (this.controls.left) {
        //     this.x -= 2;
        // }
        // if (this.controls.right) {
        //     this.x += 2;
        // }
        // implement physics
        //can use box2d library if needed

        if (this.speed != 0) { // stops from rotating like tank
            const flip = this.speed > 0 ? 1 : -1;

            // since the backward motion was not right
            if (this.controls.left) {
                //                this.angle += 0.03; // this is perfect for unit circle
                this.angle += 0.03 * flip; // this is perfect for unit circle

            }
            if (this.controls.right) {
                this.angle -= 0.03 * flip;
            }
        }
        // since the car was not following th directio nit was not pointed
        // implement unit cricle maths

        this.x -= Math.sin(this.angle) * this.speed;
        this.y -= Math.cos(this.angle) * this.speed;

        //this.y -= this.speed // since following unit math we dont need this basic motion
    }
    draw(ctx) {
        // for adding physics rotation in x  
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(-this.angle);

        //
        ctx.beginPath();
        ctx.rect(
            // since it is already translated 
            // this.x - this.width / 2,
            // this.y - this.height / 2,
            // new lines
            -this.width / 2,
            -this.height / 2,
            //
            this.width,
            this.height
        );
        ctx.fill();
        ctx.restore();
    }
}