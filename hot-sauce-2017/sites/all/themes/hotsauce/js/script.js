/**
 * @file
 * A JavaScript file for the theme.
 *
 * In order for this JavaScript to be loaded on pages, see the instructions in
 * the README.txt next to this file.
 */

// JavaScript should be made compatible with libraries other than jQuery by
// wrapping it with an "anonymous closure". See:
// - https://drupal.org/node/1446420
// - http://www.adequatelygood.com/2010/3/JavaScript-Module-Pattern-In-Depth
(function($, Drupal, window, document) {
    'use strict';

    // To understand behaviors, see https://drupal.org/node/756722#behaviors
    Drupal.behaviors.my_custom_behavior = {
        attach: function(context, settings) {
            // Stuff for the about page
            if ($("body.page-about-OFFLINE").length) {

                $(".node-person.view-mode-mini_teaser").each(function() {
                    // convert the links to anchor links
                    $(this).find("a").each(function() {
                        $(this).attr("href", "#" + $(this).attr("href"));
                    });

                    // handle the clicks
                    $(this).click(function() {
                        var person = $(this).attr("about");
                        $(".node-person.view-mode-full:not([about=" + person + "])").hide();
                        $(".node-person.view-mode-full[about=" + person + "]").show();
                    });

                });
            }

            // Give focus class to parent div for form elements, for label handling
            $("form input").focus(function() {
                $(this).closest("div").addClass("focus");
            });

            $("form input").blur(function() {
                $(this).closest("div").removeClass("focus");
            });

            // homepage silliness
            if ($("body.front").length) {
                //  $("header.header").append("<div id='header-anim'></div>");
            }

            // handle the verticalized tabs
            $(".tabs__tab").each(function() {
                var $this = $(this),
                    child = $this.children(":first");
                $this.css("minHeight", function() {
                    return child[0].getBoundingClientRect().height;
                });
            });

            // see content-types.scss - allows css animation w/o running it on page load
            $(".node-project.view-mode-teaser").hover(function() {
                $(this).addClass("previously-hovered");
            });

            // Reveal drawers under people on the 'Meet Hot Sauce' page
            $('.view-id-people .views-row').append("<div class='close'></div>");
            $('.view-id-people .views-row').not(".revealed").click(function(e) {
                //      if ($(window).width() < 777) {
                if (!$(this).hasClass("revealed")) { // dunno why the .not isn't working properly
                    var $about = $($(this).children(".node-person")[0]).attr("about").split("/").pop();
                    window.location.hash = $about;

                    $(this).addClass('revealed').siblings().toggleClass('hidden');
                    $(this).parent().height($(this).height());
                    $(window).scrollTo($(".view-id-people"), 500, { offset: { top: -20 } });
                }
            });

            $(".view-id-people .views-row .close").click(function(e) {
                e.preventDefault();
                e.stopPropagation(); // prevent the above from re-triggering

                $(this).parents(".views-row").removeClass("revealed").siblings().removeClass("hidden");
                var $about = $($(this).parents(".views-row").children(".node-person")[0]).attr("about").split("/").pop();
                window.location.hash = window.location.hash.replace($about, "");
            });

            if ($('body').hasClass('node-type-project')) {
                if ($('.group-content .main-image').length) {
                    $('body').addClass('with-half-header');
                }
            }

            // Make slider dots actual dots intead of numbers
            $('.slick-dots button').text('•');


            // on featured work page if title of project doesn't fit on screen reduce font size
            var adjustProjectTitleSize = function() {
                if ($('body').hasClass('section-featured-work')) {
                    var projectTitle = $('.section-featured-work .view-id-projects .views-row .group-content h2');
                    var maxTitleWidth = Math.max.apply(null, projectTitle.map(function() {
                        return $(this).outerWidth(true);
                    }).get());
                    if (maxTitleWidth + 40 >= $(window).outerWidth()) { // ading 40px to offset margin
                        projectTitle.css('font-size', '1.25em');
                    } else {
                        projectTitle.css('font-size', '2em');
                    }

                }
            }
            adjustProjectTitleSize();
            $(window).resize(function() {
                adjustProjectTitleSize();
            });

        }
    };
})(jQuery, Drupal, this, this.document);