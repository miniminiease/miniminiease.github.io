/**
 * at the page loaded, this function will decide what to show according to the query string
 */
function getPageFromUrlParam() {
    var menu_item = window.location.search || '?home';
    var product_key = 0;
    var index = menu_item.indexOf('=');
    if(index == -1) {
        menu_item = menu_item.slice(1);
    } else {
	product_key = menu_item.slice(index+1);
        menu_item = menu_item.slice(1, index);
    }

    var page = menu_item;
    var xmlhttpreq = $.ajax({
        url: 'en/' + page + '.html',
        async: false
    });
    if(xmlhttpreq.status == 200 || xmlhttpreq.status == 0) {
        var html = xmlhttpreq.responseText;
        var menuID = '#Menu'+menu_item[0].toUpperCase()+menu_item.substr(1,menu_item.length-1);
        $(menuID + ' a').css('font-weight', 'bold');
        $(menuID + ' a').css('font-size', 'normal');

        if(product_key == 0)
        {
            $('#Content').html(html);
            $('#Content').append('<div style="clear:both;"></div>');
        } else {
            showProduct(product_key, html);
        }
    }
}


function fillCurrentPageProductContent(productMenuHtml, key, data, pageDataHead, numPerPage) {
    var dataNum = data.getNumberOfRows();

    if(pageDataHead >= dataNum) {
        pageDataHead -= numPerPage;
    }
    if(pageDataHead < 0) {
        pageDataHead = 0;
    }
    $('#Content').html(productMenuHtml);
    $('#Content').find('a[href*="'+key+'"]').attr('id', 'SubMenuSelection');

    if(data != null && dataNum != 0) {
        var pageDataEnd = (dataNum < pageDataHead+numPerPage) ? dataNum : pageDataHead+numPerPage;

        var prevPage = $('<div class="paging">&lt;</div>');
        if(pageDataHead > 0) {
            $(prevPage).attr('id', 'prevPage');
            $(prevPage).click(function() {
                fillCurrentPageProductContent(productMenuHtml, key, data, pageDataHead-numPerPage, numPerPage);
            });
        }
        var nextPage = $('<div class="paging">&gt;</div>');
        if(pageDataEnd < dataNum) {
            $(nextPage).attr('id', 'nextPage');
            $(nextPage).click(function() {
                fillCurrentPageProductContent(productMenuHtml, key, data, pageDataHead+numPerPage, numPerPage);
            });
        }

        var current = pageDataHead/numPerPage+1;
        var pagingZone = $('<div id="pagingZone"></div>');
        $(pagingZone).append(nextPage);
        if(dataNum > numPerPage) {
            $(pagingZone).append('<div id="pageNum">'+current+'</div>');
        }
        $(pagingZone).append(prevPage);
        $('#Content').append(pagingZone);

        for(var i=pageDataHead; i<pageDataEnd; ++i) {
            var _div = $("<div></div>");
            $(_div).append('<h3>Product Number</h3>');
            $(_div).append(data.getValue(i, 0));
            $(_div).append('<h3>Product Name</h3>');
            $(_div).append(data.getValue(i, 1));
            $(_div).append('<h3>Description</h3>');
            $(_div).append(data.getValue(i, 2));
            $(_div).append(data.getValue(i, 3));
            var _img = $("<img />");
            $(_img).attr('src', data.getValue(i, 4));
            var _box = $("<div></div>");
            $(_box).attr('class', 'oneItem');
            $(_box).append(_div);
            $(_box).append(_img);
            $('#Content').append(_box);
        }

        $('#Content').append('<div style="clear:both;"></div>');
    }
}

