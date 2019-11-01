// ===================================================================================
//                                                                           Lifecycle
//                                                                           =========
function onMounted(props, state) {
  this.state.value = props.value || 0;
  if (props.total > 0) {
    this.total = props.total;
  }
  this.percent = getPercent(this);
  this.lastValue = this.state.value;
  this.lastPropsValue = props.value;
  this.update();
}

function onBeforeUpdate(props, state) {
  let changed = false;
  if (this.state.value >= this.total) {
    this.state.value = this.total;
  }
  if (this.state.value <= 0) {
    this.state.value = 0;
  }
  let propsValue = props.value;
  if (propsValue >= this.total) {
    propsValue = this.total;
  }
  if (propsValue <= 0) {
    propsValue = 0;
  }
  if (this.lastValue != this.state.value) {
    this.lastValue = this.state.value;
    changed = true;
  } else if (this.lastPropsValue != propsValue) {
    this.state.value = propsValue;
    this.lastPropsValue = propsValue;
    this.lastValue = propsValue;
    changed = true;
  }

  if (changed) {
    this.percent = getPercent(this);
  }
}

// ===================================================================================
//                                                                              Helper
//                                                                              ======
function getClass() {
  const excludeClasses = ['progress', 'active'];
  return Array.apply(null, this.root.classList).filter(clazz => {
    return !excludeClasses.some(excludeClass => excludeClass == clazz)
  }).join(' ')
}

function getStates() {
  if (isSuccess(this)) {
    return 'success'
  }
  if (isActive(this)) {
    return 'active'
  }
}

function isProgress() {
  return hasClass(this, 'progress')
}

// ===================================================================================
//                                                                               Logic
//                                                                               =====
function getPercent(tag) {
  return parseInt(tag.state.value / tag.total * 100) + ''
}

function isActive(tag) {
  return hasClass(tag, 'active') && tag.percent > 0 && tag.percent < 100
}

function isSuccess(tag) {
  return tag.percent == 100
}

function hasClass(tag, className) {
  return tag.root.classList.contains(className)
}

var suProgress = {
  'css': `su-progress .ui.progress:last-child,[is="su-progress"] .ui.progress:last-child{ margin: 0 0 2.5em; } su-progress.attached,[is="su-progress"].attached{ display: block; height: 0.2rem; padding: 0px; overflow: hidden; border-radius: 0em 0em 0.28571429rem 0.28571429rem; position: absolute; left: 0; width: 100%; } su-progress.top.attached,[is="su-progress"].top.attached{ top: 0px; bottom: 100%; border-radius: 0.28571429rem 0.28571429rem 0em 0em; } su-progress.bottom.attached,[is="su-progress"].bottom.attached{ top: 100%; bottom: auto; }`,

  'exports': {
    state: {
      value: null,
    },

    lastPropsValue: null,
    lastValue: null,
    total: 100,
    onMounted,
    onBeforeUpdate,
    getClass,
    getStates,
    isProgress
  },

  'template': function(template, expressionTypes, bindingTypes, getComponent) {
    return template(
      '<div expr41="expr41"><div expr42="expr42" class="bar"><div expr43="expr43" class="progress"></div></div><div class="label"><slot expr44="expr44"></slot></div></div>',
      [{
        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return scope.props.class;
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'percent',

          'evaluate': function(scope) {
            return scope.percent;
          }
        }]
      }, {
        'redundantAttribute': 'expr41',
        'selector': '[expr41]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'class',

          'evaluate': function(scope) {
            return ['ui progress ', scope.getClass(), ' ', scope.getStates()].join('');
          }
        }, {
          'type': expressionTypes.ATTRIBUTE,
          'name': 'data-percent',

          'evaluate': function(scope) {
            return scope.percent;
          }
        }]
      }, {
        'redundantAttribute': 'expr42',
        'selector': '[expr42]',

        'expressions': [{
          'type': expressionTypes.ATTRIBUTE,
          'name': 'style',

          'evaluate': function(scope) {
            return ['transition-duration: 300ms; width: ', scope.percent, '%;'].join('');
          }
        }]
      }, {
        'type': bindingTypes.IF,

        'evaluate': function(scope) {
          return scope.isProgress();
        },

        'redundantAttribute': 'expr43',
        'selector': '[expr43]',

        'template': template(' ', [{
          'expressions': [{
            'type': expressionTypes.TEXT,
            'childNodeIndex': 0,

            'evaluate': function(scope) {
              return [scope.percent, '%'].join('');
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'expr43',

            'evaluate': function(scope) {
              return 'expr43';
            }
          }, {
            'type': expressionTypes.ATTRIBUTE,
            'name': 'class',

            'evaluate': function(scope) {
              return 'progress';
            }
          }]
        }])
      }, {
        'type': bindingTypes.SLOT,
        'attributes': [],
        'name': 'default',
        'redundantAttribute': 'expr44',
        'selector': '[expr44]'
      }]
    );
  },

  'name': 'su-progress'
};

export default suProgress;
