riot.tag2('su-select', '<select onchange="{change}" onblur="{blur}" class="{default: default} text"> <option each="{item in opts.items}" riot-value="{item.value}" if="{!item.items}"> {item.label} </option> <optgroup label="{item.label}" each="{item in opts.items}" if="{item.items}"> <option each="{child in item.items}" riot-value="{child.value}"> {child.label} </option> </optgroup> </select> <i class="dropdown icon"></i>', 'su-select.ui.selection.dropdown,[data-is="su-select"].ui.selection.dropdown{ padding: 0; } su-select.ui.selection.dropdown>select:focus,[data-is="su-select"].ui.selection.dropdown>select:focus{ outline: 0; border-color: #96c8da; } su-select.ui.selection.dropdown>select,[data-is="su-select"].ui.selection.dropdown>select{ display: block !important; padding: .78571429em 2.1em .78571429em 1em; background: 0 0 !important; position: relative; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; -webkit-appearance: none; -moz-appearance: none; -webkit-box-sizing: border-box; box-sizing: border-box; border: none; width: 100%; z-index: 2; font-family: Lato, \'Helvetica Neue\', Arial, Helvetica, sans-serif; } su-select.ui.selection.dropdown>.dropdown.icon,[data-is="su-select"].ui.selection.dropdown>.dropdown.icon{ z-index: 1; }', 'class="ui selection dropdown"', function(opts) {
    this.defaultValue = ''
    this.value = ''
    this.label = ''

    if (opts.items && opts.items.length > 0) {
      this.label = opts.items[0].label
      this.value = opts.items[0].value
      this.default = opts.items[0].default
    }

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      if (typeof opts.riotValue !== 'undefined') {
        this.value = opts.riotValue
        this.defaultValue = this.value
        this.update()
      } else {
        this.defaultValue = this.value
      }
    })

    this.on('update', () => {
      if (opts.items) {
        let selected = opts.items.filter(item => item.value === this.value)
        if (!selected || selected.length == 0) {
          const childItems = flatMap(opts.items.filter(item => item.items), item => item.items)
          selected = childItems.filter(item => item.value == this.value)
        }

        if (selected && selected.length > 0) {
          const target = selected[0]
          if (this.label !== target.label) {
            this.changeValues(this.value, true)
          }
        } else if (opts.items && opts.items.length > 0) {
          if (this.value != opts.items[0].value) {
            this.value = opts.items[0].value
          }
          if (this.label != opts.items[0].label) {
            this.label = opts.items[0].label
            this.default = opts.items[0].default
          }
        }
      }
    })

    this.reset = () => {
      this.value = this.defaultValue
    }

    this.changed = () => {
      return this.value !== this.defaultValue
    }

    this.blur = () => {
      this.trigger('blur')
    }

    this.change = target => {
      this.changeValues(target.target.value)
    }

    this.changeValues = (value, updating) => {
      let item
      if (opts.items.some(item => item.value == value || item.label == value)) {
        item = opts.items.filter(item => item.value == value || item.label == value)[0]
        this.label = item.label
        this.value = item.value
        this.default = item.default
      } else {
        const childItems = flatMap(opts.items.filter(item => item.items), item => item.items)
        if (childItems.some(item => item.value == value || item.label == value)) {
          item = childItems.filter(item => item.value == value || item.label == value)[0]
          this.label = item.label
          this.value = item.value
          this.default = item.default
        }
      }

      if (!updating) {
        this.update()
        this.trigger('change', item)
      }
    }

    const flatMap = (xs, f) => {
      return xs.reduce(function (ys, x) {
        return ys.concat(f(x))
      }, [])
    }
});