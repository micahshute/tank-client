export const pathFromBezierCurve = (cubicBezierCurve) => {
    const {
      initialAxis, initialControlPoint, endingControlPoint, endingAxis,
    } = cubicBezierCurve;
    return `
      M${initialAxis.x} ${initialAxis.y}
      c ${initialControlPoint.x} ${initialControlPoint.y}
      ${endingControlPoint.x} ${endingControlPoint.y}
      ${endingAxis.x} ${endingAxis.y}
    `;
  };

  export const radiansToDegrees = rad => ((rad * 180) / Math.PI)

  export const calculateAngle = (x1, y1, x2, y2) => {
    if(x2 >= 0 && y2 >= 0){
        return 90
    }else if(x2 < 0 && y2 >= 0){
        return -90
    }

    const opp = x2 - x1
    const adj = y2 - y1
    const tan = opp / adj
    const angle = Math.atan(tan)
    return -1 * radiansToDegrees(angle)
  }

  export const canvasMousePosition = (event) => {

    const svg = document.getElementById('canvas')
    const point = svg.createSVGPoint()
    point.x = event.clientX
    point.y = event.clientY
    const { x, y } = point.matrixTransform(svg.getScreenCTM().inverse())
    return { x, y }
  }