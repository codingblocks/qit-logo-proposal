import { Component, OnInit } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  bGColorWheel
  bG2ColorWheel
  textColorWheel
  text
  bG2
  bG
  sync: boolean

  constructor () { }

  ngOnInit () {
    this.restartBG2ColorWheel()
    this.restartBGColorWheel()
    this.restartTextColorWheel()
  }

  restartTextColorWheel () {
    this.text = this.getRandomColor()
    document.documentElement.style.setProperty('--text', this.text)
    this.textColorWheel = setInterval(() => {
      this.text = this.getRandomColor()
      document.documentElement.style.setProperty('--text', this.text)
    }, 3000)
  }

  stopTextColorWheel () {
    clearInterval(this.textColorWheel)
    this.textColorWheel = null
  }

  restartBGColorWheel () {
    this.bG = this.getRandomColor()
    document.documentElement.style.setProperty('--background', this.bG)
    this.sync && document.documentElement.style.setProperty('--secondary-bg-color', this.bG)
    this.bGColorWheel = setInterval(() => {
      this.bG = this.getRandomColor()
      document.documentElement.style.setProperty('--background', this.bG)
      this.sync && document.documentElement.style.setProperty('--secondary-bg-color', this.bG)
    }, 3000)
  }

  stopBGColorWheel () {
    clearInterval(this.bGColorWheel)
    this.bGColorWheel = null
  }

  restartBG2ColorWheel () {
    this.bG2 = this.getRandomColor()
    document.documentElement.style.setProperty('--secondary-bg-color', this.bG2)
    this.bG2ColorWheel = setInterval(() => {
      this.bG2 = this.getRandomColor()
      document.documentElement.style.setProperty('--secondary-bg-color', this.bG2)
    }, 3000)
  }

  stopBG2ColorWheel () {
    clearInterval(this.bG2ColorWheel)
    this.bG2ColorWheel = null
  }

  syncBackgrounds () {
    this.sync = true
    document.documentElement.style.setProperty('--secondary-bg-color', this.bG)
    this.stopBG2ColorWheel()
  }

  unsyncBackgrounds () {
    this.sync = false
    this.restartBG2ColorWheel()
  }

  pauseAll () {
    this.stopBGColorWheel()
    this.stopBG2ColorWheel()
    this.stopTextColorWheel()
  }

  startAll () {
    this.restartBGColorWheel()
    !this.sync && this.restartBG2ColorWheel()
    this.restartTextColorWheel()
  }

  changeHandler (prop, event) {
    document.documentElement.style.setProperty(prop, event.target.value)
    this.sync && prop === '--background' && document.documentElement.style.setProperty('--secondary-bg-color', this.bG)
  }

  // https://stackoverflow.com/a/1484514/7872063
  getRandomColor () {
    const letters = '0123456789ABCDEF'
    let color = '#'
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }
}
