var data = [
    {
        "name": "a",
        "description": "Welcome to A details",
    },
    {
        "name": "b",
        "description": "Welcome to B details",
    },
    {
        "name": "c",
        "description": "Welcome to C details",
    },
    {
        "name": "d",
        "description": "Welcome to D details",
    },
    {
        "name": "e",
        "description": "Welcome to E details",
    },
    {
        "name": "f",
        "description": "Welcome to F details"
    }
]

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(onResize, 500);
});

function onResize(){
    var descriptionContainer = $('body').find('.description-container');
    var screenSize = $(window).width();

    //$('.row').find('.description-container').remove();
    if(screenSize > 1024) {
        $('.offersOuterCont .row').find(".col-lg-4").last().after(descriptionContainer)
    }
    else if(screenSize >767) {
        if(indexValue(descriptionContainer, true)) {
            $('.offersOuterCont .row').find('.col-lg-4.activated').siblings('.col-lg-4').first().after(descriptionContainer)
        }
        else {
            $('.offersOuterCont .row').find('.col-lg-4.activated').after(descriptionContainer)
        }
    }
    else {
        var parentDom = $('.offersOuterCont .row').find('.col-lg-4.activated');
        var parentIndex = $('.offersOuterCont .row').find('.c-button.activated').attr("index");
        var containerIndex = $(descriptionContainer).attr("index");
        if( parentIndex === containerIndex) {
            $(parentDom).after(descriptionContainer);
        }
    }
}

function indexValue(event, resizeIndex) {
    var indexValue;
    if(resizeIndex) {
        indexValue = parseInt($(event).attr("index"));
    } else {
        if($(event.target).hasClass('c-button')) {
          indexValue = parseInt($(event.target).attr("index"));
        }
        else {
          indexValue = parseInt($(event.target).parents('.c-button').attr("index"));
        }
    }
    if(indexValue%2 == 0 || indexValue == 0) {
        return true;
    }
    else {
    return false;
    }
}

function appendText(event) {
        var currentCityName = $(event.currentTarget).attr("name");
        var descriptionText = '';
        $(event.target).parents('.col-lg-4').addClass('activated')
        $(event.target).parents('.c-button').addClass('activated')
        $.each(data, function(i, item) {
            if(currentCityName == item.name)
            {
                descriptionText = item.description;
                return false;
            }
        })


       return descriptionText;
}
function addIndex(event) {
    var indexValue = parseInt($(event.target).parents('.c-button').attr("index"));
    return indexValue;
}
function viewMore(event) {
    $('.offersOuterCont .row').find('.description-container').remove();
    $('.offersOuterCont .row').find('.col-lg-4').removeClass('activated');
    $('.offersOuterCont .row').find('.c-button').removeClass('activated');
    var screenSize = $(window).width();
    var descriptionContainer = $('<div class="description-container"><p class="description-text"></p></div>');
    var descriptionText =  appendText(event);
    var index = addIndex(event);
    
    if(screenSize > 1024)
    {
        $(event.target).parents(".row").children(".col-lg-4").last().after(descriptionContainer)
        $(".description-text").append(descriptionText);
    }
    else if(screenSize > 767)
    {
        if(indexValue(event)) {
            $(event.target).parents('.col-lg-4').next().after(descriptionContainer)
            $(".description-text").append(descriptionText);
        }
        else {
            $(event.target).parents('.col-lg-4').after(descriptionContainer)
            $(".description-text").append(descriptionText);
        }
    }
    else {
        $(event.target).parents('.col-lg-4').after(descriptionContainer)
        $(".description-text").append(descriptionText);
    }
    $(descriptionContainer).attr("index", index);
}
