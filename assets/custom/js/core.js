(function() {

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    var wImg, hImg, canvas;

    // предзагрузка картинки
    var input = document.getElementById('InputImage');
    input.onchange = function(e) {


    /*
     function makeDroppable(e) {
     e.preventDefault();
     }
     function dragImg(e) {
     e.dataTransfer.setData("image/jpeg",e.target.id);
     }
     function dropImg(e) {
     var rdata = e.dataTransfer.getData("image/jpeg");


     var img = document.getElementById("testimg");
     img.src = event.target.result;

     }	*/


    console.log(e);


    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){


    var img = document.createElement("img");
    img.src = event.target.result;

    wImg = img.width;
    hImg = img.height;



    var xx = $('#cMain').append('<canvas id="c" width="'+ wImg +'" height="'+ hImg +'"></canvas>');
    var zz = $('#cMain').css({

    width: wImg + 'px',
    height: hImg + 'px',
    margin: '0px auto',
    border: '1px solid red'

    });

    canvas = new fabric.Canvas('c');
    canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas));


    var widthR, heightR, eDownX, eDownY, eUpX, eUpY = 0;




    canvas.on('mouse:down', function(options) {


    console.log(options.e.clientX, options.e.clientY);
    console.log(options.e.offsetX, options.e.offsetY);

    console.log(options); // все свойства объекта...

    eDownX = options.e.offsetX;
    eDownY = options.e.offsetY



    });
        $('#c').dblclick(function(){
            alert('Вы героически кликнули по элементу "foo" дважды!');
        });

    canvas.on('mouse:up', function(options) {

    if(options.target !== undefined){
    console.log('yes');
    return;
    }else{
    console.log('no');
    }

    console.log(options.e.clientX, options.e.clientY);
    console.log(options.e.offsetX, options.e.offsetY);

    console.log(options); // все свойства объекта...
    console.log(options.target); // все свойства объекта...
    console.log(''); // все свойства объекта...

    eUpX = options.e.offsetX;
    eUpY = options.e.offsetY;

    var widthRenderFigure, heightRenderFigure;

    widthRenderFigure = eUpX - eDownX;
    heightRenderFigure = eUpY - eDownY;

    if(widthRenderFigure < 20 || heightRenderFigure < 20){
    return;
    }




    var rect2 = new fabric.Rect({
    left: eDownX,
    top: eDownY,
    fill: 'blue',
    opacity: 0.65,
    width: widthRenderFigure,
    height: heightRenderFigure

    // text: 'test text'
    });

    canvas.add(rect2);

    });


    canvas.on('object:selected', function(options) {


    // alert('object:selected | ' + options); // все свойства объекта...
    console.log('object:selected | ' + options); // все свойства объекта...



    });





    console.log(wImg + ' | ' + hImg);



    };

    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    //var img = document.getElementById("imageID");

    // create a wrapper around native canvas element (with id="c")


    //canvas.backgroundColor = 'rgb(100,100,200)';
    //canvas.setBackgroundImage('images/bg2.jpg', canvas.renderAll.bind(canvas));

    //canvas.loadFromJSON();

    // create a rectangle object
    /*var rect = new fabric.Rect({
     left: 100,
     top: 100,
     fill: 'red',
     width: 40,
     height: 30

     // text: 'test text'
     });

     canvas.add(rect);
     */

    // "add" rectangle onto canvas


    // load sun and center it
    /*fabric.Image.fromURL('images/bg.jpg', function(sunImg) {
     sunImg.selectable = false;
     canvas.add(sunImg);

     var json_obj = JSON.stringify(canvas);
     console.log(json_obj);

     sunImg.center();
     }); */



    //canvas.backgroundImage = 'images/bg.jpg';
    //canvas.backgroundImage = 'rgb(100,100,200)';





    //alert(json_obj);











    })();
