var btnIndex;
var numofFile;
var fileByIndex;
$(document).ready(function () {
    // show progress bar

    // get data from server
    loadData();
    // show data, and dissmiss progress bar
});

function loadData() {

    $.ajax({
        method: 'GET',
        url: "http://localhost:3000/todos",
        async: true,
        beforeSend: function () {
            $('#loading').show();
        },
        success: function (res) {
            $('#loading').hide();
            console.log(res);
            numofFile = res.length;
            window.userCount = 1;
            res.forEach(element => {
                let nameValue = element.name;
                let desValue = element.description;
                let img = document.createElement('img');
                img.setAttribute('src', element.imgsrc);
                let file = document.createElement("div");
                file.setAttribute('class', 'file');
                let fileleft = document.createElement("div");
                fileleft.setAttribute('class', 'file-left');
                let fileright = document.createElement("div");
                fileright.setAttribute('class', 'file-right');
                let image = document.createElement("div");
                image.setAttribute('class', 'image');
                let div = document.createElement("div");
                div.setAttribute('class', 'content');
                let name = document.createElement("div");
                name.setAttribute('class', 'name1');
                let description = document.createElement("div");
                description.setAttribute('class', 'description1');
                let para = document.createElement("P");
                para.innerHTML = "Name";
                let para1 = document.createElement("P");
                para1.innerHTML = "Description";
                let btnedit = document.createElement("button");
                btnedit.setAttribute('index', element.id);
                window.userCount = element.id + 1;
                btnedit.innerHTML = "Edit";
                btnedit.setAttribute('onclick', 'openEditTable(event)');
                btnedit.setAttribute('class', 'btnedit');
                let namevalue = document.createElement("input");
                namevalue.setAttribute('readonly', 'readonly');
                namevalue.value = nameValue;
                let descriptionvalue = document.createElement("input");
                descriptionvalue.setAttribute('readonly', 'readonly');
                descriptionvalue.value = desValue;
                description.appendChild(descriptionvalue);
                description.appendChild(para1);
                name.appendChild(namevalue);
                name.appendChild(para);
                div.appendChild(name);
                div.appendChild(description);
                div.appendChild(btnedit);
                fileright.appendChild(div);
                fileleft.appendChild(image);
                fileleft.appendChild(img);
                file.appendChild(fileleft);
                file.appendChild(fileright);
                document.getElementsByClassName("listFile")[0].appendChild(file);
            });

        },
        error: function (res) {}
    });
}

function Save(event) {
    let object = {};

    let namevalue = document.getElementById('editname').value;
    let desvalue = document.getElementById('editdescription').value;
    let img= document.getElementsByClassName('imgedit')[0].value;
    let name = fileByIndex.getElementsByTagName('input')[0];
    let description = fileByIndex.getElementsByTagName('input')[1];
    name.value = namevalue;
    description.value = desvalue;
    object.name = namevalue;
    object.description = desvalue;
    object.imgsrc=img;
    object.id=document.currentEditIndex;
    debugger
    $.ajax({
        method: 'PUT',
        data: JSON.stringify(object),
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:3000/todos/" + Number(document.currentEditIndex),
        crossDomain: true,
        success: function (result) {}
    });
}

function Delete() {
    fileByIndex.remove();
    $.ajax({
        method: 'DELETE',
        url: 'http://localhost:3000/todos/' + Number(document.currentEditIndex),
        async: false,
        success: function (res) {
            exitEdit();
        }
    });
}

function openEditTable(event) {
    // alert(event.target.getAttribute('index'));
    document.getElementsByClassName('addfile')[0].setAttribute('style', 'opacity:0.1');
    document.getElementsByClassName('listFile')[0].setAttribute('style', 'opacity:0.1');
    document.currentEditIndex = event.target.getAttribute('index');
    var x = document.getElementById("editTable");
    console.log(x.style.display);
    if (x.style.display === "none" || x.style.display === '' || x.style.display === undefined) {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }

    var listFileElements = document.getElementsByClassName('file');
    fileByIndex;
    for (let i = 0; i < listFileElements.length; i++) {
        let file = listFileElements[i];
        if (file.getElementsByClassName('file-left')[0].getAttribute('id') === 'edittableleft') {
            break;
        }
        btnIndex = file.getElementsByTagName('button')[0].getAttribute('index');
        if (btnIndex === document.currentEditIndex) {
            fileByIndex = file;
            break;
        }
    }
    console.log(fileByIndex);


    let imgsrc = fileByIndex.getElementsByTagName('img')[0].getAttribute('src');
    let img = document.getElementById('edittableleft').getElementsByTagName('img')[0];
    img.setAttribute('src', imgsrc);
    img.setAttribute('class', 'imgedit');
    if (!document.getElementsByClassName('imgedit')[0] == "") {
        document.getElementsByClassName('imgedit')[0].remove();
    }
    document.getElementById('edittableleft').appendChild(img);
    let name = fileByIndex.getElementsByTagName('input')[0].value;
    let namevalue = document.getElementById('editname');
    namevalue.setAttribute('value', name);
    let description = fileByIndex.getElementsByTagName('input')[1].value;
    let desvalue = document.getElementById('editdescription');
    desvalue.setAttribute('value', description);
}

function exitEdit() {
    document.getElementsByClassName('addfile')[0].removeAttribute('style', 'opacity:0.1');
    document.getElementsByClassName('listFile')[0].removeAttribute('style', 'opacity:0.1');
    var x = document.getElementById("editTable");
    if (x.style.display === "block") {
        x.style.display = "none";
    }
}

function removeimg() {
    document.getElementsByTagName('img')[0].remove();
}
var count_choose_img = 0;

function addNew() {

    let nameValue = document.getElementById("name").value;
    let desValue = document.getElementById("description").value;
    let imgsrc = document.getElementById("choosefile").getElementsByTagName('img')[0].getAttribute('src');
    let object = {};
    object.id = Number(window.userCount);
    object.description = desValue;
    object.name = nameValue;
    object.completed = false;
    object.imgsrc = imgsrc;
    let img = document.createElement('img');
    img.setAttribute('src', imgsrc);
    let file = document.createElement("div");
    file.setAttribute('class', 'file');
    let fileleft = document.createElement("div");
    fileleft.setAttribute('class', 'file-left');
    let fileright = document.createElement("div");
    fileright.setAttribute('class', 'file-right');
    let image = document.createElement("div");
    image.setAttribute('class', 'image');
    let div = document.createElement("div");
    div.setAttribute('class', 'content');
    let name = document.createElement("div");
    name.setAttribute('class', 'name1');
    let description = document.createElement("div");
    description.setAttribute('class', 'description1');
    let para = document.createElement("P");
    para.innerHTML = "Name";
    let para1 = document.createElement("P");
    para1.innerHTML = "Description";
    let btnedit = document.createElement("button");
    btnedit.setAttribute('index', window.userCount);
    btnedit.innerHTML = "Edit";
    btnedit.setAttribute('onclick', 'openEditTable(event)');
    btnedit.setAttribute('class', 'btnedit');
    window.userCount++;
    let namevalue = document.createElement("input");
    namevalue.setAttribute('readonly', 'readonly');
    namevalue.value = nameValue;
    let descriptionvalue = document.createElement("input");
    descriptionvalue.setAttribute('readonly', 'readonly');
    descriptionvalue.value = desValue;
    description.appendChild(descriptionvalue);
    description.appendChild(para1);
    name.appendChild(namevalue);
    name.appendChild(para);
    div.appendChild(name);
    div.appendChild(description);
    div.appendChild(btnedit);
    fileright.appendChild(div);
    fileleft.appendChild(image);
    fileleft.appendChild(img);
    file.appendChild(fileleft);
    file.appendChild(fileright);
    document.getElementsByClassName("listFile")[0].appendChild(file);
    $.ajax({
        method: 'POST',
        data: JSON.stringify(object),
        contentType: "application/json; charset=utf-8",
        url: "http://localhost:3000/todos",
        crossDomain: true,
        success: function (result) {}
    });


}

document.getElementById('chooseimg').onchange = function (e) {
    if (count_choose_img != 0)
        removeimg();
    count_choose_img++;

    for (var i = 0; i < e.srcElement.files.length; i++) {
        var file = e.srcElement.files[i];

        var img = document.createElement("img");
        var reader = new FileReader();
        reader.onloadend = function () {
            img.src = reader.result;
        }
        reader.readAsDataURL(file);
        document.getElementById('chooseimg').after(img);
    }
};