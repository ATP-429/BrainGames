FileForm = () => {
    [imageId, setImageId] = React.useState('');
    [imageURL, setImageURL] = React.useState('');

    let upload = () => {
        let formData = new FormData(document.getElementById('form'));
        console.log(...formData);
        this.upload(formData).then(res => {console.log(res); setImageId(res.id)});
    }

    React.useEffect(() => {
        get_file(imageId).then(blob => window.URL.createObjectURL(blob)).then(url => setImageURL(url))
    }, [imageId]);

    return(
        <React.Fragment>
            <form id="form" action="">
                <input name="file" id="file" type="file" />
            </form>
            <button className="btn btn-primary" onClick={upload}>Upload</button>
            <img src={imageURL} />
        </React.Fragment>
    );
}

ReactDOM.render(
    <FileForm />,
    document.getElementById('page')
);
