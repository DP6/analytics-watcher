const RW = {
    panel: jQuery('#panel'),
    busca: jQuery('#busca'),
    info: {
        name: 'Dev',
        version: 'X.X.X',
    },
    util: {
        sub: () => {},
    },
    clear() {
        jQuery('.track').remove();
        this.busca.val('');
    },
};

// change length > 1 to > 0
jQuery('.add-filter .material-icons.center-align.not-hide').on(
    'click',
    'a',
    function() {
        jQuery(this).closest('i').toggleClass('checked');
        RW.panel
            .toggleClass(this.className)
            .toggleClass('filtrado', jQuery('.checked').length > 0);
    }
);

jQuery('.clear-filter').on('click', function() {
    jQuery('.checked').removeClass('checked');
    RW.panel.removeClass();
});

jQuery('.clear-report').on('click', () => RW.clear());

jQuery('#autoscroll').on('change', function() {
    RW.autoscroll = this.checked;
});

jQuery('#search-icon').on('click', () => {
    var searchIcon = jQuery('#search-icon');
    var searchInput = jQuery('#search-input');

    searchIcon.toggleClass('checked');
    searchInput.toggleClass('checked');

    var optionFilter = document.querySelector('.add-filter');
    var filterCount = location.pathname.indexOf('bowser') !== -1 ? 9 : 21;

    if (
        optionFilter.className.indexOf('active-filter') !== -1 &&
        searchInput[0].className.indexOf('checked') !== -1
    ) {
        for (var i = 3; i <= filterCount; i = i + 2) {
            var isChecked =
                optionFilter.childNodes[i].className.indexOf('checked') !== -1 ?
                ' checked' :
                '';

            optionFilter.childNodes[i].setAttribute(
                'class',
                'material-icons center-align hide ' + isChecked
            );
        }

        optionFilter.setAttribute('class', 'add-filter');
    }
});

jQuery('li.add-filter i')[0].onclick = () => {
    var optionFilter = document.querySelector('.add-filter');
    var className;
    var filterCount;

    filterCount = location.pathname.indexOf('bowser') !== -1 ? 9 : 21;

    if (optionFilter.className.indexOf('active-filter') === -1) {
        optionFilter.setAttribute('class', 'add-filter active-filter');
        className = 'material-icons center-align not-hide';
    } else {
        optionFilter.setAttribute('class', 'add-filter');
        className = 'material-icons center-align hide';
    }

    for (var i = 3; i <= filterCount; i = i + 2) {
        var isChecked =
            optionFilter.childNodes[i].className.indexOf('checked') !== -1 ?
            ' checked' :
            '';
        optionFilter.childNodes[i].setAttribute('class', className + isChecked);
    }

    var inputSearch = jQuery('#search-input')[0];
    var iconSearch = jQuery('#search-icon')[0];
    if (inputSearch.className.indexOf('checked') !== -1) {
        inputSearch.setAttribute('class', '');
        iconSearch.setAttribute('class', '');
    }
};

RW.busca.on('keyup', function() {
    let s = new RegExp(this.value, 'i');
    jQuery('.track:not(.history-change)').each(function() {
        const $this = jQuery(this);
        $this.toggleClass('hide', !s.test($this.find('td.value').text()));
    });
});

RW.panel.on('click', '.delete', function(e) {
    e.stopPropagation();
    jQuery(this).closest('.track').remove();
});

// RW.util.sub('newhit', () => console.log('novo hit'));