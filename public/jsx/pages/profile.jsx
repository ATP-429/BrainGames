Profile = () => {
    const [ID, setID] = React.useState('');

    React.useEffect(() => {
        let id = new URL(window.location.href).searchParams.get('id');
        console.log(id);
        setID(id);
    }, []);

    return (
        <React.Fragment>
            <Navigator />
            <PlayerInfo id={ID} />
        </React.Fragment>
    )
}

ReactDOM.render(
    <Profile />,
    document.getElementById('page')
);