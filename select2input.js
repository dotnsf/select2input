var this_id = null;
var input_id = null;

$.fn.selectinput = function( opt ){
  //. this = $('#select')
  this_id = getThisId( this);
  input_id = getInputId( this );
  var input = '<input type="text" id="' + input_id + '" style="display:none;" value=""/>';
  this.parent().append( input );

  var w = '200px';
  var this_width = this.css( 'width' );
  if( this_width ){ w = this_width; }
  else if( opt && opt.width ){ w = opt.width; }
  this.css( 'width', w );
  $('#'+input_id).css( 'width', w );

  var h = '40px';
  var this_height = this.css( 'height' );
  if( this_height ){ h = this_height; }
  else if( opt && opt.height ){ h = opt.height; }
  this.css( 'height', h );
  $('#'+input_id).css( 'height', h );

  //. select の値が変わった時のハンドリングを定義
  this.change( onSelectChange );
  onSelectChange();

  //. select がダブルクリックされたら select を非表示にした上で、同じ値が入っている input を表示する
  this.dblclick( function( e ){
    $('#'+this_id).css( 'display', 'none' );
    $('#'+input_id).css( 'display', 'block' );
  });

  //. input がフォーカスを失ったら、値を select に追加して input を非表示にし、select が再表示され、かつその値が選択されている状態にする
  $('#'+input_id).blur( function(){
    var v = $('#'+input_id).val();
    var index = -1;
    $('#'+this_id+' option').each( function( idx, element ){
       if( v == $(element).attr( 'value' ) ){
         index = idx;
       }
    });
    if( index == -1 ){
      //. select に存在していない値が指定されていた場合のみ追加
      $('#'+this_id).append( '<option value="' + v + '">' + v + '</option>' );
      $('#'+this_id).val( v );
      $('#'+input_id).val( v );
    }

    $('#'+this_id).css( 'display', 'block' );
    $('#'+input_id).css( 'display', 'none' );
  });

  return this;
};

function getThisId( t ){
  return t.attr( 'id' );
};

function getInputId( t ){
  if( !this_id ){
    return 'selectinput_myinput';
  }else{
    return this_id + '_input';
  }
};

//. select の値が変わったら、その値を隠しフィールドに代入しておく
function onSelectChange(){
  var v = $('#'+this_id).val();
  $('#'+input_id).val( v );
};

//. 現在の値を取り出す
$.fn.getValue = function(){
  //. select ではなく input に入っている値を取り出す
  var v = $('#'+input_id).val();
  return v;
};

//. $('#select').selectinput();
//. $('#select').getValue();
