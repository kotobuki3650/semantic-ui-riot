// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted() {
  this.update({
    pages: []
  });
}

function onUpdated(props, state) {
  let needsRegenerate = false;
  if (props.activePage != this.lastpropsActivePage) {
    state.activePage = parseInt(props.activePage || 1);
    this.lastpropsActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (state.activePage != this.lastActivePage) {
    this.lastActivePage = state.activePage;
    needsRegenerate = true;
  }
  if (props.totalPage != this.lastpropsTotalPage) {
    state.totalPage = parseInt(props.totalPage || 1);
    this.lastpropsTotalPage = state.totalPage;
    needsRegenerate = true;
  }

  if (needsRegenerate) {
    generatePagination(this);
  }
}

// ===================================================================================
//                                                                               Event
//                                                                               =====
function onClickPage(e, pageNum) {
  e.preventDefault();
  if (pageNum < 1 || pageNum > this.state.totalPage) {
    return
  }
  this.update({
    activePage: pageNum
  });
  this.dispatch('change', pageNum);
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function generatePagination(tag) {
  tag.state.pages = [];
  const activePage = tag.state.activePage;
  const totalPage = tag.state.totalPage;
  const pageSize = calcPageSize(tag.props.pageSize, totalPage);
  const index = calcIndex(activePage, totalPage, pageSize);

  if (pageSize < 1) {
    tag.update();
    return
  }

  for (let i = 0; i < pageSize; i++) {
    tag.state.pages.push({
      number: i + index,
      active: i + index == activePage,
    });
  }
  tag.state.pages[0].number = 1;
  tag.state.pages[pageSize - 1].number = totalPage;
  if (pageSize > 1) {
    tag.state.pages[1].disabled = index != 1;
  }
  if (pageSize > 2) {
    tag.state.pages[pageSize - 2].disabled = index != totalPage - pageSize + 1;
  }

  tag.update();
}

function calcPageSize(pageSize = 7, totalPage = 1) {
  pageSize = parseInt(pageSize);
  return pageSize < totalPage ? pageSize : totalPage
}

function calcIndex(activePage, totalPage, pageSize) {
  const prevPageSize = (pageSize - pageSize % 2) / 2;
  if (activePage + prevPageSize > totalPage) {
    return totalPage - pageSize + 1
  }
  if (activePage > prevPageSize) {
    return activePage - prevPageSize
  }
  return 1
}

var suPagination = {
  'css': null,

  'exports': {
    state: {
      activePage: 1,
      pages: [],
      totalPage: 1,
    },

    lastpropsTotalPage: null,
    lastpropsActivePage: null,
    lastActivePage: null,
    onMounted,
    onUpdated,
    onClickPage
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr28="expr28"><a expr29="expr29"><i aria-hidden="true" class="angle double left icon"></i></a><a expr30="expr30"><i class="angle left icon"></i></a><virtual expr31="expr31"></virtual><a expr35="expr35"><i class="angle right icon"></i></a><a expr36="expr36"><i aria-hidden="true" class="angle double right icon"></i></a></div>',
      [{
        'redundantAttribute': 'expr28',
        'selector': '[expr28]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui pagination menu ', scope.props.class].join('');
          }
        }]
      }, {
        'redundantAttribute': 'expr29',
        'selector': '[expr29]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,1);
          }
        }]
      }, {
        'redundantAttribute': 'expr30',
        'selector': '[expr30]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['angle icon item ', scope.state.activePage <= 1 ? 'disabled' : ''].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage - 1);
          }
        }]
      }, {
        'type': bindingTypes.EACH,
        'getKey': null,
        'condition': null,

        'template': template(null, [{
          'type': bindingTypes.TAG,
          'getComponent': getComponent,

          'evaluate': function(scope) {
            return 'virtual';
          },

          'slots': [{
            'id': 'default',
            'html': '<a expr32="expr32" class="item"></a><a expr33="expr33" class="active item"></a><div expr34="expr34" class="disabled icon item"></div>',

            'bindings': [{
              'type': bindingTypes.IF,

              'evaluate': function(scope) {
                return !scope.page.active && !scope.page.disabled;
              },

              'redundantAttribute': 'expr32',
              'selector': '[expr32]',

              'template': template(' ', [{
                'expressions': [{
                  'type': expressionTypes.TEXT,
                  'childNodeIndex': 0,

                  'evaluate': function(scope) {
                    return [scope.page.number].join('');
                  }
                }, {
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'expr32',

                  'evaluate': function(scope) {
                    return 'expr32';
                  }
                }, {
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'class',

                  'evaluate': function(scope) {
                    return 'item';
                  }
                }, {
                  'type': expressionTypes.EVENT,
                  'name': 'onclick',

                  'evaluate': function(scope) {
                    return event => scope.onClickPage(event,scope.page.number);
                  }
                }]
              }])
            }, {
              'type': bindingTypes.IF,

              'evaluate': function(scope) {
                return scope.page.active;
              },

              'redundantAttribute': 'expr33',
              'selector': '[expr33]',

              'template': template(' ', [{
                'expressions': [{
                  'type': expressionTypes.TEXT,
                  'childNodeIndex': 0,

                  'evaluate': function(scope) {
                    return scope.page.number;
                  }
                }, {
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'expr33',

                  'evaluate': function(scope) {
                    return 'expr33';
                  }
                }, {
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'class',

                  'evaluate': function(scope) {
                    return 'active item';
                  }
                }]
              }])
            }, {
              'type': bindingTypes.IF,

              'evaluate': function(scope) {
                return scope.page.disabled;
              },

              'redundantAttribute': 'expr34',
              'selector': '[expr34]',

              'template': template('<i class="ellipsis horizontal icon"></i>', [{
                'expressions': [{
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'expr34',

                  'evaluate': function(scope) {
                    return 'expr34';
                  }
                }, {
                  'type': expressionTypes.ATTRIBUTE,
                  'name': 'class',

                  'evaluate': function(scope) {
                    return 'disabled icon item';
                  }
                }]
              }])
            }]
          }],

          'attributes': []
        }]),

        'redundantAttribute': 'expr31',
        'selector': '[expr31]',
        'itemName': 'page',
        'indexName': null,

        'evaluate': function(scope) {
          return scope.state.pages;
        }
      }, {
        'redundantAttribute': 'expr35',
        'selector': '[expr35]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.activePage + 1);
          }
        }]
      }, {
        'redundantAttribute': 'expr36',
        'selector': '[expr36]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return [
              'angle icon item ',
              scope.state.activePage >= scope.state.totalPage ? 'disabled' : ''
            ].join('');
          }
        }, {
          'type': expressionTypes.EVENT,
          'name': 'onclick',

          'evaluate': function(scope) {
            return event => scope.onClickPage(event,scope.state.totalPage );
          }
        }]
      }]
    );
  },

  'name': 'su-pagination'
};

export default suPagination;
