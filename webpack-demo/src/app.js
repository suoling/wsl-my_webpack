import Layer from './components/layer/layer.js';
import './css/common.css'
import './components/layer/layer.less';

 const App = function () {
     var dom = document.getElementById('app')
     var layer = new Layer()
     console.log(layer)
     dom.innerHTML = layer.tpl({
         name: '药耀源',
         arr: ['apple', 'banana', 'oringe']
     })
 }

 new App();