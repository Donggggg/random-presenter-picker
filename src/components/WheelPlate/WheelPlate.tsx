import { useEffect, useRef } from 'react';

const persons = [
  { name: '김동규', percent: 25 },
  { name: '이인송', percent: 25 },
  { name: '이정민', percent: 35 },
  {
    name: '이민구',
    percent: 5,
  },
  {
    name: '문주영',
    percent: 10,
  },
  {
    name: '이유운',
    percent: 5,
  },
];
const wheelConfig = { centerX: 300, centerY: 300, radius: 200, width: 600, height: 600 };
const { centerX, centerY, radius, width, height } = wheelConfig;
const degToRad = (deg: number) => (deg * Math.PI) / 180;
const perToDeg = (per: number) => (per / 100) * 360;

export const WheelPlate = () => {
  const WheelPlateCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let transformAngle = 0;
    drawPlate();
    const interval = setInterval(() => {
      transformAngle += 10;
      if (transformAngle > 360) transformAngle = 0;
      // drawPlate();
    }, 1000 / 60);

    function drawPlate() {
      const ctx = WheelPlateCanvasRef.current?.getContext('2d');
      if (!ctx) return;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(degToRad(transformAngle));
      ctx.translate(-centerX, -centerY);
      ctx.clearRect(0, 0, width, height);
      drawBorder(ctx);
      drawPlateArc(ctx);
      drawCenterCap(ctx);
      ctx.restore();
      drawArrow(ctx);
    }

    function drawBorder(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = '#1EC800';
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius + 15, 0, degToRad(360), false);
      ctx.stroke();
      ctx.fill();
    }

    function drawPlateArc(ctx: CanvasRenderingContext2D) {
      let sum = 0;

      persons.forEach((person: any, idx) => {
        const startAngle = perToDeg(sum);
        const endAngle = startAngle + perToDeg(person.percent);

        sum += person.percent;
        ctx.fillStyle = idx % 2 ? '#03C75A' : '#FFFFFF';
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'gray';
        ctx.font = '20px sans-serif';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'start';
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, radius, degToRad(startAngle), degToRad(endAngle), false);
        ctx.closePath();
        ctx.stroke();
        ctx.fill();

        const textX = centerX + (Math.cos(degToRad((startAngle + endAngle) / 2)) * radius) / 1.8;
        const textY = centerY + (Math.sin(degToRad((startAngle + endAngle) / 2)) * radius) / 1.8;
        ctx.fillStyle = '#222';
        ctx.save();
        ctx.translate(textX, textY);
        ctx.rotate(degToRad((startAngle + endAngle) / 2));
        ctx.translate(-textX, -textY);
        ctx.fillText(person.name, textX, textY);
        ctx.restore();

        const startHandBarX = Math.cos(degToRad(startAngle)) * (radius + 7.5) + centerX;
        const startHandBarY = Math.sin(degToRad(startAngle)) * (radius + 7.5) + centerY;
        const endHandBarX = Math.cos(degToRad(endAngle)) * (radius + 7.5) + centerX;
        const endHandBarY = Math.sin(degToRad(endAngle)) * (radius + 7.5) + centerY;
        ctx.fillStyle = '#EAEEF3';
        ctx.beginPath();
        ctx.moveTo(startHandBarX + 6, startHandBarY + 6);
        ctx.arc(startHandBarX, startHandBarY, 6, 0, degToRad(360), false);
        ctx.moveTo(endHandBarX + 6, endHandBarY + 6);
        ctx.arc(endHandBarX, endHandBarY, 6, 0, degToRad(360), false);
        ctx.stroke();
        ctx.fill();
      });
    }

    function drawArrow(ctx: CanvasRenderingContext2D) {
      ctx.lineWidth = 1.8;
      ctx.fillStyle = '#EAEEF3';
      ctx.beginPath();
      ctx.moveTo(Math.cos(degToRad(270)) * radius + centerX, Math.sin(degToRad(270)) * radius + centerY);
      ctx.arc(centerX, centerY - 230, 15, 0, degToRad(180), true);
      ctx.closePath();
      ctx.stroke();
      ctx.fill();

      ctx.fillStyle = '#03c75a';
      ctx.beginPath();
      ctx.arc(centerX, centerY - 230, 7, 0, degToRad(360), true);
      ctx.stroke();
      ctx.fill();
    }

    function drawCenterCap(ctx: CanvasRenderingContext2D) {
      ctx.fillStyle = '#EAEEF3';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(centerX + 10, centerY);
      ctx.arc(centerX, centerY, 10, 0, degToRad(360), false);
      ctx.fill();
      ctx.stroke();
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <canvas id="wheel-plate" width={wheelConfig.width} height={wheelConfig.height} ref={WheelPlateCanvasRef} />;
};
