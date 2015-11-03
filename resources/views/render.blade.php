@extends('layout')

@section('title')
    Objects in Image | Edit object
@endsection

@section('content')
      <div class="content-wrapper">
        <!-- Content Header (Page header) -->
        <section class="content-header">
          <h1>
            Objects in Image
            <small>управление контентом отображение</small>
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
                      <h3 class="box-title">Свойства области</h3>
                    </div><!-- /.box-header -->
                    <!-- form start -->
                      <div id="parametrsScope" class="box-body">
                      </div><!-- /.box-body -->
                      <div class="box-footer">
                        <button id="submit" type="submit" class="btn btn-primary">Submit</button>
                        <button id="toJSON" type="submit" class="btn btn-primary">toJSON</button>
                      </div>
                  </div>

			</div>
		</div>

          <!-- Your Page Content Here -->

        </section><!-- /.content -->
      </div>
      <!-- Modal windows -->
                <div class="modal bs-example-modal-lg" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                        <h4 class="modal-title">Default Modal</h4>
                      </div>
                      <div class="modal-body">
                        <p>One fine body…</p>

                <hr>
                     <div class="form-group">
                        <input id="filesObjects" class="file" type="file" multiple name="scope_files[]">
                    </div>
                <div class="test">
                    <div class="box box-solid box-success">
                      <div class="box-header with-border">
                        <h3 class="box-title">Укажите соответствие: файл:область</h3>
                        <div class="box-tools pull-right">
                          <button class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i></button>
                        </div><!-- /.box-tools -->
                      </div><!-- /.box-header -->
                      <div id="insideInsertObject" class="box-body">
                      </div><!-- /.box-body -->
                    </div><!-- /.box -->
                </div>
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-default pull-left" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div><!-- /.modal-content -->
                  </div><!-- /.modal-dialog -->
                </div>
@endsection

@section('js')
    <!-- jq context menu -->
    <script src="{{ asset('assets/plugins/jq-context-menu/jquery.contextMenu.js') }}" type="text/javascript"></script>
    <!-- jq context menu relation file -->
    <script src="{{ asset('assets/plugins/jq-context-menu/jquery.ui.position.js') }}" type="text/javascript"></script>
    <!-- canvas-to-blob -->
    <script src="{{ asset('assets/plugins/fileinput/js/plugins/canvas-to-blob.js') }}" type="text/javascript"></script>
    <!-- fileinput -->
    <script src="{{ asset('assets/plugins/fileinput/js/fileinput.js') }}" type="text/javascript"></script>
    <!-- colorpicker -->
    <script src="{{ asset('assets/plugins/colorpicker/bootstrap-colorpicker.js') }}" type="text/javascript"></script>


    <!-- core application file -->
    <script src="{{ asset('assets/custom/js/coreRender.js') }}" type="text/javascript"></script>

@endsection

@section('css')
    <!-- css jquery.contextMenu -->
    <link href="{{ asset('assets/plugins/jq-context-menu/jquery.contextMenu.css') }}" rel="stylesheet" type="text/css" />
    <!-- fileinput -->
    <link href="{{ asset('assets/plugins/fileinput/css/fileinput.css') }}" rel="stylesheet" type="text/css" />
    <!-- colorpicker -->
    <link href="{{ asset('assets/plugins/colorpicker/bootstrap-colorpicker.css') }}" rel="stylesheet" type="text/css" />

@endsection