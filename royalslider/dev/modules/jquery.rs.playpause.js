(function($) {

	"use strict";

	/**
	 *
	 * RoyalSlider playpause module
     *
     * Allows the autoplay to be paused and restarted using a button.
     *
	 * @version 1.0.0-beta:
	 *
	 */
	$.extend($.rsProto, {
		_initPlayPause: function() {
			var self = this;

			self._playpauseDefaults = {
				enabled: true
			};
			self.st.playpause = $.extend({}, self._playpauseDefaults, self.st.playpause);

			if(self.st.playpause.enabled) {
				self.ev.one('rsBeforeSizeSet', function() {
					self._setupPlayPause();
				});
			}
		},
        _setupPlayPause: function() {
            var self = this;
            self._playpauseBtn = $('<div class="rsPlayPauseBtn"><div class="rsPlayPauseIcn"></div></div>')
                .appendTo(self._controlsContainer)
                .on('click.rs', function () {
                    if (self._autoPlayRunning) {
                        self._pause();
                    } else {
                        self._play();
                    }
                });
        },
        _play: function () {
            var self = this;
            if(!self._pausedByHover && !self._pausedByVideo) {
                self._autoPlayRunning = true;
                if(self._autoPlayTimeout) {
                    clearTimeout(self._autoPlayTimeout);
                }
                self._autoPlayTimeout = setTimeout(function() {
                    var changed;
                    if(!self._loop && !self.st.loopRewind) {
                        changed = true;
                        self.st.loopRewind = true;
                    }
                    self.next(true);
                    if(changed) {
                        changed = false;
                        self.st.loopRewind = false;
                    }
                }, !self.currSlide.customDelay ? self.st.autoPlay.delay : self.currSlide.customDelay);
                self.slider.removeClass('rsPlayPausePaused');
            }

        },
        _pause: function() {
            var self = this;
            if(!self._pausedByHover && !self._pausedByVideo) {
                self._autoPlayRunning = false;
                if(self._autoPlayTimeout) {
                    clearTimeout(self._autoPlayTimeout);
                    self._autoPlayTimeout = null;
                }
                self.slider.addClass('rsPlayPausePaused');
            }
        }
	});
	$.rsModules.playpause = $.rsProto._initPlayPause;
})(jQuery);
