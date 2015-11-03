<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use App\Http\Requests;
use App\Http\Controllers\Controller;

use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Psy\Util\Json;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\DB;


class AjaxController extends Controller
{
    /**
     * Принимает файлы на вход для сохранения объекта, сохраняет и возвращает json ответ
     *
     * @param Request $request
     * @return Response
     */
    public function addObject(Request $request){
        // валидация на сервера
        $validator = Validator::make($request->all(), [
            'scope_files' => 'required|array',
//            'providers' => 'required|string|max:10000',
//            'vlan_internal' => 'required',
//            'gateway' => 'required|ip',
//            'access_internet' => 'required|boolean',
//            'phone' => 'required|string',
//            'contact_person' => 'required|string',
        ]);

        if($validator->fails())
        {
            $error = $validator->errors()->all();

            return response()->json(['error' => true, $error]);
        }

        $id = 0;


        if (isset($_FILES["scope_files"])) {



            if(\DB::table('objects')->select('object_id')->get() == []){
                $id = 1;
            }else{
                $id = \DB::table('objects')->max('object_id') + 1;
            }
            // создаем папку с нашим объектом
            Storage::makeDirectory($id . '/images');

            for($i = 0; $i < count($_FILES["scope_files"]['name']); $i++){
                // это локальные пути, на сервере поменяю #поменять
                if (move_uploaded_file($_FILES["scope_files"]['tmp_name'][$i], 'C:/xampp/htdocs/objects-image/assets/objects/' .  $id . '/images/' . $_FILES["scope_files"]['name'][$i])) {
                    Log::info('Успешно загружен ' . $i . ' файл');
                }else{
                    Log::info('Ошибка загрузки ' . $i . ' файл');
                    return response()->json(['error' => 'Произошла ошибка загрузки']);
                }


            }

               }



      return response()->json('ok');

    }

    /**
     * Принимаем картинку фоновую на канвас
     *
     * @param Request $request
     */
    public function addBgrImg(Request $request){

        $id = 0;
        if(\DB::table('objects')->select('object_id')->get() == []){
            $id = 1;
        }else{
            $id = \DB::table('objects')->max('object_id') + 1;
        }

        // Все загруженные файлы помещаются в эту папку
        $uploaddir = 'C:/xampp/htdocs/objects-image/assets/objects/' .  $id . '/images/';
        Log::info('Путь ' . $uploaddir);
        // Вытаскиваем необходимые данные
        $file = $_POST['imgFile'];
        $name = $_POST['name'];
        $json = $_POST['json'];

        // Получаем расширение файла
        $getMime = explode('.', $name);

        // Выделим данные
        $data = explode(',', $file);

        // Декодируем данные, закодированные алгоритмом MIME base64
        $encodedData = str_replace(' ','+',$data[1]);
        $decodedData = base64_decode($encodedData);

        // Вы можете использовать данное имя файла, или создать произвольное имя.
        // Мы будем создавать произвольное имя!
        //$randomName = substr_replace(sha1(microtime(true)), '', 12).'.'.$mime;

        // Создаем изображение на сервере
        if(file_put_contents($uploaddir . $name, $decodedData)) {
            Log::info('Успешно загружен фон ' . $name . ' файл');
        }
        else {
            // Показать сообщение об ошибке, если что-то пойдет не так.
            Log::info('Ошибка загрузки фон ' . $name . ' файл');
        }


        return response()->json($json);

    }

    public function loadObject(Request $request){


        return \DB::table('objects')->select('json')->where('object_id', '1')->get()[0]->json;


    }

}
