$(document)
.ready(function(){
  // $('#callout').hide(5500,function(){setTimeout(function(){$('#callout').remove();},5500);});

  $('#callout').on('click',function() {
      // $(this).remove();
      $(this).fadeOut(500,function(){$(this).remove();})
  });

  $('.delete-article').on('click', function(){
    $id = $(this).data('id');
    if (confirm('Are you sure you want to delete this article?')) {
      $.ajax({
        type:'DELETE',
        url: '/write/articles/article/delete/' + $id,
        success: function(response) {
          console.log('Deleting article');
          window.location.href='/read/articles/list';
        },
        error: function(err) {
          console.log(err);
        }
      });
    }
  });

    $('.cancel-edit').on('click', function(){
      $id = $(this).data('id');
      $.ajax({
        type:'GET',
        url: '/read/articles/article/' + $id,
        success: function(response) {
          window.location.href='/read/articles/article/' + $id;
        },
        error: function(err) {
          console.log(err);
        }
      });
    });

    $('#textInput').on('click', function(){
  		addTextInput();
  	});

    $('#passwordInput').on('click', function(){
  		addPasswordInput();
  	});

    $('#emailInput').on('click', function(){
  		addEmailInput();
  	});

    $('.category').on('click', function() {
        var url = '/search/' + $(this).data('category');
        $.ajax({
            url:url,
            type:'GET',
            success:function(){window.location = url;},
            error:function(err){console.log(err);}
        });
    });

    $('.remove-item').on('click', function(){
        var id = $(this).data('id');
        var rev = $(this).data('rev');
        var args = id + ':' + rev;
        var csrf = $(this).data('csrf');
        var url = '/admin/delete/' + args;
        if (confirm('Are you sure you want to delete item?')) {
            $.ajax({
                url:url,
                data:{_csrf:csrf},
                type:'DELETE',
                success:function(data){window.location.href=url;},
                error:function(err) {console.log(err);}
            });
        }
    });
})
.foundation()

function addTextInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-pencil', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'text', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addPasswordInput() {
    var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-lock', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'password', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}

function addEmailInput() {
	var divParent = newElement('div'),
		span = newElement('span'),
        italic = newElement('i'),
		remove = newElement('span'),
        italicRemove = newElement('i'),
		input = newElement('input');

	var count = childCount(element('reg-form')) + 1,
        name = 'input' + count;

    if (confirm('Do you want to name the input?')) {
        var newName = prompt('Enter input name');
        if (newName.length) {
            name = newName;
        }
    }

    /*

        <div class="input-group" >
            <span class="input-group-label"><i class="fi-pencil"></i></span>
            <input class="input-group-field" type="text" placeholder="Name">
        </div>
    */

	addAttribute('class', 'input-group', divParent);
	addAttribute('class', 'input-group-label', span);
    addAttribute('class', 'fi-mail', italic);

    addAttribute('class', 'input-group-field', input);
	addAttribute('placeholder', cfc(name), input);
    addAttribute('type', 'email', input);
    addAttribute('id', name, input);

	addAttribute('class', 'input-group-label', remove);
    addAttribute('class', 'fi-x', italicRemove);

	addAttribute('name', name, input);

	addHandler(remove, 'click', function() {
		element('reg-form').removeChild(divParent);
	});

    $(italic).appendTo(span);
    $(italicRemove).appendTo(remove);
    $(span).appendTo(divParent);
    $(input).appendTo(divParent);
    $(remove).appendTo(divParent);
	$(divParent).appendTo('.registration-form');
}
