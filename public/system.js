$.ajax({
    url: `/account/`,
    method: 'GET',
}).then(data => {
    console.log(data);
}).catch(err => {
    console.log(err);
})