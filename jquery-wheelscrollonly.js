/**
 * @author Race
 * v0.01 initial
 *
 */
(function($) {
    $.fn.wheelscroll = function(options) {

        var settings = {//defaults
            speed : 50,
            console : "#console"
        };

        return this.each(function() {
            if (options === 'refresh') {
                $.extend(settings, $(this).data());
                //include any previously stored options for this scroll pane
                if (!$(this).hasClass('scroll-pane')) {//traps the case where refresh has been called on slider that has not been set up
                    $(this).addClass('scroll-pane').data(options);
                    //add a class and store the options as data against the element in case they are needed later
                    $(this).children().wrapAll('<div class="scroll-content"/>');
                }else if(!$(this).children().hasClass('scroll-content')){
                    $(this).children().wrapAll('<div class="scroll-content"/>');
                }
                setWheeler($(this));
            } else {
                if (options) {
                    $.extend(settings, options);
                }
                $(this).addClass('scroll-pane').data(options);
                //add a class and store the options as data against the element in case they are needed later
                $(this).children().wrapAll('<div class="scroll-content"/>');
                setWheeler($(this));
            }

        });
        function setWheeler($scrollpane) {
            //change the main div to overflow-hidden as we can use the slider now
            $scrollpane.css({
                overflow : 'hidden',
                position : 'relative'
            });
            //compare the height of the scroll content to the scroll pane to see if we need a scrollbar
            var difference = $scrollpane.height() - $scrollpane.find('.scroll-content').height();
            $scrollpane.find('.scroll-content').width($scrollpane.width());
            
            $scrollpane.unmousewheel();
            if (difference > 0) {
                difference = 0;
            }
            $scrollpane.data('difference', difference);
            //reposition after refresh
            if ($scrollpane.find('.scroll-content').position().top < difference) {
                $scrollpane.find('.scroll-content').css({
                    width:"100%",
                    position : "absolute",
                    left : 0,
                    top : difference
                });
            }

            $scrollpane.mousewheel(function(event, delta) {
                $scrollpane.find('.scroll-content').css({
                    position : "absolute",
                    left : 0,
                    top : function() {
                        p = $scrollpane.find('.scroll-content').position().top + (settings.speed * delta);
                        if (p > 0) {
                            p = 0;
                        } else if (p < (difference )) {
                            p = difference;
                        }
                        return p;
                    }
                });
                $(settings.console).text(delta + "," + $scrollpane.find('.scroll-content').position().top + "," + difference);
                //stop any default behaviour
                event.preventDefault();
            });

        }

    };
})(jQuery);
