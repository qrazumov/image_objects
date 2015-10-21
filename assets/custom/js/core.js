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
                    height: heightRenderFigure

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

    width: wImg + 'px',
    height: hImg + 'px',
    margin: '0px auto',
    border: '1px solid red'

    });

    canvas = new fabric.Canvas('c');
    canvas.setBackgroundImage(img.src, canvas.renderAll.bind(canvas));

    canvas.on('object:selected', function(options) {
        console.log('object:selected | ' + options); // все свойства объекта...
    });

    };

    };



    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

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












    })();
