riot.tag2('su-progress', '<div class="ui progress {getClass()} {getStates()}" data-percent="{percent}"> <div class="bar" riot-style="transition-duration: 300ms; width: {percent}%;"> <div if="{isProgress()}" class="progress">{percent}%</div> </div> <div class="label"> <yield></yield> </div> </div>', 'su-progress .ui.progress:last-child,[data-is="su-progress"] .ui.progress:last-child{ margin: 0 0 2.5em; } su-progress.attached,[data-is="su-progress"].attached{ display: block; height: 0.2rem; padding: 0px; overflow: hidden; border-radius: 0em 0em 0.28571429rem 0.28571429rem; position: absolute; left: 0; width: 100%; } su-progress.top.attached,[data-is="su-progress"].top.attached{ top: 0px; bottom: 100%; border-radius: 0.28571429rem 0.28571429rem 0em 0em; } su-progress.bottom.attached,[data-is="su-progress"].bottom.attached{ top: 100%; bottom: auto; }', 'class="{opts.class}"', function(opts) {
    this.value = null
    this.defaultValue = null
    let total = 100
    let lastValue = null
    let lastOptsValue = null

    this.on('mount', () => {
      if (typeof opts.riotValue === 'undefined' && typeof opts.value !== 'undefined') {
        opts.riotValue = opts.value
      }
      init(opts.riotValue, opts.total)

      this.update()
      this.defaultValue = this.value
    })

    this.on('update', () => {
      let changed = false
      if (this.value >= total) {
        this.value = total
      }
      if (this.value <= 0) {
        this.value = 0
      }
      if (lastValue != this.value) {
        lastValue = this.value
        changed = true
      } else if (lastOptsValue != opts.riotValue) {
        this.value = opts.riotValue
        lastOptsValue = opts.riotValue
        lastValue = opts.riotValue
        changed = true
      }

      if (changed) {
        this.percent = getPercent()
      }
    })

    this.getClass = () => {
      const excludeClasses = ['progress', 'active']
      return Array.apply(null, this.root.classList).filter(clazz => {
        return !excludeClasses.some(excludeClass => excludeClass == clazz)
      }).join(' ')
    }

    this.getStates = () => {
      if (isSuccess()) {
        return 'success'
      }
      if (isActive()) {
        return 'active'
      }
    }

    this.isProgress = () => {
      return hasClass('progress')
    }

    const init = (optsValue, optsTotal) => {
      if (this.value == null) {
        this.value = optsValue || 0
      }
      if (optsTotal > 0) {
        total = optsTotal
      }
      this.percent = getPercent()
      lastValue = this.value
      lastOptsValue = optsValue
    }

    const getPercent = () => {
      return parseInt(this.value / total * 100)
    }

    const isActive = () => {
      return hasClass('active') && this.percent > 0 && this.percent < 100
    }

    const isSuccess = () => {
      return this.percent == 100
    }

    const hasClass = className => {
      return this.root.classList.contains(className)
    }
});