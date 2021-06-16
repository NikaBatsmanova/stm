window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

function DeleteRows() {
    let table = document.getElementById("table_user");
    let rowCount = table.rows.length;
    for (let i = rowCount - 1; i > 0; i--) {
        table.deleteRow(i);
    }
}

function Discharge() {
    document.getElementById("mySearch").value = '';
    DeleteRows();
}

function Debounce(f, ms) {

    let isCooldown = false;

    return function () {
        if (isCooldown) return;

        f.apply(this, arguments);

        isCooldown = true;

        setTimeout(() => isCooldown = false, ms);
    };

}

async function Users() {
    DeleteRows();
    if (document.getElementById("mySearch").value !== '') {
        let url = "https://randomuser.me/api/?results=15";
        let response = await fetch(url);
        let result = await response.json();
        let list = result['results'];
        let warning = true;
        list.forEach(function (string) {
            let input, filter, name;
            input = document.getElementById("mySearch");
            filter = input.value.toUpperCase();
            name = `${string["name"]["first"]} ${string["name"]["last"]}`;
            if (name.toUpperCase().indexOf(filter) === 0) {
                warning = false;
                let tr = document.createElement("tr");
                let tdname = document.createElement("td");
                let tdpic = document.createElement("td");
                let tdloc = document.createElement("td");
                let tdemail = document.createElement("td");
                let tdphone = document.createElement("td");
                let tddate = document.createElement("td");
                let ul = document.createElement("ul");
                let pic = document.createElement("img");
                let piclarge = document.createElement("img");
                let span = document.createElement("span");
                tdname.textContent = `${string["name"]["first"]} ${string["name"]["last"]}`;
                tr.appendChild(tdname);
                pic.src = string["picture"]["thumbnail"];
                ul.appendChild(pic);
                piclarge.src = string["picture"]["large"];
                span.appendChild(piclarge);
                ul.appendChild(span);
                tdpic.appendChild(ul);
                tr.appendChild(tdpic);
                tdloc.textContent = `${string["location"]["city"]} ${string["location"]["state"]}`;
                tr.appendChild(tdloc);
                tdemail.textContent = `${string["email"]}`;
                tr.appendChild(tdemail);
                tdphone.textContent = `${string["phone"]}`;
                tr.appendChild(tdphone);
                let options = {
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric',
                    timezone: 'UTC'
                };
                let date = new Date(string["registered"]["date"]).toLocaleString("ru", options);
                tddate.textContent = `${date}`;
                tr.appendChild(tddate);
                document.getElementById('table_user').appendChild(tr);
            }
        })
        if (warning === true) {
            Debounce(alert('Не найдено ни одного совпадения'), 5000);
        }
    }
}
