Profile = () => {
    [playerDetails, setPlayerDetails] = React.useState({

    });

    React.useEffect(() => {
        get_details(new URL(window.location.href).searchParams.get('id')).then(details => {
            
        })
    }, []);

    return (
        <PlayerCard props={playerDetails}></PlayerCard>
    )
}

ReactDOM.render(
    <Profile />,
    document.getElementById('page')
);