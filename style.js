/*! device.js 0.2.7 */
(function () {
    var device,
        previousDevice,
        addClass,
        documentElement,
        _find,
        _hasClass,
        _removeClass;

    previousDevice = window.device;
    device = {};
    window.device = device;
    documentElement = window.document.documentElement;

    device.ios = function () {
        return device.iphone() || device.ipod() || device.ipad();
    };

    device.iphone = function () {
        return _find('iphone');
    };

    device.ipod = function () {
        return _find('ipod');
    };

    device.ipad = function () {
        return _find('ipad');
    };

    device.android = function () {
        return _find('android');
    };

    device.androidPhone = function () {
        return device.android() && _find('mobile');
    };

    device.androidTablet = function () {
        return device.android() && !_find('mobile');
    };

    device.blackberry = function () {
        return _find('blackberry') || _find('bb10') || _find('rim');
    };

    device.blackberryPhone = function () {
        return device.blackberry() && !_find('tablet');
    };

    device.blackberryTablet = function () {
        return device.blackberry() && _find('tablet');
    };

    device.windows = function () {
        return _find('windows');
    };

    device.windowsPhone = function () {
        return device.windows() && _find('phone');
    };

    device.windowsTablet = function () {
        return device.windows() && _find('touch') && !device.windowsPhone();
    };

    device.fxos = function () {
        return (_find('(mobile') || _find('(tablet')) && _find('rv:');
    };

    device.fxosPhone = function () {
        return device.fxos() && _find('mobile');
    };

    device.fxosTablet = function () {
        return device.fxos() && _find('tablet');
    };

    device.meego = function () {
        return _find('meego');
    };

    device.cordova = function () {
        return window.cordova && location.protocol === 'file:';
    };

    device.nodeWebkit = function () {
        return typeof window.process === 'object';
    };

    device.mobile = function () {
        return (
            device.androidPhone() ||
            device.iphone() ||
            device.ipod() ||
            device.windowsPhone() ||
            device.blackberryPhone() ||
            device.fxosPhone() ||
            device.meego()
        );
    };

    device.tablet = function () {
        return (
            device.ipad() ||
            device.androidTablet() ||
            device.blackberryTablet() ||
            device.windowsTablet() ||
            device.fxosTablet()
        );
    };

    device.desktop = function () {
        return !device.tablet() && !device.mobile();
    };

    device.portrait = function () {
        return window.innerHeight / window.innerWidth > 1;
    };

    device.landscape = function () {
        return window.innerHeight / window.innerWidth < 1;
    };

    _find = function (needle) {
        return window.navigator.userAgent.toLowerCase().indexOf(needle) !== -1;
    };

    _hasClass = function (className) {
        return documentElement.className.match(new RegExp(className, 'i'));
    };

    _addClass = function (className) {
        if (!_hasClass(className)) {
            documentElement.className += ' ' + className;
        }
    };

    _removeClass = function (className) {
        if (_hasClass(className)) {
            documentElement.className = documentElement.className.replace(className, '');
        }
    };

    if (device.ios()) {
        if (device.ipad()) {
            _addClass('ios ipad tablet');
        } else if (device.iphone()) {
            _addClass('ios iphone mobile');
        } else if (device.ipod()) {
            _addClass('ios ipod mobile');
        }
    } else if (device.macos()) {
        _addClass('macos desktop');
    } else if (device.android()) {
        if (device.androidTablet()) {
            _addClass('android tablet');
        } else {
            _addClass('android mobile');
        }
    } else if (device.blackberry()) {
        if (device.blackberryTablet()) {
            _addClass('blackberry tablet');
        } else {
            _addClass('blackberry mobile');
        }
    } else if (device.windows()) {
        if (device.windowsTablet()) {
            _addClass('windows tablet');
        } else if (device.windowsPhone()) {
            _addClass('windows mobile');
        } else {
            _addClass('windows desktop');
        }
    } else if (device.fxos()) {
        if (device.fxosTablet()) {
            _addClass('fxos tablet');
        } else {
            _addClass('fxos mobile');
        }
    } else if (device.meego()) {
        _addClass('meego mobile');
    } else if (device.nodeWebkit()) {
        _addClass('node-webkit');
    } else if (device.cordova()) {
        _addClass('cordova');
    }

    if (device.mobile()) {
        _addClass('mobile');
    } else if (device.tablet()) {
        _addClass('tablet');
    } else {
        _addClass('desktop');
    }

    if (device.portrait()) {
        _addClass('portrait');
    } else {
        _addClass('landscape');
    }

    var resizeEvent = 'onorientationchange' in window ? 'orientationchange' : 'resize';

    if (window.addEventListener) {
        window.addEventListener(resizeEvent, function () {
            if (device.landscape()) {
                _removeClass('portrait');
                _addClass('landscape');
            } else {
                _removeClass('landscape');
                _addClass('portrait');
            }
        }, false);
    } else if (window.attachEvent) {
        window.attachEvent(resizeEvent, function () {
            if (device.landscape()) {
                _removeClass('portrait');
                _addClass('landscape');
            } else {
                _removeClass('landscape');
                _addClass('portrait');
            }
        });
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = device;
    } else if (typeof define === 'function' && define.amd) {
        define(function () {
            return device;
        });
    }

    device.noConflict = function () {
        window.device = previousDevice;
        return this;
    };
})();
