import { Cell, NavBar, Form, Field, Button, CountDown } from 'vant'
const element = [Cell, NavBar, Form, Field, Button, CountDown]
export default function (Vue) {
  element.forEach(el => Vue.component(el.name, el))
}
