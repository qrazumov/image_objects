////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
                    radius: radius, fill: '#41f3ff', left: eDownX, top: eDownY, opacity: 0.65
                });
                canvas.add(circle);
            }
            // квадрат
            if(toolType == 'square-tool'){
                var rect2 = new fabric.Rect({
                    left: eDownX,
                    top: eDownY,
                    fill: '#41f3ff',
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
                    width: widthRenderFigure, height: heightRenderFigure, fill: '#41f3ff', left: eDownX, top: eDownY, opacity: 0.65
                });
                canvas.add(triangle);
            }
            // ломаная в перспективе #поменять
            //if(toolType == 'broken-tool'){
            //
            //    //var triangle = new fabric.Triangle({
            //    //    width: widthRenderFigure, height: heightRenderFigure, fill: 'blue', left: eDownX, top: eDownY, opacity: 0.65
            //    //});
            //    //canvas.add(triangle);
            //    canvas.isDrawingMode = !canvas.isDrawingMode;
            //
            //}

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
        canvas.isDrawingMode = false;

    });
    $('#square-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[1];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
        canvas.isDrawingMode = false;

    });
    $('#circle-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[2];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
        canvas.isDrawingMode = false;

    });
    $('#triangle-tool').click(function(e){
        deleteActiveClass(e);
        e.preventDefault();
        activeToolType = toolTypes[3];
        renderScopes(activeToolType);
        $(e.target).parent().addClass('active');
        canvas.isDrawingMode = false;
    });
    $('#broken-tool').click(function(e){ // ломаная #поменять
        deleteActiveClass(e);
        e.preventDefault();
        canvas.isDrawingMode = !canvas.isDrawingMode;
        $(e.target).parent().addClass('active');
    });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // рендерим холст, загружаем картинку
    var wImg, hImg, canvas, changeScopeColor, changeNameScope, img, loadedJson, files;

    // находим из get строки номер редактируемой записи
    var re = /[\d]+/;
    var myArray = re.exec(window.location.pathname);
    var id = myArray[0];
    console.log(id);

    wImg = '800';
    hImg = '1000';

    var xx = $('#cMain').append('<canvas id="c" width="'+ wImg +'" height="'+ hImg +'"></canvas>');
    var zz = $('#cMain').css({

        //width: wImg + 'px',
        //height: hImg + 'px',
        margin: '0px auto',
        border: '1px solid red'

    });


    /////////////
    $.ajaxSetup({
        headers: {
            /*
             *  Этот заголовок нужен, чтобы защититься от csrf атак.
             *  Без него ajax запрос не пройдет
             * */
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            /*
             *  Этот заголовок нужен, чтобы laravel понял, что запрос отправляется объектом XMLHttpRequest
             *  В этом случае корректно вернется объект ошибок валидации
             * */
            'X-Requested-With': 'XMLHttpRequest'
        }
    });
    $.ajax({
        type: 'POST',
        url: '../ajax/loadObject',
        data: {
            'id' : id
        },
        async: false,

        success: function(result){ // результат запроса

            console.log('загружено');
            console.log(result);
            loadedJson = result;
            files = result.files;
            canvas = new fabric.Canvas('c');
            canvas.loadFromJSON(result.json);
        }
    });

    /////////////////
            $('#clearCanvas').click(function(e){

                if (confirm('Are you sure you want to clear the canvas?')){
                    canvas.clear();

                    var clearOldScopeDom = $('#parametrsScope').children().remove();
                    $('#clearCanvas').addClass('disabled'); // включаем кнопки
                    $('#submit').addClass('disabled');

                    var startCalloutScopesSetting = $('<div/>', {
                        id:     'startCalloutScopesSetting',
                        class:  'callout callout-warning'

                    });
                    $('#parametrsScope').append(startCalloutScopesSetting);
                    var h4 = $('<h4/>', {
                        text: 'Добавьте область'
                    });
                    $(startCalloutScopesSetting).append(h4);
                    var p = $('<p/>', {
                        text: 'И Вам откроются соответствующие настроийки'
                    });
                    $(startCalloutScopesSetting).append(p);
                }

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


                // клик по клавише del - удалить объект
                $(document).on('keydown', function(e) {
                    console.log("keydown");
                    console.log(e);
                    if(e.keyCode == 46){
                        scope.remove();
                    }
                    $(document).off('keydown');
                });

                // клик по кнопке - удалить объект
                $('#delScope').off('click');
                $('#delScope').on('click', function(e) {
                    if (confirm('Are you sure?')){
                        scope.remove();
                    }
                    //$('#delScope').off('click');

                });
                // ползунок прозрачности
                $('#opacityScope').off('change');
                $('#opacityScope').on('change', function(e) {
                    var opacity;
                    console.log("opacityScope");
                    console.log(e);
                    console.log(parseInt(this.value, 10) || 1);
                    opacity = this.value / 100;
                    console.log(opacity);
                    scope.opacity = opacity;
                    canvas.renderAll();
                    this.previousSibling.innerHTML = this.value;
                    // $('#delScope').off('click');

                });

            });

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // клик по кнопке - добавить файл
    var isRenderedFilesTable = false;
    $('#myModalBtn').on('click', function(e) {
        console.log('myModalBtn');
        var allScopes = canvas._objects;
        // количество уже отрендеренных областей
        var countRenderOptions = $('#insideInsertObject').children().eq(0).children().eq(1).children().eq(0).children().length - 1;
        for(var i = 0; i < canvas._objects.length; i++){
            if(canvas._objects[i].name == ''){
                $('#workingArea').prepend('<div class="alert alert-danger alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-check"></i> Оповещение!</h4>Не для всех областей заданы имена! Задайте имена всем областям и тогда будет возможно прикреить файл к области</div>');
                // alert('Не для всех областей заданы имена! Задайте имена всем областям и тогда будет возможно прикреить файл к области');
                return;
            }
        }
        // если областей на канвасе больше, чем отрендеренных, то добавить новые пункты
        if(allScopes.length > countRenderOptions){
            console.log('allScopes.length > countRenderOptions' + countRenderOptions);
            for(var j = 0; j < $('#insideInsertObject').children().length; j++){
                for(var k = allScopes.length - 1; k > allScopes.length - 1 - (allScopes.length - countRenderOptions) ; k--){
                    $('#insideInsertObject').children().eq(j).children().eq(1).children().eq(0).append('<option id="" class="">'+ allScopes[k].name +'</option>');

                }

            }

        }
        loadedJsonParse = JSON.parse(loadedJson.json);
        console.log(loadedJsonParse.objects);

        var allScopeFiles = [];
        for(var i = 0; i < loadedJsonParse.objects.length; i++){
            console.log(loadedJsonParse.objects[i].files);

            for(var j = 0; j < loadedJsonParse.objects[i].files.length; j++){
                allScopeFiles.push(loadedJsonParse.objects[i].files[j]);
            }
        }
        console.log(allScopeFiles);
        if(!isRenderedFilesTable){

            console.log('filesTable', $('#filesTable'));
            var table_responsive = $('<div/>', {
                class:  'box-body table-responsive no-padding'
            });

            $('#filesTable').append(table_responsive);

            var table = $('<table/>', {
                class:  'table table-hover'
            });
            $(table_responsive).append(table);

            var tr = $('<tr/>');
            $(table).append(tr);

            var th = $('<th/>', {
                text:  'ID'
            });
            $(tr).append(th);

            th = $('<th/>', {
                text:  'Название'
            });
            $(tr).append(th);

            th = $('<th/>', {
                text:  'Размер'
            });
            $(tr).append(th);

            th = $('<th/>', {
                text:  'Редактирование'
            });
            $(tr).append(th);


            for(var i = 0; i < allScopeFiles.length; i++){

                tr = $('<tr/>');
                $(table).append(tr);

                td = $('<td/>', {
                    text:  i + 1
                });
                $(tr).append(td);

                td = $('<td/>', {

                });
                $(tr).append(td);

                var a = $('<a/>', {
                    text:  allScopeFiles[i],
                    target: '_blank',
                    href:  'C:/xampp/htdocs/objects-image/assets/objects/'+ id +'/files/' + allScopeFiles[i] //#поменять
                });
                $(td).append(a);

                td = $('<td/>', {
                    text:  files[i] + ' байт'
                });
                $(tr).append(td);

                td = $('<td/>', {

                });
                $(tr).append(td);

                var a = $('<a/>', {
                    class:  'deleteFile',
                    href:  '#'
                });
                $(td).append(a);

                var span = $('<span/>', {
                    class:  'label label-danger',
                    text:  'Удалить'
                });
                $(a).append(span);

            }

            $('.deleteFile').on('click', function(e) {
                console.log(canvas);
                e.preventDefault();

                if(confirm('Are you sure to delete this file?')){

                    var currentFile = $(this).eq(0).parent().parent().children().eq(1).children(0).text();
                    console.log('currentFile', currentFile);

                    $.ajax({
                        type: 'GET',
                        url: '../ajax/delFile',
                        data: {
                            'file' : currentFile,
                            'id' : id
                        },
                        async: false,

                        success: function(result){ // результат запроса

                            if(result.error){
                                alert('Ошибка удаления файла!\nПричина: ' + result.reason);
                                return;
                            }

                            alert('Файл успешно удален!');

                            function isExistElementArray(array, testValue){
                                for(var i = 0; i < array.length; i++){
                                    if(array[i] == testValue){
                                        return true;
                                    }
                                    if(i == array.length - 1){
                                        return false;
                                    }
                                }
                            }

                            console.log(result);

                            // удаляем также объект из canvas
                            for(var i = 0; i < canvas._objects.length; i++){

                                if(isExistElementArray(canvas._objects[i].files, currentFile)){
                                    canvas._objects[i].files.remove(currentFile);
                                    return;
                                }


                            }





                        }
                    });

                }else{
                    return;
                }
                $(this).eq(0).parent().children().eq(0).replaceWith('<span class="label label-default">Файл удален!</span>');






            });



            console.log('filesTable', $('#filesTable'));
            isRenderedFilesTable = true;



        }



        $('#myModal').modal();

    });

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////






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
                multiple: 'multiple',
                'data-placeholder': 'Выберите област(ь/и)',
                class:  'form-control selectObjects'
            });
            $(col_lg_3_2).append(select);

            //Initialize Select2 Elements
            $(".selectObjects").select2();

            for(var j = 0; j < issetObjects.length; j++){
                option = $('<option/>', {
                    id:     '',
                    class:  '',
                    text: issetObjects[j].name
                });
                $(select).append(option);
            }



        }

        $(".selectObjects").on("select2:select", function (e)
        {


            var selectedScopeName, selectedFileName, allScopes, currentScope;
            selectedScopeName = e.params.data.text;
            selectedFileName = $(this).parent().parent().children().eq(0).text();
            allScopes = canvas._objects;

            function isExistElementArray(array, testValue){
                for(var i = 0; i < array.length; i++){
                    if(array[i] == testValue){
                        return true;
                    }
                    if(i == array.length - 1){
                        return false;
                    }
                }
            }

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

            if(currentScope.files == ''){
                currentScope.files = [];
                currentScope.files.push(selectedFileName);

            }else{
                if(isExistElementArray(currentScope.files, selectedFileName)){
                    console.log('уже существует: ', currentScope.files);
                    console.log('не конец', allScopes);
                    return;
                }
                currentScope.files.push(selectedFileName);
            }
            console.log(currentScope.files);
            console.log('конец', allScopes);


        });
        $(".selectObjects").on("select2:unselect", function (e) {

            //console.log("select2:unselect", e);
            //console.log("select2:select", e.params.data);

            var selectedScopeName, selectedFileName, allScopes, currentScope;
            selectedScopeName = e.params.data.text;
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

            currentScope.files.remove(selectedFileName);

            console.log(currentScope.files);
            console.log('конец', allScopes);


        })

    };

    // алгоритм работы с файлами
    var inputFiles = document.getElementById('filesObjects');

    inputFiles.onchange = function(e) { // событие выбор картинки

        reRenderFileScopeRelations();



    };

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////



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


    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    // кликаем по кнопке отправить файл
    $('#submit').on('click', function(event) {

        console.log("submit");
        event.preventDefault();
        var fileinput_upload_button = $('.fileinput-upload-button');
        var name =  document.getElementById('InputImage').files[0].name;
        var ObjectName =  $('#nameObject').val();
        var objectDescription =  $('#objectDescription').val();
        if(ObjectName == ''){
            $('#workingArea').prepend('<div class="alert alert-warning alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button><h4><i class="icon fa fa-check"></i> Оповещение!</h4>Вы не ввели имя объекта! Введите имя и попробуйте снова.</div>');
            return;
        }
        // загрузили файлы объектов
        fileinput_upload_button.click();

        // защита если файлы не загрузились #поменять
        // загружаем фоновую картинку

        function showResponse(responseText, statusText, xhr, $form)  {

            console.log(responseText);

        }



        $.ajax({
            type: 'POST',
            url: 'ajax/addBgrImg',
            data: {
                'imgFile' : img.src,//#поменять
                'name' : name,
                'ObjectName' : ObjectName,
                'objectDescription' : objectDescription,
                'json' : JSON.stringify(canvas)
            },



            success: function(result){ // результат запроса

                console.log('загружено');
                console.log(result);
            }
        });


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
    // инпат для фона
    $("#InputImage").fileinput({
        showPreview: false,
        showRemove: false,
        showUpload: false

    });

    $('#filesObjects').on('filebatchuploadsuccess', function(event, data, previewId, index) {
        var form = data.form, files = data.files, extra = data.extra,
            response = data.response, reader = data.reader;
        canvas.response = response;
        console.log(response);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////


    CKEDITOR.replace('objectDescription');

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

// Удаление элемента из массива.
// String value: значение, которое необходимо найти и удалить.
// return: массив без удаленного элемента; false в противном случае.
Array.prototype.remove = function(value) {
    var idx = this.indexOf(value);
    if (idx != -1) {
        // Второй параметр - число элементов, которые необходимо удалить
        return this.splice(idx, 1);
    }
    return false;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////////////////////////////////////