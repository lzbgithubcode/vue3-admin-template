const domSymbol = Symbol('water-mark-dom');

export const useWaterMark = (parentEle = document.body) => {
  let resizeFunc = () => {};
  const id = domSymbol.toString();
  /**
   * @description: 创建水印
   * @return {*}
   */
  const createWaterMark = (str) => {
    clearWaterMark();

    const canvas = document.createElement('canvas');
    canvas.width = 250;
    canvas.height = 100;
    const canvasContext = canvas.getContext('2d');
    if (canvas) {
      canvasContext.rotate((-20 * Math.PI) / 120);
      canvasContext.font = '15px Vedana';
      canvasContext.fillStyle = 'rgba(0, 0, 0, 0.15)';
      canvasContext.textAlign = 'left';
      canvasContext.textBaseline = 'middle';
      canvasContext.fillText(str, canvas.width / 20, canvas.height);
    }

    const waterMarkDiv = document.createElement('div');
    waterMarkDiv.id = id;
    waterMarkDiv.style.pointerEvents = 'none';
    waterMarkDiv.style.top = '0px';
    waterMarkDiv.style.left = '0px';
    waterMarkDiv.style.position = 'absolute';
    waterMarkDiv.style.zIndex = '1000';
    waterMarkDiv.style.width = document.documentElement.clientWidth + 'px';
    waterMarkDiv.style.height = document.documentElement.clientHeight + 'px';
    waterMarkDiv.style.background = 'url(' + canvas.toDataURL('image/png') + ') left top repeat';
    parentEle && parentEle.appendChild(waterMarkDiv);
  };

  /**
   * @description: 增加水印
   * @return {*}
   */
  const addWaterMark = (str) => {
    createWaterMark(str);
    resizeFunc = () => {
      createWaterMark(str);
    };
    window.addEventListener('resize', resizeFunc);
  };

  /**
   * @description: 清除水印
   * @return {*}
   */
  const clearWaterMark = () => {
    const elem = document.getElementById(id);
    elem && parentEle && parentEle.removeChild(elem);
    window.removeEventListener('resize', resizeFunc);
  };
  return {
    addWaterMark,
    clearWaterMark
  };
};
