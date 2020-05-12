// Create flipbook
if(document.getElementById('create-flipbook')){
document.getElementById('create-flipbook').addEventListener('submit', event => {
    event.preventDefault();
    const title = event.target.querySelector('input[name=title]').value;
    const pdfFile = event.target.querySelector('input[name=pdfFile]').value;
    var data = {
        'title': title,
        'pdfFile': pdfFile,
    };
    fetch('/admin', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
    )
        .then(function (r) { return r.json() })
        .then(function (response) {
            if (response.status) {
                document.location.reload();
            } else {
                alert(response.message || 'Une erreur est survenue');
            }
        })
});
}