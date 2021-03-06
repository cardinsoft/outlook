function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* CardSection class */
let CardSection =
/*#__PURE__*/
function () {
  function CardSection() {
    _classCallCheck(this, CardSection);

    this.className = 'CardSection';
    this.widgets = [];
    this.collapsible = false;
    this.header;
    this.numUncollapsibleWidgets;
  }
  /**
   * Adds a widget to section;
   * @param {Widget} widget widget to add;
   * @return {CardSection} this CardSection;
   */


  _createClass(CardSection, [{
    key: "addWidget",
    value: function addWidget(widget) {
      this.widgets.push(widget);
      return this;
    }
  }, {
    key: "setHeader",

    /**
     * Sets section header;
     * @param {String} header section header;
     * @return {CardSection} this CardSection;
     */
    value: function setHeader(header) {
      this.header = header;
      return this;
    }
  }, {
    key: "setCollapsible",

    /**
     * Sets section collapsibility;
     * @param {Boolean} collapsible;
     * @return {CardSection} this CardSection;
     */
    value: function setCollapsible(collapsible) {
      this.collapsible = collapsible;
      return this;
    }
  }, {
    key: "setNumUncollapsibleWidgets",

    /**
     * Sets number of uncollapsible widgets;
     * @param {Integer} numUncollapsibleWidgets number of widgets;
     * @return {CardSection} this CardSection;
     */
    value: function setNumUncollapsibleWidgets(numUncollapsibleWidgets) {
      this.numUncollapsibleWidgets = numUncollapsibleWidgets;
      return this;
    }
  }, {
    key: "appendToUi",

    /**
     * Utility method for building section display;
     * @param {HtmlElement} parent parent element to append to;
     * @param {Boolean} serialize several sections flag;
     * @param {Integer} sI section index;
     * @return {HtmlElement} built section;
     */
    value: function () {
      var _appendToUi = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(parent, serialize, sI) {
        var collapsible, uncollapse, section, headerText, header, widgets, appendWidgetsAsync, hasInput, wrapper, toggler;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              //access parameters;
              collapsible = this.collapsible;
              uncollapse = this.numUncollapsibleWidgets;

              if (uncollapse && typeof uncollapse !== 'number') {
                uncollapse = +uncollapse;
              } //create section and set its Id number;


              section = document.createElement('div');
              section.id = 'section' + sI;
              section.className = this.className; //if multiple sections -> add separators;

              if (serialize) {
                section.classList.add('separated');
              } //access header text and set section header if provided;


              headerText = this.header;

              if (headerText && headerText !== '') {
                header = document.createElement('p');
                header.className = 'ms-font-m-plus sectionHeader';
                header.textContent = headerText;
                section.append(header);
              } //access widgets and append;


              widgets = this.widgets;

              if (!(widgets.length > 0)) {
                _context2.next = 16;
                break;
              }

              //append widgets to Ui;	
              appendWidgetsAsync =
              /*#__PURE__*/
              function () {
                var _ref = _asyncToGenerator(
                /*#__PURE__*/
                regeneratorRuntime.mark(function _callee(warr, wrapper) {
                  var i, widget, element;
                  return regeneratorRuntime.wrap(function _callee$(_context) {
                    while (1) switch (_context.prev = _context.next) {
                      case 0:
                        i = 0;

                      case 1:
                        if (!(i < warr.length)) {
                          _context.next = 9;
                          break;
                        }

                        widget = warr[i];
                        _context.next = 5;
                        return widget.appendToUi(wrapper);

                      case 5:
                        element = _context.sent;

                      case 6:
                        i++;
                        _context.next = 1;
                        break;

                      case 9:
                      case "end":
                        return _context.stop();
                    }
                  }, _callee);
                }));

                return function appendWidgetsAsync(_x4, _x5) {
                  return _ref.apply(this, arguments);
                };
              }();

              //check if at least one widget is a form input;
              hasInput = widgets.some(function (widget) {
                //access widget's parameters;
                let name = widget.className;
                let hasSwitch = widget.switchToSet; //check if widget is a form element;

                let isFormElem = name === 'TextInput' || name === 'SelectionInput' || hasSwitch; //return true if found;

                if (isFormElem) {
                  return widget;
                }
              }); //if found form input -> append form element and set wrapper to form;

              if (hasInput) {
                wrapper = document.createElement('form');
                section.append(wrapper);
              } else {
                wrapper = document.createElement('div');
                section.append(wrapper);
              }

              _context2.next = 16;
              return appendWidgetsAsync(widgets, wrapper);

            case 16:
              //handle collapsible sections;
              if (collapsible && widgets.length > uncollapse || collapsible && !uncollapse) {
                wrapper.className = 'collapsible'; //create toggler element;

                toggler = document.createElement('div');
                toggler.className = 'toggler centered ms-Icon ms-Icon--ChevronDown pointer';
                section.append(toggler); //add event handler for toggling target element's state;

                toggler.addEventListener('click', function (event) {
                  toggler.classList.toggle('toggler-up');
                });
              }

              parent.append(section);
              return _context2.abrupt("return", section);

            case 19:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));

      function appendToUi(_x, _x2, _x3) {
        return _appendToUi.apply(this, arguments);
      }

      return appendToUi;
    }()
  }]);

  return CardSection;
}();