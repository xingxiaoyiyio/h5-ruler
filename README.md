# js实现H5页面手指滑动刻度尺
写了一个在移动端使用的可滑动刻度尺，曾经在原生App中看到过，做得很精细，现在用web页面实现的；
实现效果如下：
 ![](https://github.com/xingxiaoyiyio/h5-ruler/raw/master/img/1.png)

封装成直接可用的MeasureRuler.js

 #### 调用方法
 ```
 //初始化尺子
    var measureRuler =new MeasureRuler({
   　　　　 wrapperId:"rulerWrapper",     //容器ID，页面中写一个DIV就行 (必须)
  　　　　  max:2000,                     //刻度尺最大的刻度    (非必须，默认为2000)
  　　　　  minUnit:1,                    //刻度尺最小刻度    (非必须，默认为1)
   　　　　 unitSet:10,                   //刻度尺单元长度    (非必须，默认是10)
　　　　　　value:5,                      //初始化数值       (非必须，默认为1)
   　　　　 mult:1,     //刻度值倍数，默认是最小刻度值为10px，如果定mult为3则最小刻度为30px (非必须，默认为1)
   　　　　 callback:rulerSetValue        //滑动尺子过程中的回调函数     (非必须)
        })
 ```
 
 #### 给刻度尺赋值
 ```
 //给刻度值赋值为3
 measureRuler.setValue(3)
 ```
 
  ![](https://github.com/xingxiaoyiyio/h5-ruler/raw/master/img/2.png)
  
  #### 切换刻度尺状态,满足不同量程，重绘刻度尺
  ```
  //重新设定新的参数
           var    nParam={
                max:5,
                minUnit:0.5,
                unitSet:2,
                mult:3,
                value:1.5
            }
            //重新绘制图
  measureRuler.reDrawRuler(nParam);
  ```
  ![](https://github.com/xingxiaoyiyio/h5-ruler/raw/master/img/3.png)
  
  ### 注：存在问题
   组件使用touch事件，捕捉滑动范围，但是当最小刻度为1时即每一刻度为10px,小范围滑动得不精准，需要反复前后小心滑动才能滑到像滑到的刻度点，准备有时间再改进改进
  
