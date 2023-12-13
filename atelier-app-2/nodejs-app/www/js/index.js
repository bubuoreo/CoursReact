function go() {
    var msg = document.getElementById('input').value;
    const body = { "msg" : msg }
    fetch("/msg", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    });
}