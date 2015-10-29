(function() {

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // отображение объектов
    function renderScopes(toolType){

        var widthR, heightR, eDownX, eDownY, eUpX, eUpY = 0;

        // удаляем обработчики
        canvas.off('mouse:down');
        canvas.off('mouse:up');

        // записываем координаты начальной точки
        canvas.on('mouse:down', function(options) {

            eDownX = options.e.offsetX;
            eDownY = options.e.offsetY

        });

        // обработка отпуска кнопки мыши, ядро метода
        canvas.on('mouse:up', function(options) {

console.log(canvas.getActiveObject());
console.log(canvas.getActiveGroup());
            eUpX = options.e.offsetX;
            eUpY = options.e.offsetY;

            var widthRenderFigure, heightRenderFigure;

            widthRenderFigure = eUpX - eDownX;
            heightRenderFigure = eUpY - eDownY;

            // если отметили меньше 20 пикселей ничего не происходит
            if(widthRenderFigure < 20 || heightRenderFigure < 20){
                return;
            }
            // если иструмент выделение - ничего не происходит
            if(toolType == 'selection-tool'){
                return;
            }
            // рисуем круг
            if(toolType == 'circle-tool'){

                var radius = (widthRenderFigure * widthRenderFigure) + +(heightRenderFigure * heightRenderFigure);
               radius = Math.floor(Math.sqrt(radius)) / 2;
                var circle = new fabric.Circle({
                    radius: radius, fill: 'green', left: eDownX, top: eDownY, opacity: 0.65
                });
                canvas.add(circle);
            }
            // квадрат
            if(toolType == 'square-tool'){
                var rect2 = new fabric.Rect({
                    left: eDownX,
                    top: eDownY,
                    fill: 'red',
                    opacity: 0.65,
                    width: widthRenderFigure,
                    height: heightRenderFigure,
                    text: 'test text'

                    // text: 'test text'
                });
                canvas.add(rect2);
            }
            // треугольник
            if(toolType == 'triangle-tool'){

                var triangle = new fabric.Triangle({
                    width: widthRenderFigure, height: heightRenderFigure, fill: 'blue', left: eDownX, top: eDownY, opacity: 0.65
                });
                canvas.add(triangle);
            }
            // ломаная в перспективе

        });

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // удаляем в цикле активность инструмента
   function deleteActiveClass(e){

        var countAll = $(e.target).parent().parent()[0].childElementCount;
       for(var i = 0; i < countAll; i++){

           $($(e.target).parent().parent()[0].children[i]).removeClass('active');

       }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    /*
    * Алгоритм работы с инструментами
    *
    * */
    var toolTypes = [
        'selection-tool',
        'square-tool',
        'circle-tool',
        'triangle-tool',
        'broken-tool'
    ];
    var activeToolType = toolTypes[0]; // по умолчанию выделение

    $('#selection-tool').click(function(e){
      deleteActiveClass(e); // удаляем, если где-то активный пункт
        e.preventDefault(); // отменяем действие по умолчанию
        activeToolType = toolTypes[0]; // выбираем инструмент
        renderScopes(activeToolType); // рендерим фигуру
        $(e.target).parent().addClass('active'); // ставим в актив пункт меню
    });
    $('#square-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[1];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
    });
    $('#circle-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[2];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
    });
    $('#triangle-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[3];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
    });
    $('#broken-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[4];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // рендерим холст, загружаем картинку
    var wImg, hImg, canvas;

    // предзагрузка картинки
    var input = document.getElementById('InputImage');

    input.onchange = function(e) { // событие выбор картинки

    var fReader = new FileReader();
    fReader.readAsDataURL(input.files[0]);
    fReader.onloadend = function(event){ // действия, когда картика загрузилась

    var img = document.createElement("img");
    img.src = event.target.result;

    wImg = img.width;
    hImg = img.height;

    var xx = $('#cMain').append('<canvas id="c" width="'+ wImg +'" height="'+ hImg +'"></canvas>');
    var zz = $('#cMain').css({

    //width: wImg + 'px',
    //height: hImg + 'px',
    margin: '0px auto',
    border: '1px solid red'

    });

    canvas = new fabric.Canvas('c');
    canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas));

    // обработчик добавления объекта
    canvas.on('object:added', function(options) {
        console.log('object:added | ' + options.target); // все свойства объекта...
        options.target.fill = '#17b76a';
        console.log(options); // все свойства объекта...
        var scope = options.target; // объект области

        // очистить, если была другая область
        var clearOldScopeDom = $('#parametrsScope').children().remove();

        var form_group = $('<div/>', {
            id:     '',
            class:  'form-group'

        });
        $('#parametrsScope').append(form_group);

            var label = $('<label/>', {
                id:     '',
                for:  'nameScope',
                text:  'Имя области:*'
            });
            $(form_group).append(label);
            var input = $('<input/>', {
                type:     'text',
                class:     'form-control',
                id:     'nameScope',
                placeholder:     'Введите имя области'
            });
            $(form_group).append(input);
            // установили значение инпата
            input.val(scope.name);

        // обработчик изменения имени области
        $('#nameScope').on('input', function(event) {
            console.log("change");
            console.log(event.target.value);

            var value = event.target.value;

            scope.name = value;
            console.log(canvas._objects);
        });
        //<div class="form-group">
        //    <label for="nameScope">Имя области:*</label>
        //    <input type="text" class="form-control" id="nameScope" placeholder="Введите имя области">
        //    </div>
        //
        //    <div class="form-group">
        //        <label>Цвет области:</label>
        //        <div id="colorPickerScope" class="input-group colorpicker-element">
        //            <div class="input-group-addon">
        //                <i style="background-color: rgb(23, 183, 106);"></i>
        //            </div>
        //            <input type="text" class="form-control">
        //            </div>
        //            <!-- /.input group -->
        //        </div>
        //
        //        <div class="form-group">
        //            <label>Прикрепить файлы к области:</label>
        //            <a class="btn btn-app" data-toggle="modal" data-target="#myModal">
        //                <i class="fa fa-edit"></i> + Изображение
        //            </a>
        //            <a class="btn btn-app">
        //                <i class="fa fa-edit"></i> + Текст
        //            </a>
        //            <a class="btn btn-app">
        //                <i class="fa fa-edit"></i> + Файл
        //            </a>
        //        </div>




    });

        // обработчик selected объекта
        canvas.on('object:selected', function(options) {
            $('#nameScope').off('input');
            console.log('object:selected | ' + options.target); // все свойства объекта...
           // options.target.fill = '#17b76a';
           // console.log(options); // все свойства объекта...
            var scope = options.target; // объект области

            //// очистить, если была другая область
            //var clearOldScopeDom = $('#parametrsScope').children().remove();

            var name = options.target.name;
            var input = $('#nameScope');
            input.val(scope.name);

        });


    };

    };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // здесь пишем стили и настройки плагинов

    $.contextMenu({
        // define which elements trigger this menu
        selector: "#submit",
        // define the elements of the menu
        items: {
            foo: {name: "Foo", callback: function(key, opt){ alert("Foo!"); }},
            bar: {name: "Bar", callback: function(key, opt){ alert("Bar!") }}
        }
        // there's more, have a look at the demos and docs...
    });

    // колорпикер
    $("#colorPickerScope").colorpicker();

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    //
    var inputFiles = document.getElementById('filesObjects');

        inputFiles.onchange = function(e) { // событие выбор картинки

            console.log("fileimageloaded");
            //console.log(event);
            var input = document.getElementById('filesObjects').files;
            var issetObjects = canvas._objects;
            console.log(issetObjects);

            for(var i = 0; i < input.length; i++){

                var form_group = $('<div/>', {
                    id:     '',
                    class:  'form-group row'
                });
                $('#insideInsertObject').append(form_group);

                var col_lg_3 = $('<div/>', {
                    id:     '',
                    class:  'col-lg-3',
                    text: input[i].name
                });
                $(form_group).append(col_lg_3);

                var col_lg_3_2 = $('<div/>', {
                    id:     '',
                    class:  'col-lg-3'
                });
                $(form_group).append(col_lg_3_2);

                    var select = $('<select/>', {
                        id:     'selectObjects',
                        class:  'form-control',
                        onchange: 'selectObjects(this)'
                    });
                    $(col_lg_3_2).append(select);

                        var option;

                        for(var j = 0; j < issetObjects.length; j++){
                                option = $('<option/>', {
                                id:     '',
                                class:  '',
                                text: issetObjects[j].text
                            });
                            $(select).append(option);
                        }



            }





        };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    $('#submit').click(function(e){
        e.preventDefault();
       // alert(canvas.getContext());
       // alert(canvas.getElement());
        console.log(canvas._objects);
       // console.log(canvas.getContext());
       // console.log(canvas.getElement());

    });

    //$('#filesObjects').on('fileimageloaded', function(event) {
    //
    //
    //});

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // клик по кнопке очистить изображения - доделать, чтоб менялись и свойства объектов
    $('#filesObjects').on('filecleared', function(event) {
        console.log("filecleared");

        var clear = $('#insideInsertObject').children().remove();

    });



        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////










    })();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*
* В этой области видимости определять функции для неотрендеренных dom элементов
* */

function selectObjects(e) {

    //alert(e);
    console.log(e);
    console.log($(e).children(":selected").html()); // текст пункта меню
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////