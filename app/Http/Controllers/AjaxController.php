<?php

namespace App\Http\Controllers;


use App\Object;
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
     * Создаем новую папку для объекта
     *
     */
    protected function createObjectFolder(){

        if(\DB::table('objects')->select('id')->get() == []){
            $id = 1;
        }else{
            $id = \DB::table('objects')->max('id') + 1;
        }
        // создаем папку с нашим объектом
        Storage::makeDirectory($id . '/files');

        return $id;

    }

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




            $id = $this->createObjectFolder();

            for($i = 0; $i < count($_FILES["scope_files"]['name']); $i++){
                // это локальные пути, на сервере поменяю #поменять
                if (move_uploaded_file($_FILES["scope_files"]['tmp_name'][$i], 'C:/xampp/htdocs/objects-image/assets/objects/' .  $id . '/files/' . $_FILES["scope_files"]['name'][$i])) {
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


       // dd($json . ' | ' . $objectDescription . ' | ' . $ObjectName . ' | ');

//        $id = 0;
//        if(\DB::table('objects')->select('id')->get() == []){
//            $id = 1;
//        }else{
//            $id = \DB::table('objects')->max('id') + 1;
//        }
        $id = $this->createObjectFolder();

        // Все загруженные файлы помещаются в эту папку #поменять
        $uploaddir = 'C:/xampp/htdocs/objects-image/assets/objects/' .  $id . '/files/';
        Log::info('Путь ' . $uploaddir);
        // Вытаскиваем необходимые данные
        $file = $_POST['imgFile'];
        $name = $_POST['name'];
//        $json = $_POST['json'];
//        $ObjectName = $_POST['ObjectName'];

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

        $json = $request->get('json');
        $objectDescription = $request->get('objectDescription');
        $ObjectName = $request->get('ObjectName');

        // попытка добавить объект
        try{
            $query = Object::create([
                'author_id' => '1', // #поменять
                'description' => $objectDescription,
                'json' => $json,
                'name' => $ObjectName,
            ]);

            return \Response::json($query);

            // если ошибка, ловим ее и возвращаем error
        } catch(\Exception $e){
            return response()->json(['error' => true, 'reason' => $e->getMessage() . ' строка ' . $e->getLine()]);
        }





//        return response()->json($ObjectName);
        //return $ObjectName;

    }

    public function loadObject(Request $request){

        $id = $request->get('id');

        $size = [];
        $files = Storage::files($id . '/files/');

        foreach ($files as $k => $f) {
            $size[$k] = Storage::size($f);
        }


       // dd($size);

        return response()->json(['json' => \DB::table('objects')->select('json')->where('id', $id)->get()[0]->json, 'files' => $size]);

       // return \DB::table('objects')->select('json')->where('id', $id)->get()[0]->json;


    }

    public function delFile(Request $request){

        // валидация на сервера
        $validator = Validator::make($request->all(), [
            'file' => 'required|string|max:10000',
            'id' => 'required|string|max:100',
        ]);

        if($validator->fails())
        {
            $error = $validator->errors()->all();

            return response()->json(['error' => true, 'reason' => $error]);
        }

        $file = $request->get('file');
        $id = $request->get('id');

        try{

            Storage::delete($id . '/files/' . $file);

        }catch(\Exception $e){

            return response()->json(['error' => true, 'reason' => $e->getMessage()]);

        }





    }

}
