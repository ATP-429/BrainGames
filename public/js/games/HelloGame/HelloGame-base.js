//This is the base game file. All client side logic which doesn't involve react will run here

HelloGame = class extends Game {
    render(ctx) {
        ctx.fillStyle = 'green';
        if(this.state.x && this.state.y)
            ctx.fillRect(this.state.x, this.state.y, 10, 10);
    }

    update() {
        
    }
}
