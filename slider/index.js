function initSliders() {

  var CounterElement = (function () {
    function CounterElement(element, parent) {
      this.element = element;
      this.$element = $(element);
      this.parent = parent;
    }

    $.extend(
      CounterElement.prototype,
      {
        update: function() {
          this.$element.html((this.parent.count + 1) + "&nbsp;<em>of</em>&nbsp;" + this.parent.slideCount);
        }
      }
    );
  return CounterElement;
  }());

  var PagerElement = (function () {
    function PagerElement(element, parent) {
      this.element = element;
      this.$element = $(element);
      this.prev = this.$element.find('.prev');
      this.next = this.$element.find('.next');
      this.parent = parent;

      this.prev.on('click', $.proxy(this.prevClick, this));
      this.next.on('click', $.proxy(this.nextClick, this));
    }

    $.extend(
      PagerElement.prototype,
      {
        prevClick: function() {
          this.parent.moveRight();
        },
        nextClick: function() {
          this.parent.moveLeft();
        }
      }
    );
  return PagerElement;
  }());

  var FinalSlide = (function () {
    function FinalSlide(index, element, parent) {
      this.element = element;
      this.$element = $(element);
      this.parent = parent;

      this.adjustCSS(index);
    }

    $.extend(
      FinalSlide.prototype,
      {
        adjustCSS: function(index) {
          this.$element.css({
            width: (100 / this.parent.finalSlideCount) + "%",
            "margin-left": (-100 / this.parent.finalSlideCount) + "%"
          })
          .attr('id', index);
        },
        removeClasses: function() {
          this.$element
            .removeClass("slide-right slide-left slide-left-force");
        },
        moveLeft: function(index) {
          this.newIndex = this.parent.finalSlideCount - this.parent.countIndex;
          this.changing = this.newIndex === this.parent.finalSlideCount ? 0 : this.newIndex;

          if ( index === this.changing ) {
            this.$element.prependTo(this.parent.slides);
          }

          this.removeClasses();

          if ( index + 1 === this.newIndex ) {
            this.$element
              .dequeue()
              .addClass("slide-left")
              .delay(800)
              .queue(
                $.proxy(this.parent.swipeCallback, this.parent)
              );
          }
        }
      }
    );
  return FinalSlide;
  }());

  var SliderElement = (function () {
    function SliderElement(element) {
      this.element = element;
      this.$element = $(element);

      this.slides = this.$element.find('.slides');
      this.slide = this.$element.find('.slide');
      this.slideCount = this.slide.length;

      this.slideReady = true;
      this.count = 0;
      this.countIndex = 0;
      this.timer = null;

      if (this.slideCount > 1) {
        $(document).ready($.proxy(this.init, this));
      }

      this.$element.mouseenter($.proxy(this.killTimer, this));
      this.$element.mouseleave($.proxy(this.startTimer, this));
    }
    $.extend(
      SliderElement.prototype,
      {
        initItems: function (index, element) {
          return new TechItem(element, this);
        },

        init: function (index, element) {
          this.$element
            .append([
              "<div class='pager'>",
              "<a class='prev icon-arrow-left'>",
              "<span class='sr'>Previous",
              "</span></a>",
              "<a class='next icon-arrow-right'>",
              "<span class='sr'>Next",
              "</span></a>",
              "</div>"]
              .join(""))
            .append("<div class='contained counter'></div>")
            .addClass("slider-activated");

          this.counter = new CounterElement(
            this.$element.find(".counter").get(0),
            this
          );

          this.pager = new PagerElement(
            this.$element.find(".pager").get(0),
            this
          );

          this.counter.update();

          if (this.slideCount === 2) {
            this.slide
              .clone()
              .appendTo(this.slides);
          }

          this.reverseSlides();
          this.updateCSS();

        },

        updateCSS: function() {
          this.finalSlideCount = this.$element.find('.slide').length;

          this.slides.css("width", (100 * this.finalSlideCount) + "%");

          this.finalSlides = this.$element
                                .find('.slide')
                                .map($.proxy(this.initSlides, this));

          this.finish();
        },

        initSlides: function(index, element) {
          return new FinalSlide(index, element, this);
        },

        reverseSlides: function () {
          this.slide = this.$element.find('.slide');
          this.slides.append(
            this.slide
              .get()
              .reverse()
          );
        },

        finish: function() {
          this.slideFirst = this.$element.find('.slide').first();
          this.slideFirst
            .addClass("slide-left-force")
            .appendTo(this.slides);

          skrollr.get().refresh(this.$element);
          this.startTimer();
        },

        swipeCallback: function() {
          this.slideReady = true;
          console.log('callback');
        },

        moveLeft: function() {

          if (this.slideReady === false) {
            return;
          }

          this.slideReady = false;

          this.finalSlides.map( function (index, finalSlide){
            finalSlide.moveLeft(index);
          });

          this.count = ((this.count < this.slideCount - 1 ) ? this.count + 1 : 0);
          this.countIndex = ((this.countIndex < this.finalSlideCount - 1 ) ? this.countIndex + 1 : 0);
          this.counter.update();

        },

        moveRight: function() {

          if (!this.slideReady) {
            return;
          }

          this.slideLast = this.$element.find('.slide').last();
          this.slideFirst = this.$element.find('.slide').first();
          this.slideReady = false;

          this.finalSlides.map( function (index, finalSlide){
            finalSlide.removeClasses();
          });

          this.slideLast.addClass("slide-right");

          this.count = ((this.count > 0) ? this.count - 1 : this.slideCount - 1);
          this.countIndex = ((this.countIndex > 0) ? this.countIndex - 1 : this.finalSlideCount - 1);
          this.counter.update();

          this.slideFirst
            .dequeue()
            .removeClass("slide-right")
            .addClass("slide-left-force")
            .appendTo(this.slides)
            .delay(800)
            .queue( $.proxy(this.swipeCallback, this) );
        },

        timerFunction: function() {
          setInterval( function(){
            if (this.slideReady) {
              this.moveLeft();
            }
          }, 8000);
        },

        startTimer: function() {
          console.log('startTimer');
          this.timer = setInterval( function(){
            if (this.slideReady) {
              this.moveLeft();
            }
          }, 8000);
        },

        killTimer: function() {
          console.log('killTimer');
          clearInterval(this.timer);
        }

      }
    );
  return SliderElement;
  }());

  $(".slider").map(function (index, element) {
    var sliderElement = new SliderElement(element);
  });

}

module.exports = initSliders;
