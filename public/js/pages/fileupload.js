FileForm = () => {
  [imageId, setImageId] = React.useState('');
  [imageURL, setImageURL] = React.useState('');

  let upload = () => {
    let formData = new FormData(document.getElementById('form'));
    console.log(...formData);
    this.upload(formData).then(res => {
      console.log(res);
      setImageId(res.id);
    });
  };

  React.useEffect(() => {
    get_file(imageId).then(blob => window.URL.createObjectURL(blob)).then(url => setImageURL(url));
  }, [imageId]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("form", {
    id: "form",
    action: ""
  }, /*#__PURE__*/React.createElement("input", {
    name: "file",
    id: "file",
    type: "file"
  })), /*#__PURE__*/React.createElement("button", {
    className: "btn btn-primary",
    onClick: upload
  }, "Upload"), /*#__PURE__*/React.createElement("img", {
    src: imageURL
  }));
};

ReactDOM.render( /*#__PURE__*/React.createElement(FileForm, null), document.getElementById('page'));