$(document).ready(function () {
  // show progress bar

  // get data from server
  $.ajax({
    method: 'GET',
    url:  "http://localhost:3000/todos",
    async: false,
    beforeSend: function () {
        $('#loading').show();
    },
    success: function (res) {
        window.userCount = Number(1)+res.length;
        res.forEach(element =>{
            let nameValue=element.name ;
            let desValue=element.description ;
            let img= document.createElement('img');
            img.setAttribute('src',element.imgsrc);
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
            btnedit.setAttribute('index',element.id);
            btnedit.innerHTML="Edit";
            btnedit.setAttribute('onclick','openEditTable(event)');
            btnedit.setAttribute('class','btnedit');
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
        });
        
    },
    error: function (res) {
        console.log(res)
    }
});
  // show data, and dissmiss progress bar
});

            function Save(event){
                let object={};
           
                let namevalue= document.getElementById('editname').value;
                let desvalue= document.getElementById('editdescription').value;
                let indexedit = Number(document.currentEditIndex)-Number("1");
                let name = document.getElementsByClassName('content')[indexedit].getElementsByTagName('input')[0];
                let description = document.getElementsByClassName('content')[indexedit].getElementsByTagName('input')[1];
                name.value = namevalue;
                description.value = desvalue;
                object.name = namevalue;
                object.description=desvalue;
                debugger
                $.ajax({
                    method:'PUT',
                    data: JSON.stringify(object),
                    contentType: "application/json; charset=utf-8",
                    url: "http://localhost:3000/todos/"+Number(document.currentEditIndex),
                    crossDomain: true, 
                    success: function(result){
                    console.log(result);
                }});
                exitEdit();
            }
            function Delete(){
                // document.getElementsByClassName('file')[Number(document.currentEditIndex)-Number("1")].remove();
                $.ajax({
                    method: 'DELETE',
                    url: 'http://localhost:3000/todos/'+Number(document.currentEditIndex),
                    success: function (res) {
                        console.log(res)
                        document.getElementsByClassName('file')[Number(document.currentEditIndex)-Number("1")].remove();
                        window.userCount--;
                        exitEdit();
                    }
                });
                
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
            let object={};
            object.id=Number(window.userCount);
            object.description=desValue;
            object.name=nameValue;
            object.completed=false;
            object.imgsrc= imgsrc;
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
            $.ajax({
                method:'POST',
                data: JSON.stringify(object),
                contentType: "application/json; charset=utf-8",
                url: "http://localhost:3000/todos",
                crossDomain: true, 
                success: function(result){
                console.log(result);
            }});
            

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
    
       
        