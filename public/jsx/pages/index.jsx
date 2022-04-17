Homepage = () => {
    return (
        <React.Fragment>
            <Navigator/>
            {getSelfID() != null ? <PlayerInfo id={getSelfID()}/> : "Please login to see your stats"}
        </React.Fragment>
    )
}

ReactDOM.render(
    <Homepage />,
    document.getElementById('page')
);