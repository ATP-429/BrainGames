HelloGame = class extends Game {
    render(ctx) {
        ctx.fillStyle = 'green';
        if(this.state.x && this.state.y)
            ctx.fillRect(this.state.x, this.state.y, 10, 10);
    }
}
