window.userCount = 1;
            function Save(event){
                let namevalue= document.getElementById('editname').value;
                let desvalue= document.getElementById('editdescription').value;
                let name = document.getElementsByClassName('content')[Number(document.currentEditIndex)-Number("1")].getElementsByTagName('input')[0];
                let description = document.getElementsByClassName('content')[Number(document.currentEditIndex)-Number("1")].getElementsByTagName('input')[1];
                name.value = namevalue;
                description.value = desvalue;
                exitEdit();
            }
            function Delete(){
                document.getElementsByClassName('file')[Number(document.currentEditIndex)-Number("1")].remove();
                exitEdit();
            }
        function openEditTable(event) {
            // alert(event.target.getAttribute('index'));
            document.currentEditIndex = event.target.getAttribute('index');
            var x = document.getElementById("editTable");
            if (x.style.display === "none") {
                x.style.display = "block";
            } else {
                x.style.display = "none";
            }
            let imgsrc= document.getElementsByTagName('img')[event.target.getAttribute('index')].getAttribute('src');
            let img= document.createElement('img');
            img.setAttribute('src',imgsrc);
            img.setAttribute('class','imgedit');
            if(!document.getElementsByClassName('imgedit')[0]==""){
                document.getElementsByClassName('imgedit')[0].remove();
            }
            document.getElementById('edittableleft').appendChild(img);
            let name = document.getElementsByClassName('content')[Number(event.target.getAttribute('index'))-Number("1")].getElementsByTagName('input')[0].value;
            let namevalue= document.getElementById('editname');
            namevalue.setAttribute('value',name);
            let description = document.getElementsByClassName('content')[Number(event.target.getAttribute('index'))-Number("1")].getElementsByTagName('input')[1].value;
            let desvalue= document.getElementById('editdescription');
            desvalue.setAttribute('value',description);
        }

        function exitEdit() {
            var x = document.getElementById("editTable");
            if (x.style.display === "block") {
                x.style.display = "none";
            }
        }
        function removeimg(){
            document.getElementsByTagName('img')[0].remove();
        }
        function addNew() {
            let nameValue=document.getElementById("name").value ;
            let desValue=document.getElementById("description").value ;
            let imgsrc= document.getElementById("choosefile").getElementsByTagName('img')[0].getAttribute('src');
            debugger
            let img= document.createElement('img');
            img.setAttribute('src',imgsrc);
            let file= document.createElement("div");
            file.setAttribute('class','file');
            let fileleft = document.createElement("div");
            fileleft.setAttribute('class','file-left');
            let fileright = document.createElement("div");
            fileright.setAttribute('class','file-right');
            let image = document.createElement("div");
            image.setAttribute('class','image');
            let div =document.createElement("div");
            div.setAttribute('class','content');
            let name =document.createElement("div");
            name.setAttribute('class','name1');
            let description = document.createElement("div");
            description.setAttribute('class','description1');
            let para = document.createElement("P");
            para.innerHTML = "Name";
            let para1 = document.createElement("P");
            para1.innerHTML = "Description";
            let btnedit= document.createElement("button");
            btnedit.setAttribute('index', window.userCount);
            btnedit.innerHTML="Edit";
            btnedit.setAttribute('onclick','openEditTable(event)');
            btnedit.setAttribute('class','btnedit');
            window.userCount++;
            let namevalue= document.createElement("input");
            namevalue.setAttribute('readonly','readonly');
            namevalue.value=nameValue;
            let descriptionvalue= document.createElement("input");
            descriptionvalue.setAttribute('readonly','readonly');
            descriptionvalue.value=desValue;
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
        }
        document.getElementById('chooseimg').onchange = function (e) {
            removeimg();
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
function addPerson() {
    $.ajax({
        type: "POST",
        url: 'localhost:8080/todo',
        data: data,
        success: success,
        dataType: dataType
      });
}