
$.fn.selectinput = function( opt ){
  for( var i = 0; i < this.length; i ++ ){
    var thisone = $(this[i]);
    var this_id = getThisId( thisone );
    var input_id = generateInputId( thisone );
    var input = '<input type="text" class="select2input_input" id="' + input_id + '" style="display:none;" value=""/>';
    thisone.parent().append( input );

    var w = '200px';
    var this_width = thisone.css( 'width' );
    if( this_width ){ w = this_width; }
    else if( opt && opt.width ){ w = opt.width; }
    thisone.css( 'width', w );
    $('#'+input_id).css( 'width', w );

    var h = '40px';
    var this_height = thisone.css( 'height' );
    if( this_height ){ h = this_height; }
    else if( opt && opt.height ){ h = opt.height; }
    thisone.css( 'height', h );
    $('#'+input_id).css( 'height', h );

    //. select の値が変わった時のハンドリングを定義
    thisone.change( function( e ){
      var target = e.target;
      var this_id = $(target).attr( 'id' );
      var input_id = this_id + '_input';
      var v = $('#'+this_id).val();
      $('#'+input_id).val( v );
    });
    var v = $('#'+this_id).val();
    $('#'+input_id).val( v );

    //. select がダブルクリックされたら select を非表示にした上で、同じ値が入っている input を表示する
    thisone.dblclick( function( e ){
      var input_id = generateInputId( $(e.target) );
      $(e.target).css( 'display', 'none' );
      $('#'+input_id).css( 'display', 'block' );
    });

    //. input がフォーカスを失ったら、値を select に追加して input を非表示にし、select が再表示され、かつその値が選択されている状態にする
    //$('#'+input_id).blur( function(){
    $('.select2input_input').blur( function( e ){
      var target = e.target;
      var input_id = $(target).attr( 'id' );
      var this_id = input_id.substr( 0, input_id.length - 6 );
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
  }

  return this;
};

function getThisId( t ){
  var id = t.attr( 'id' );
  if( !id ){
    var id = 'select2input_id_' + ( new Date() ).getTime() + Math.floor( Math.random() * 1000 );
    t.attr( 'id', id );
  }

  return id;
};

function generateInputId( t ){
  var this_id = getThisId( t );
  var input_id = this_id + '_input';

  return input_id;
};

//. 現在の値を取り出す
$.fn.getValue = function(){
  var thisone = $(this);
  var input_id = generateInputId( thisone );

  //. select ではなく input に入っている値を取り出す
  var v = $('#'+input_id).val();
  return v;
};

