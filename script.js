const game = new Game();

var setup = () => {
    fullScreen();
    game.setup();
};

var draw = () => {
    game.draw();
};

var mouseClicked = () => {
    if (!game.started) {
        game.startGame();
    }
};

function Game() {
    this.components = [];
    this.menuComponents = [];
    this.started = false;

    this.setup = function () {
        this.components = [
            new Background(color(119, 89, 189)),
            new Ball(),
            new Paddle(),
            new Paddle(true),
        ];
        this.menuComponents = [
            new Background(randomPastelColor()),
        ];
    };

    this.draw = function () {
        if (this.started) {
            this.components.forEach(component => {
                component.step && component.step();
                component.draw && component.draw();
            });
        } else {
            this.menuComponents.forEach(component => {
                component.step && component.step();
                component.draw && component.draw();
            });
        }
    };

    this.startGame = function () {
        this.started = true;
    };
}

function Background(backgroundColor) {
    this.backgroundColor = backgroundColor;

    this.draw = function () {
        background(this.backgroundColor);
    };
}

function Paddle() {
    this.width = 200;
    this.height = 10;

    this.draw = function () {
        rect(mouseX , maxHeight - 100 -10, this.width, this.height);
    };
}

function Ball() {
    this.x = 130;
    this.y = 300;
    this.xSpeed = 5;
    this.ySpeed = 5;
    this.radius = 10;
    this.active = true;

    this.step = function () {
        if (!this.active) {
            return;
        }
        if (this.y > c.H - this.radius) {
            this.ySpeed *= -1;
            // this.active = false;
        }
        if (this.y < this.radius) {
            this.ySpeed *= -1;
        }
        if (this.x > c.W - this.radius || this.x < this.radius) {
            this.xSpeed *= -1;
        }
        if (this.shouldBounceOffPaddle()) {
            this.ySpeed *= -1;
        }
        this.x += this.xSpeed;
        this.y += this.ySpeed;
    };

    this.draw = function () {
        circle(this.x, this.y, this.radius);
    };

    this.shouldBounceOffPaddle = function () {
        const topOfPaddle = maxHeight - 100;
        if (this.x > mouseX
            && this.x < mouseX + 200
            && this.y >= topOfPaddle - 1
            && this.y <= topOfPaddle + 1) {
            return true;
        }
        return false;
    };
}

/* need to switch it so the edge that stops the ball is the bottom edge (done)
Have only one paddle  and move it to the bottom (done)
Will need to switch the height and width of the paddles to get it right for the new orientation (done)
Have the paddle only move on the x axis instead of the y axis (done)
Determine how to set the ball to bounce off the top of the new paddle (done) */