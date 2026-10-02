// Init AOS
AOS.init({duration:800,easing:'ease-out-cubic',once:true,offset:80});

// Navbar scroll
window.addEventListener('scroll',()=>{
  const nav=document.getElementById('navbar');
  nav.style.background=window.scrollY>50?'rgba(0,5,12,0.98)':'rgba(0,10,20,0.95)';
});

// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    const t=document.querySelector(a.getAttribute('href'));
    if(t) t.scrollIntoView({behavior:'smooth',block:'start'});
  });
});

// Counter animation
function animateCounters(){
  document.querySelectorAll('.stat-num').forEach(el=>{
    const target=+el.dataset.target;
    const dur=2000;
    const step=dur/60;
    let cur=0;
    const inc=target/60;
    const timer=setInterval(()=>{
      cur+=inc;
      if(cur>=target){cur=target;clearInterval(timer);}
      el.textContent=Math.floor(cur);
    },step);
  });
}

// Trigger counters when hero is visible
const heroObs=new IntersectionObserver(entries=>{
  if(entries[0].isIntersecting){animateCounters();heroObs.disconnect();}
},{threshold:0.3});
heroObs.observe(document.getElementById('hero'));

// Skill bars animate on scroll
const skillObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.querySelectorAll('.progress-bar').forEach(bar=>{
        bar.style.width=bar.style.width;
      });
      skillObs.unobserve(e.target);
    }
  });
},{threshold:0.3});
const aboutSec=document.getElementById('about');
if(aboutSec) skillObs.observe(aboutSec);

// Particle background
(function(){
  const canvas=document.createElement('canvas');
  canvas.id='particles';
  canvas.style.cssText='position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none';
  const wrap=document.getElementById('particles-canvas');
  if(!wrap) return;
  wrap.appendChild(canvas);
  const ctx=canvas.getContext('2d');
  let W,H,particles=[];

  function resize(){W=canvas.width=window.innerWidth;H=canvas.height=wrap.offsetHeight||window.innerHeight;}
  resize();
  window.addEventListener('resize',resize);

  for(let i=0;i<80;i++){
    particles.push({
      x:Math.random()*W,y:Math.random()*H,
      vx:(Math.random()-.5)*.4,vy:(Math.random()-.5)*.4,
      r:Math.random()*1.5+.5,a:Math.random()*.8+.2
    });
  }

  function draw(){
    ctx.clearRect(0,0,W,H);
    particles.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(103,221,255,${p.a})`;
      ctx.fill();
    });
    // Connect nearby
    for(let i=0;i<particles.length;i++){
      for(let j=i+1;j<particles.length;j++){
        const dx=particles[i].x-particles[j].x;
        const dy=particles[i].y-particles[j].y;
        const d=Math.sqrt(dx*dx+dy*dy);
        if(d<120){
          ctx.beginPath();
          ctx.strokeStyle=`rgba(103,221,255,${(1-d/120)*.15})`;
          ctx.lineWidth=.5;
          ctx.moveTo(particles[i].x,particles[i].y);
          ctx.lineTo(particles[j].x,particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

// Gallery lightbox effect
document.querySelectorAll('.gallery-item').forEach(item=>{
  item.addEventListener('click',()=>{
    const img=item.querySelector('img');
    const overlay=document.createElement('div');
    overlay.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.9);z-index:9999;display:flex;align-items:center;justify-content:center;cursor:pointer';
    const i=document.createElement('img');
    i.src=img.src; i.style.cssText='max-width:90vw;max-height:90vh;border-radius:12px;box-shadow:0 0 60px rgba(103,221,255,.4)';
    overlay.appendChild(i);
    overlay.addEventListener('click',()=>overlay.remove());
    document.body.appendChild(overlay);
  });
});
