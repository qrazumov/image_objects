@extends('layout')

@section('title')
    Objects in Image
@endsection

@section('content')
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Objects in Image
            <small>управление контентом</small>
          </h1>
          <ol class="breadcrumb">
            <li><a href="#"><i class="fa fa-dashboard"></i> Level</a></li>
            <li class="active">Here</li>
          </ol>
        </section>

        <!-- Main content -->
        <section class="content">
		<div class="row">
			<div class="col-lg-9">

                <div class="box box-primary">
                    <div class="box-header with-border">
                      <h3 class="box-title">Рабочая область</h3>
                    </div><!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                      <div class="box-body">
                        <div class="form-group">
                          <label for="exampleInputFile">Выберите изображение:</label>
                          <input type="file" id="InputImage" name="InputImage" required="required" multiple>
                          <p class="help-block">Параметры: ширина: до 1200px размер: до 1000КБ</p>
                          <ul class="parsley-errors-list"></ul>
                        </div>
                        <div class="form-group">
                          <label for="exampleInputEmail1">Имя объекта:</label>
                          <input type="email" class="form-control " id="exampleInputEmail1" placeholder="имя объекта...">
                        </div>
                      </div><!-- /.box-body -->

                    </form>

                   <div id="cMain" class="canvas_1">

                   </div>

                  </div>

			</div>
			<div class="col-lg-3">

                <div class="box box-warning">
                    <div class="box-header with-border">
                      <h3 class="box-title">Quick Example</h3>
                    </div><!-- /.box-header -->
                    <!-- form start -->
                    <form role="form">
                      <div class="box-body">
                        <div class="form-group">
                          <label for="exampleInputEmail1">Email address</label>
                          <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputPassword1">Password</label>
                          <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password">
                        </div>
                        <div class="form-group">
                          <label for="exampleInputFile">File input</label>
                          <input type="file" id="exampleInputFile">
                          <p class="help-block">Example block-level help text here.</p>
                        </div>
                        <div class="checkbox">
                          <label>
                            <input type="checkbox"> Check me out
                          </label>
                        </div>
                      </div><!-- /.box-body -->

                      <div class="box-footer">
                        <button type="submit" class="btn btn-primary">Submit</button>
                      </div>
                    </form>
                  </div>

			</div>
		</div>

		
          <!-- Your Page Content Here -->

        </section><!-- /.content -->
      </div>
@endsection

@section('js')

    <!-- core application file -->
    <script src="{{ asset('assets/custom/js/core.js') }}" type="text/javascript"></script>

@endsection