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
                    text: ''

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
    var wImg, hImg, canvas, changeScopeColor, changeNameScope;

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

        $('#nameScope').off('input'); // снимаем обработчик
        // обработчик изменения имени области
        changeNameScope =  $('#nameScope').on('input', function(event) {
            var value = event.target.value;
            scope.name = value;
        });
        // цвет
        var form_group2 = $('<div/>', {
            id:     '',
            class:  'form-group'

        });
        $('#parametrsScope').append(form_group2);

        var label2 = $('<label/>', {
            id:     '',
            text:  'Цвет области:'
        });
        $(form_group2).append(label2);
        var colorPickerScope = $('<div/>', {
            id:     'colorPickerScope',
            class:  'input-group colorpicker-element'

        });
        $(form_group2).append(colorPickerScope);
            var input_group_addon = $('<div/>', {
                id:     '',
                class:  'input-group-addon'

            });
            $(colorPickerScope).append(input_group_addon);
                var i_1 = $('<i/>', {
                    id:     '',
                    class:  '',
                    style: 'background-color: red;'

                });
                $(input_group_addon).append(i_1);
        var form_control = $('<input/>', {
            id:     '',
            type:  'text',
            class: 'form-control'

        });
        $(colorPickerScope).append(form_control);
        // колорпикер
        $("#colorPickerScope").colorpicker();
        // обработчик изменения колорпикер
       $('#colorPickerScope').on('changeColor', function(event) {
            var value = event.target.children[1].value;
            scope.fill = value;
            canvas.renderAll();
        });
        var form_group3 = $('<div/>', {
            id:     '',
            class:  'form-group'

        });
        $('#parametrsScope').append(form_group3);

        var label3 = $('<label/>', {
            id:     '',
            text:  'Прикрепить файлы к области:'
        });
        $(form_group3).append(label3);

        //var btn_btn_app2 = $('<label/>', {
        //    id:     '',
        //    class:  'btn btn-app',
        //    'data-toggle': 'modal',
        //    'data-target': '#myModal',
        //    'text': ' + Текст'
        //});
        //$(form_group3).append(btn_btn_app2);
        //var i3 = $('<i/>', {
        //    id:     '',
        //    class:  'fa fa-edit'
        //});
        //$(btn_btn_app2).append(i3);

        var btn_btn_app3 = $('<label/>', {
            id:     'myModalBtn',
            class:  'btn btn-app',
            'data-toggle': 'modal',
            'data-target': '#myModal',
            'text': ' + Файл'
        });
        $(form_group3).append(btn_btn_app3);
        var i3 = $('<i/>', {
            id:     '',
            class:  'fa fa-edit'
        });
        $(btn_btn_app3).append(i3);

        var form_group4 = $('<div/>', {
            id:     '',
            class:  'form-group'
        });
        $('#parametrsScope').append(form_group4);
            var label5 = $('<label/>', {
                id:     '',
                text:  'Комментарий к области:',
                for:  'commentScope'
            });
            $(form_group4).append(label5);
            var textarea1 = $('<textarea/>', {
                id:     'commentScope',
                rows:     '5',
                cols:     '26',
                placeholder:  'Комментарий к выделенной области...'
            });
            $(form_group4).append(textarea1);

      //  <div id="" class="form-group">
          // <label id="" for="nameScope">Имя области:*</label>
          // <input type="text" class="form-control" id="nameScope" placeholder="Введите имя области">
      // </div>


    });

        // обработчик selected объекта
        canvas.on('object:selected', function(options) {
            $('#nameScope').off('input');
            console.log('object:selected'); // все свойства области...
            var scope = options.target; // объект области
            var name = options.target.name;
            var input = $('#nameScope');
            // показать имя области
            input.val(scope.name);
            // показать коммент к области
             var commentScope = $('#commentScope');
            commentScope.val(scope.text);


            // обработчик изменения имени области
            $('#nameScope').on('input', function(event) {
                var value = event.target.value;
                scope.name = value;
            });
            $('#colorPickerScope').off('changeColor');
            $('#colorPickerScope').on('changeColor', function(event) {
                var value = event.target.children[1].value;
                scope.fill = value;
                canvas.renderAll();
            });
/////////////
            $('#commentScope').off('input');
            $('#commentScope').on('input', function(event) {
                var value = event.target.value;
                scope.text = value;
                //canvas.renderAll();
            });


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



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    var reRenderFileScopeRelations;

    reRenderFileScopeRelations = function(){

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
                id:     '',
                class:  'form-control selectObjects'
               // onchange: 'selectObjects(this)'
            });
            $(col_lg_3_2).append(select);

            var option;
            option0 = $('<option/>', {
                id:     '',
                class:  '',
                text: 'Область не выбрана'
            });
            $(select).append(option0);
            for(var j = 0; j < issetObjects.length; j++){
                option = $('<option/>', {
                    id:     '',
                    class:  '',
                    text: issetObjects[j].name
                });
                $(select).append(option);
            }



        }

    };

    // алгоритм работы с файлами
    var inputFiles = document.getElementById('filesObjects');

        inputFiles.onchange = function(e) { // событие выбор картинки

            reRenderFileScopeRelations();
            $('.selectObjects').on('change', function(e) {
                e.stopPropagation();
                console.log("selectObjects");

                // алгоритм работы прикрепления файлов на области
                var selectedScopeName, selectedFileName, allScopes, currentScope;
                selectedScopeName = $(this).children(":selected").html();
                selectedFileName = $(this).parent().parent().children().eq(0).text();
                allScopes = canvas._objects;

                for(var i = 0; i < allScopes.length; i++){
                    if(allScopes[i].name == selectedScopeName){
                        currentScope = allScopes[i];
                        break;
                    }
                    if( i == allScopes.length - 1){
                        alert('Ошибка сопоставления!');
                        return;
                    }
                }
               // console.log(currentScope.files);
               // return;
                if(currentScope.files == ''){
                    currentScope.files = [];
                    currentScope.files[currentScope.files.length] = selectedFileName;

                }else{
                    currentScope.files[currentScope.files.length] = selectedFileName;
                }

                console.log(currentScope.files);
                console.log(allScopes);

            });




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

    $('#myModal').on('show.bs.modal', function (e) {
        //console.log('show.bs.modal');
        //if(document.getElementById('filesObjects').files.length != 0){
        //    $('#insideInsertObject').children().remove(); // удаляем старую инфу
        //    reRenderFileScopeRelations();
        //
        //}
    })

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    $('#toJSON').on('click', function(event) {
        console.log("toJSON");
        event.preventDefault();


        console.log(JSON.stringify(canvas));

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // кликаем по кнопке отправить файл
    $('#submit').on('click', function(event) {
        console.log("submit");
        event.preventDefault();
        var fileinput_upload_button = $('.fileinput-upload-button');

        fileinput_upload_button.click();

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// with plugin options
    $("#filesObjects").fileinput({
        'previewFileType':'any',
        uploadUrl: "ajax/addObject", // server upload action // потом на сервере #поменять
        uploadAsync: false,
        allowedFileExtensions: ['jpg', 'png', 'gif', 'rar', 'zip', 'docx', 'doc', 'jpeg'],
        maxFileCount: 10

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////





    })();

        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*
* В этой области видимости определять функции для неотрендеренных dom элементов
* */

function selectObjects(e) {



}



////////////////////////////////////////////////////////////////////////////////////////////////////////////////



////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////